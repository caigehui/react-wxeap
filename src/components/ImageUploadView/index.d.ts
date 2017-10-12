/// <reference types="react" />
import React from 'react';

declare interface ImageUploadViewProps {
    renderContent?: () => React.ReactElement<any>;
    onImagePicked?: (url: string) => void;
    style?: object;
    inputWidth?: number;
    maxWidth?: number;
}

declare class ImageUploadView extends React.Component<ImageUploadViewProps, any> { }

export default ImageUploadView;