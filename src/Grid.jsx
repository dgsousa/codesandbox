import React, { useState } from 'react';
import { classNames } from '@react-spectrum/utils';
import { GridCollection, useGridState } from '@react-stately/grid';
import { ListKeyboardDelegate } from '@react-aria/selection';
import { mergeProps } from '@react-aria/utils';
import { useProvider } from '@react-spectrum/provider';
import { useDraggableCollectionState, useDroppableCollectionState } from '@react-stately/dnd';
import { useDroppableCollection } from '@react-aria/dnd';
import { useGrid } from '@react-aria/grid';
import { useListState } from '@react-stately/list';
import GridItems from './GridItems';
import DragPreview from './DragPreview';

import styles from './ReorderableList.css';


export default function Grid({
  items,
  onMove,
  children,
  selectedKeys,
  onSelectionChange,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const ref = React.useRef(null);
  const state = useListState({
    items,
    children,
    disabledKeys: [],
  });

  const keyboardDelegate = new ListKeyboardDelegate(state.collection, state.disabledKeys, ref);
  const gridState = useGridState({
    selectionMode: 'multiple',
    onSelectionChange,
    selectedKeys,
    disabledKeys: state.disabledKeys,
    focusMode: 'cell',
    collection: new GridCollection({
      columnCount: 1,
      items: [...state.collection].map((item) => {
        const node = [{
          key: `cell-${item.key}`,
          type: 'cell',
          index: 0,
          value: {},
          level: 0,
          rendered: null,
          textValue: item.textValue,
          hasChildNodes: false,
          childNodes: [],
        }];
        return ({
          ...item,
          childNodes: node,
        });
      }),
    }),
  });

  const provider = useProvider();
  // Use a random drag type so the items can only be reordered within this list and not dragged elsewhere.
  const dragType = React.useMemo(() => `keys-${Math.random().toString(36).slice(2)}`, []);
  const dragState = useDraggableCollectionState({
    collection: gridState.collection,
    // Providing a selection manager with no keys prevents dnd from dragging all selected items from our real collection
    // while letting us keep 'multiple' selection mode on our grid for state
    selectionManager: useGridState({
      selectionMode: 'none',
      collection: new GridCollection({
        columnCount: 1,
        items: [],
      }),
    }).selectionManager,
    getItems(keys) {
      return [...keys].map(key => ({
        [dragType]: JSON.stringify(key),
      }));
    },
    renderPreview(keys, draggedKey) { // eslint-disable-line react/no-multi-comp
      return (
        <DragPreview
          item={ gridState.collection.getItem(draggedKey) }
          provider={ provider }
        />
      );
    },
    onDragStart: () => {
      setIsDragging(true);
    },
    onDragEnd: () => {
      setIsDragging(false);
    },
  });
  const dropState = useDroppableCollectionState({
    collection: gridState.collection,
    selectionManager: gridState.selectionManager,
    getDropOperation(target) {
      if (target.type === 'root' || target.dropPosition === 'on') {
        return 'cancel';
      }
      return 'move';
    },
  });

  const { collectionProps } = useDroppableCollection({
    keyboardDelegate,
    onDrop: async (e) => {
      if (e.target.type !== 'root' && e.target.dropPosition !== 'on') {
        const keys = [];
        if (e.items[0].kind === 'text' && e.items[0].types.has(dragType)) {
          keys.push(JSON.parse(await e.items[0].getText(dragType)));
        }
        onMove(keys, e.target);
      }
    },
    getDropTargetFromPoint(x, y) {
      const rect = ref?.current?.getBoundingClientRect();
      if (rect && ref?.current) {
        x += rect.x;
        y += rect.y;
        let closest = null;
        let closestDistance = Infinity;
        let closestDir = null;

        for (const child of ref.current.children) {
          if ((child).dataset.key) {
            const r = child.getBoundingClientRect();
            const points = [
              [r.left, r.top, 'before'],
              [r.right, r.top, 'before'],
              [r.left, r.bottom, 'after'],
              [r.right, r.bottom, 'after'],
            ];
            for (const [px, py, dir] of points) {
              const dx = px - x;
              const dy = py - y;
              const d = dx * dx + dy * dy;
              if (d < closestDistance) {
                closestDistance = d;
                closest = child;
                closestDir = dir;
              }
            }
            if (y >= r.top + 10 && y <= r.bottom - 10) {
              closestDir = 'on';
            }
          }
        }
        const key = closest?.dataset.key;
        if (key && closestDir) {
          return {
            type: 'item',
            key,
            dropPosition: closestDir,
          };
        }
      }
      return null;
    },
  }, dropState, ref);

  const { gridProps } = useGrid({
    ...items,
    'aria-label': 'grid',
    focusMode: 'row',
    scrollRef: ref,
  }, gridState, ref);

  const isDropTarget = dropState.isDropTarget({ type: 'root' });

  return (
    <div
      { ...mergeProps(collectionProps, gridProps) }
      ref={ ref }
      className={ classNames(styles, 'DroppableCollection', { IsDropTarget: isDropTarget }) }
    >
      <GridItems
        gridState={ gridState }
        dragState={ dragState }
        dropState={ dropState }
        ref={ ref }
        isDragging={ isDragging }
        disabledKeys={ state.disabledKeys }
      />
    </div>
  );
}
