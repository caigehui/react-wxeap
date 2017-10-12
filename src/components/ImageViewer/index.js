import React from 'react';
import { Popup } from 'antd-mobile';
import wrapProps from '../../utils/wrapProps';
import { PhotoSwipe } from 'react-photoswipe';
import './photoswipe.css';

/**
 * 预览图片
 * @param {number} initIndex 
 * @param {array} imgs 
 */
export default function show(initIndex, imgs, imgEl) {
    Popup.show(<ImageViewer imgs={imgs} imgEl={imgEl} initIndex={initIndex} />, { wrapProps, transitionName: 'none' });
}

class ImageViewer extends React.Component {

    static propTypes = {
        imgs: React.PropTypes.array,
        initIndex: React.PropTypes.number,
        imgEl: React.PropTypes.any
    }

    constructor(props) {
        super(props);

        let h = [];

        for (let i = 0; i < props.imgs.length; i++) {
            let img = props.imgs[i];
            let myImg = new Image();
            myImg.src = img.url;
            if (myImg.complete) {
                // 如果有缓存，则按比例返回高度
                h.push(document.documentElement.clientWidth * (myImg.height * 1.00 / myImg.width));
            } else {
                // 如果没有缓存，则直接返回0，等待异步返回高度
                myImg.onload = () => {
                    let myH = this.state.h;
                    myH[i] = document.documentElement.clientWidth * (myImg.height * 1.00 / myImg.width);
                    this.setState({
                        h: myH
                    });
                };
                h.push(0);
            }
        }

        this.state = {
            h,
            isOpen: true
        };

    }

    componentWillUnmount() {
        Popup.hide();
    }

    componentDidMount() {
        // 监听窗口大小的变化
        window.addEventListener('resize', () => {
            this.forceUpdate();
        }, false);
    }

    handleClose = () => {
        Popup.hide();
    }

    render() {
        return (
            <div style={{ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight }} onClick={() => this.photoSwipe && this.photoSwipe.closePhotoSwipe()}>
                <PhotoSwipe
                    ref={o => this.photoSwipe = o}
                    isOpen={this.state.isOpen}
                    items={this.props.imgs.map((img, index) => ({
                        src: img.url,
                        msrc: img.thumb || img.url,
                        h: this.state.h[index],
                        w: document.documentElement.clientWidth
                    }))}
                    options={{
                        index: this.props.initIndex,
                        shareEl: false,
                        closeEl: false,
                        loop: false,
                        fullscreenEl: false,
                        maxSpreadZoom: 3,
                        getThumbBoundsFn: this.props.imgEl ? () => {
                            let rect = this.props.imgEl.getBoundingClientRect();
                            return { x: rect.left, y: rect.top , w: rect.width };
                        } : undefined
                    }}
                    close={this.handleClose} />
            </div>
        );
    }
}