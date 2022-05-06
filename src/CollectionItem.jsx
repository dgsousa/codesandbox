import React from 'react';
import { classNames } from '@react-spectrum/utils';
import { FocusRing } from '@react-aria/focus';
import { mergeProps, useId } from '@react-aria/utils';
import DragHandle from '@spectrum-icons/workflow/DragHandle';
import { useButton } from '@react-aria/button';
import { useDraggableItem, useDropIndicator } from '@react-aria/dnd';
import { useGridCell, useGridRow } from '@react-aria/grid';
import { useVisuallyHidden } from '@react-aria/visually-hidden';
import { Checkbox } from '@adobe/react-spectrum';

import styles from './ReorderableList.css';

const CollectionItem = React.memo(({
  item,
  state,
  dragState,
  dropState,
}) => {
  const rowRef = React.useRef(null);
  const cellRef = React.useRef(null);
  const cellNode = [...item.childNodes][0];
  const { rowProps } = useGridRow({
    node: item,
    shouldSelectOnPressUp: true,
  }, state, rowRef);
  const { gridCellProps } = useGridCell({
    node: cellNode,
    focusMode: 'cell',
    shouldSelectOnPressUp: true,
  }, state, cellRef);

  const { dragProps, dragButtonProps } = useDraggableItem({ key: item.key }, dragState);

  const dragButtonRef = React.useRef(null);
  const { buttonProps } = useButton({
    ...dragButtonProps,
    elementType: 'div',
  }, dragButtonRef);

  const dropIndicatorRef = React.useRef(null);
  const { dropIndicatorProps } = useDropIndicator({
    target: {
      type: 'item',
      key: item.key,
      dropPosition: 'on',
    },
  }, dropState, dropIndicatorRef);
  const { visuallyHiddenProps } = useVisuallyHidden();
  const id = useId();
  const mergedCellProps = mergeProps(gridCellProps, dragProps);

  return (
    <div
      { ...rowProps }
      ref={ rowRef }
      aria-labelledby={ id }
    >
      <FocusRing focusRingClass={ styles.FocusRing }>
        <div
          { ...mergedCellProps }
          aria-labelledby={ id }
          ref={ cellRef }
          className={ classNames(styles, 'Draggable', {
            Dragging: dragState.isDragging(item.key),
          }) }
        >
          <FocusRing focusRingClass={ styles.FocusRing }>
            <div
              { ...buttonProps }
              ref={ dragButtonRef }
              className={ classNames(styles, 'DragHandle') }
            >
              <DragHandle size='S' />
            </div>
          </FocusRing>
          <Checkbox
            aria-label={ `${item.key}` }
            isSelected={ Boolean(rowProps['aria-selected']) }
            excludeFromTabOrder
            isReadOnly
          >
            {item.rendered}
          </Checkbox>
          {!dropIndicatorProps['aria-hidden'] && (
            <div
              { ...visuallyHiddenProps }
              role='button'
              { ...dropIndicatorProps }
              ref={ dropIndicatorRef }
            />
          )}
        </div>
      </FocusRing>
    </div>
  );
}, shouldPreventComponentUpdate);

function shouldPreventComponentUpdate(prevProps, newProps) {
  if (newProps.isDragging) {
    return true;
  }
  return false;
}

export default CollectionItem;
