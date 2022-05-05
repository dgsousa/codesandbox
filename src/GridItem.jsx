import React from "react";
import { Checkbox } from '@adobe/react-spectrum';
import { useGridRow } from '@react-aria/grid';

export default function GridItem({
    item,
    gridState,
}) {
    const rowRef = React.useRef(null);

    const { rowProps } = useGridRow({
        node: item,
        shouldSelectOnPressUp: true,
    }, gridState, rowRef);

    return (
        <div {...rowProps}>
            <Checkbox
                aria-label={ `${item.key}` }
                isSelected={ Boolean(rowProps['aria-selected']) }>
                {item.text}
            </Checkbox>
        </div>
    )
} 