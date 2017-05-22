// 图片预览
// 直接调用WxPhotoGallery.show(initIndex, imgs)
import React from 'react';
import {
    Popup
} from 'antd-mobile';
import { PinchView } from 'react-pinch-zoom-pan';
import Carousel from 're-carousel';
import IndicatorDots from './IndicatorDots';
const styles = {
    carouselContainer: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        display: '-webkit-flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#000'
    },
    img: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        backgroundColor: '#000',
        objectFit: 'contain'
    },
    imgsContainer: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    }
};
class ImageViewer extends React.Component {

    static propTypes = {
        imgs: React.PropTypes.array,
        initIndex: React.PropTypes.number,
        enableIndicators: React.PropTypes.bool
    }

    static defaultProps = {
        imgs: [],
        initIndex: 0,
        enableIndicators: true
    }

    componentWillUnmount() {
        Popup.hide();
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.forceUpdate();
        }, false);
    }

    render() {
        const { imgs, initIndex } = this.props;
        let newImgs = [];
        imgs.map((img, i) => {
            if (i >= initIndex) newImgs.push(img);
        });
        imgs.map((img, i) => {
            if (i < initIndex) newImgs.push(img);
        });
        const items = newImgs.map((img, i) =>
            <PinchView key={i} backgroundColor="transparent" maxScale={2} containerRatio={document.documentElement.clientHeight * 100 / document.documentElement.clientWidth}>
                <img style={styles.img} src={img.url} />
            </PinchView>
        );

        return (
            <div style={styles.carouselContainer} onClick={Popup.hide}>
                <Carousel loop={items.length === 1 ? false : true} widgets={this.props.enableIndicators ? [IndicatorDots] : null} frames={items}>
                </Carousel>
            </div>
        );
    }

}

/**
 * 预览图片
 *
 * @param  {int} initIndex   初始位置
 * @param  {array} imgs  图片数组
 */
export default (initIndex, imgs) => {
    Popup.show(<ImageViewer imgs={imgs} initIndex={initIndex} />, { transitionName: 'am-fade' });
};