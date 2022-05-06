import React, { useCallback } from 'react';
import { Item } from '@react-stately/collections';
import Grid from './Grid';
import items from './items.json';
import { useListData } from '@adobe/react-spectrum';

import styles from './ReorderableList.css';

  /** pass this into useListData */
export const ReorderableListDataProps = {
  getKey: (item) => item.key,
  filter: (item, filterText) => filterText === '' || item.displayName.toLowerCase().includes(filterText.toLowerCase()),
};
  
const ReorderableList = () => {

  const { setSelectedKeys, ...listState } = useListData({
    initialItems: items,
    ...ReorderableListDataProps,
  });

  const onSelectionChange = useCallback((keys) => {
    setSelectedKeys(keys);
  }, [setSelectedKeys]);
  
  
  const onMove = useCallback((keys, target) => {
    if (target.dropPosition === 'after' || target.key === 'Id') {
      listState.moveAfter(target.key, keys);
    } else {
      listState.moveBefore(target.key, keys);
    }
  }, [listState]);
  
  return (
    <div style={ { height: '800px', width: '500px', border: '1px solid red' } } >
    <Grid
      items={ listState.items }
      onSelectionChange={ onSelectionChange }
      onMove={ onMove }
      selectedKeys={ listState.selectedKeys }>
      {item => <Item aria-label={ item.displayName } textValue={ item.displayName }>{item.displayName}</Item>}
    </Grid>
    </div>
  );
};
  
export default ReorderableList;
  