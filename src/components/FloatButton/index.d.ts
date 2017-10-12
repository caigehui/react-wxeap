/// <reference types="react" />
import React from 'react';

declare interface FloatButtonProps {
    onClick?: Function,
    style?: object,
    type?: any,
    color?: string,
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
}

declare class FloatButton extends React.Component<FloatButtonProps, any> { }

export default FloatButton;