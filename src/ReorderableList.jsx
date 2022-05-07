import React, { useCallback } from 'react';
import { Item } from '@react-stately/collections';
import Grid from './Grid';
import items from './items.json';
import { useListData } from '@adobe/react-spectrum';

  /** pass this into useListData */

  
const ReorderableList = () => {

  const { setSelectedKeys, ...listState } = useListData({
    initialItems: items,
  });

  const onSelectionChange = useCallback((keys) => {
    setSelectedKeys(keys);
  }, [setSelectedKeys]);
  
  
  const onMove = useCallback((keys, target) => {
    if (target.dropPosition === 'after') {
      listState.moveAfter(target.key, keys);
    } else {
      listState.moveBefore(target.key, keys);
    }
  }, [listState]);
  
  return (
    <Grid
      items={ listState.items }
      onSelectionChange={ onSelectionChange }
      onMove={ onMove }
      selectedKeys={ listState.selectedKeys }>
      {item => <Item aria-label={ item.displayName } textValue={ item.displayName }>{item.displayName}</Item>}
    </Grid>
  );
};
  
export default ReorderableList;
  