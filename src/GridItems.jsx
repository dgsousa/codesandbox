import React from 'react';
import CollectionItem from './CollectionItem';

  
const GridItems = ({
  gridState,
  dragState,
  dropState,
  isDragging,
  isFiltering,
}) => {
    
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
};
  
  export default GridItems;
  