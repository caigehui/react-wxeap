import React from 'react';
import { ImagePicker } from 'antd-mobile';
import compressImage from '../../utils/compressImage';
import * as MobileDetect from '../../utils/MobileDetect';
import ImageViewer from '../ImageViewer';
import MessageBridge from '../../utils/MessageBridge';

export default class ImagePickerCompress extends React.Component {

    static propTypes = {
        maxWidth: React.PropTypes.number,
        onChange: React.PropTypes.func,
        files: React.PropTypes.array
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
        /**
         * 在App使用原生相机
         */
        if(MobileDetect.isApp) {
            let cameras = document.querySelectorAll('input[type=\'file\']');
            for (let i = 0; i < cameras.length; i++) {
                cameras[i].setAttribute('type', 'button');
            }
            this.btn = document.getElementsByClassName('am-image-picker-item am-image-picker-upload-btn');
            this.btn && this.btn[0] && this.btn[0].addEventListener('click', this.onShowImagePicker);
            MessageBridge.addMessageListener(this.onImagePicked);
        }
    }

    componentWillUnmount() {
        this.btn && this.btn[0] && this.btn[0].removeEventListener('click', this.onShowImagePicker);
        MessageBridge.removeMessageListener(this.onImagePicked);
    }

    static defaultProps = {
        maxWidth: 512
    }

    onShowImagePicker = () => {
        MessageBridge.postMessage({
            type: 'onShowImagePicker'
        });
    }

    onImagePicked = (message) => {
        if(message.type === 'onImagePicked') {
            compressImage(message.payload.imageData, 1, this.props.maxWidth, url => {
                this.props.onChange && this.props.onChange([...this.props.files, { url, orientation: 1 }], 'add', this.props.files.length);
            });
        }
    }

    onChange = (files, type, index) => {
        if (type === 'add') {
            compressImage(files[files.length - 1].url, files[files.length - 1].orientation, this.props.maxWidth, url => {
                files[files.length - 1].url = url;
                files[files.length - 1].orientation = 1;
                this.props.onChange && this.props.onChange(files, type, index);
            });
        } else {
            this.props.onChange && this.props.onChange(files, type, index);
        }
    }

    onImageClick = (index, files) => {
        let imageEls = document.getElementsByClassName('am-image-picker-item-content');
        // 可能会因为多个ImagePicker在一个页面而出现定位问题
        ImageViewer(index, files, imageEls[index]);
    }

    render() {
        return <ImagePicker {...this.props} onImageClick={this.onImageClick} onChange={this.onChange} />;
    }

}