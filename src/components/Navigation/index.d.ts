/// <reference types="react" />
import React from 'react';

declare interface NavigationProps {
    onBack?: Function;
    title?: string;
    hide?: boolean;
    autoHide?: boolean;
    rightContent?: any;
}

declare class Navigation extends React.Component<NavigationProps, any> { }

export default Navigation;