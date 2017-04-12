import React from 'react';
import { ImagePicker } from 'antd-mobile';
import compressImage from '../../utils/compressImage';
export default function ImagePickerCompress(props) {
    const onChange = (files, type, index) => {
        if(type === 'add') {
            compressImage(files[files.length-1].url, props.maxWidth, url => {
                files[files.length-1].url = url;
                props.onChange(files, type, index);
            })
        }else {
            props.onChange(files, type, index);
        }
        
        
    }
    return <ImagePicker {...props} onChange={onChange}/>
}

ImagePickerCompress.propTypes = {
    maxWidth: React.PropTypes.number
}

ImagePickerCompress.defaultProps = {
    maxWidth: 1024
}