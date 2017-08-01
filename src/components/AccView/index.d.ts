/// <reference types="react" />
import React from 'react';

declare interface AccViewProps {
    /**
     * 附件数组
     */
    accs: Array;
    /**
     * 标题
     */
    title: string;
}

declare class AccView extends React.Component<AccViewProps, any> {}

export default AccView;