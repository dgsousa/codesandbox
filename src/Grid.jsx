import React from "react";
import { GridCollection, useGridState } from '@react-stately/grid';
import { useGrid } from '@react-aria/grid';
import { useListState } from '@react-stately/list';
import {useListData} from '@react-stately/data';
import GridItem from './GridItem.jsx';

const items = [
    {id: '1', key: '1', type: 'item', text: 'One'},
    {id: '2', key: '2', type: 'item', text: 'Two'},
    {id: '3', key: '3', type: 'item', text: 'Three'},
    {id: '4', key: '4', type: 'item', text: 'Four'},
    {id: '5', key: '5', type: 'item', text: 'Five'},
    {id: '6', key: '6', type: 'item', text: 'Six'}
]

export default function Grid({
    children,
}) {
    const ref =  React.useRef();

    const onSelectionChange = () => {
        console.log('onSelectionChange')
    };

    const listData = useListData({ initialItems: items });

    const listState = useListState({
        ...listData,
        children,
        disabledKeys: []
    });

    const gridCollectionItems = [...listState.collection].map(item => {
        const node = [{
            key: `cell-${item.key}`,
            type: 'cell',
            index: 0,
            value: {},
            level: 0,
            rendered: null,
            textValue: item.text,
            hasChildNodes: false,
            childNodes: [],
          }];
        return {
            ...item,
            childNode: node,
        }
    })

    const gridState = useGridState({
        selectionMode: 'multiple',
        onSelectionChange,
        selectedKeys: listState.selectedKeys,
        focusMode: 'cell',
        collection: new GridCollection({
            columnCount: 1,
            items: gridCollectionItems,
        }),
    });

    const { gridProps } = useGrid({
        ...items,
        'aria-label': 'example list',
        focusMode: 'row',
    }, gridState, ref);

    return (
        <div ref={ref}>
        { gridState.collection.rows.map(item => (
            <GridItem item={ item } key={ item.key } gridState={ gridState } />
        ))}
        </div>
    )
}