import React from 'react';
import CollectionItem from './CollectionItem';

  
const GridItems = React.forwardRef(({
  gridState,
  dragState,
  dropState,
  isDragging,
  isFiltering,
}, ref) => {
    // TODO: remove all this if https://github.com/adobe/react-spectrum/issues/3039 gets implemented
  
  return (
    <>
      {gridState.collection.rows.map((item) => {
        return (
          <CollectionItem
            key={ item.key }
            item={ item }
            state={ gridState }
            dragState={ dragState }
            dropState={ dropState }
            isDragging={ isDragging }
            isFiltering={ isFiltering }
          />
        );
      })}
    </>
  );
});
  
  export default GridItems;
  