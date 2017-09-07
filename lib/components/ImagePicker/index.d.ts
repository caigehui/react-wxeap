/// <reference types="react" />
import React from 'react';

declare interface ImgaePickerProps {
    files?: Array<{}>;
    onChange?: (files: Array<{}>, operationType: string, index?: number) => void;
    selectable?: boolean;
    maxWidth: number;
}

declare class ImgaePicker extends React.Component<ImgaePickerProps, any> { }

export default ImgaePicker;