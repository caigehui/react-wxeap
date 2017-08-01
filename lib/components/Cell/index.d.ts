/// <reference types="react" />
import React from 'react';

declare interface CellProps {
    onSelect: PropTypes.func,
    checked: PropTypes.object,
    format: PropTypes.string
}

declare class Cell extends React.Component<CellProps, any> {}

export default Cell;