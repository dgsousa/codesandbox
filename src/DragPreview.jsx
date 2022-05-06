import React from 'react';
import { classNames } from '@react-spectrum/utils';
import { Provider } from '@react-spectrum/provider';
import DragHandle from '@spectrum-icons/workflow/DragHandle';

import styles from './ReorderableList.css';

export default function DragPreview({ item, provider }) {
  return (
    <Provider { ...provider }>
      <div className={ classNames(styles, 'Draggable', 'DragPreview') }>
        <div className={ classNames(styles, 'DragHandle') }>
          <DragHandle size='S' />
        </div>
        <span>{item.rendered}</span>
      </div>
    </Provider>
  );
}
