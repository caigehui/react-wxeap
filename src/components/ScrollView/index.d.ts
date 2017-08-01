/// <reference types="react" />
import React from 'react';

declare interface ScrollViewProps {
    style?: object,
    useZscroller?: boolean
}

declare class ScrollView extends React.Component<ScrollViewProps, any> { }

export default ScrollView;