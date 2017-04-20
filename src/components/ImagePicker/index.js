import React from 'react';
import { ImagePicker } from 'antd-mobile';
import compressImage from '../../utils/compressImage';
export default class ImagePickerCompress extends React.Component {

    static propTypes = {
        maxWidth: React.PropTypes.number,
        onChange: React.PropTypes.func
    }

    static defaultProps = {
        maxWidth: 1024
    }

    onChange = (files, type, index) => {
        if (type === 'add') {
            compressImage(files[files.length - 1].url, files[files.length - 1].orientation, this.props.maxWidth, url => {
                files[files.length - 1].url = url;
                files[files.length - 1].orientation = 1;
                this.props.onChange(files, type, index);
            });
        } else {
            this.props.onChange(files, type, index);
        }


    }
    render() {
        return <ImagePicker {...this.props} onChange={this.onChange} />;
    }

}