import React from 'react';
import { ImagePicker } from 'antd-mobile';
import compressImage from '../../utils/compressImage';
import * as MobileDetect from '../../utils/MobileDetect';

export default class ImagePickerCompress extends React.Component {

    static propTypes = {
        maxWidth: React.PropTypes.number,
        onChange: React.PropTypes.func
    }

    componentDidMount() {
        /**
         * 兼容部分安卓机的相机拍照
         */
        if (MobileDetect.isAndroid) {
            let cameras = document.querySelectorAll('input[type=\'file\']');
            for (let i = 0; i < cameras.length; i++) {
                cameras[i].setAttribute('capture', 'camera');
            }
        }
    }

    static defaultProps = {
        maxWidth: 1080
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