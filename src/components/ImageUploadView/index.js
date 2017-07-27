import React, { PropTypes } from 'react';
import compressImage from '../../utils/compressImage';
import { Toast } from 'antd-mobile';

export default class ImageUploadView extends React.Component {

    static propTypes = {
        renderContent: PropTypes.func,
        onImagePicked: PropTypes.func,
        style: PropTypes.object,
        maxWidth: PropTypes.number
    }

    static defaultProps = {
        style: {},
        maxWidth: 1080
    }

    // 获取图片的正确方向
    getOrientation = (file, callback) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const view = new DataView(e.target.result);
            if (view.getUint16(0, false) !== 0xFFD8) {
                return callback(-2);
            }
            let length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    let tmp = view.getUint32(offset += 2, false);
                    if (tmp !== 0x45786966) {
                        return callback(-1);
                    }
                    let little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    let tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    }

    onFileChange = () => {
        const fileSelectorEl = this.refs.fileSelectorInput;
        if (fileSelectorEl.files && fileSelectorEl.files.length) {
            const file = fileSelectorEl.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataURL = e.target.result;
                if (!dataURL) {
                    Toast.fail('图片获取失败');
                    return;
                }

                let orientation = 1;
                // 获取图片的方向
                this.getOrientation(file, (res) => {
                    // -2: not jpeg , -1: not defined
                    if (res > 0) {
                        orientation = res;
                    }
                    // 压缩图片
                    compressImage(dataURL, orientation, this.props.maxWidth, url => {
                        this.props.onImagePicked && this.props.onImagePicked(url);
                    });

                    fileSelectorEl.value = '';
                });
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        const { renderContent, style } = this.props;
        return (
            <div style={{...style, position: 'relative'}}>
                <input
                    style={{
                        opacity: 0,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        right: 0
                    }}
                    ref="fileSelectorInput"
                    type="file"
                    accept="image/jpg,image/jpeg,image/png,image/gif"
                    onChange={this.onFileChange}
                />
                {renderContent()}
            </div>
        );
    }

}
