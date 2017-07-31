/// <reference types="react" />
import React from 'react';

declare interface DefaultAvatarProps {
    radius?: number;
    id?: number;
    name?: string,
    style?: object;
}

declare class DefaultAvatar extends React.Component<DefaultAvatarProps, any> { }

export default DefaultAvatar;