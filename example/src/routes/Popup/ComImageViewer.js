import React, { Component, PropTypes } from 'react';
import { bind, CONST, View, ImageViewer, linking } from 'react-wxeap';
import ComExample from 'components/ComExample';
import ComDetail from 'components/ComDetail';
import ComHeader from 'components/ComHeader';

@bind(state => state.comImageViewer)
class ComImageViewer extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        avaImgs: PropTypes.array
    }


    render() {
        const { avaImgs } = this.props;
        return (
            <div style={{ width: document.documentElement.clientWidth, backgroundColor: CONST.BACKGROUND_COLOR, overflow: 'hidden', color: CONST.TITLE_COLOR }}>

                <ComHeader
                    content={'ImageViewer'}
                    goBack={() => {
                        linking({
                            pathname: '/'
                        }, this.props.dispatch);
                    }}
                />
                <ComExample>
                    <View style={{ width: '95%', margin: '0 auto', fontSize: 26 }}>
                        ImageViewer方法用来查看图片，点击图片时触发，点击下方的图片看下效果
                    </View>
                </ComExample>
                <img onClick={() => {
                    ImageViewer(0, avaImgs);
                }} style={styles.img} src={require('../../assets/image1.jpg')} />
                <img onClick={() => {
                    ImageViewer(1, avaImgs);
                }} style={styles.img} src={require('../../assets/image2.jpg')} />
                <img onClick={() => {
                    ImageViewer(2, avaImgs);
                }} style={styles.img} src={require('../../assets/image3.jpg')} />
                <ComDetail title={'组件介绍'}>
                    <View style={{ marginTop: 10 }}>
                        ImageViewer组件用来点击查看图片，如果传入数组有多个对象，查看图片时左右滑动可以查看数组内所有图片。
                    </View>
                </ComDetail>
            </div>
        );
    }
}

const styles = {
    img: {
        height: 500,
        width: '100%'
    }
};
export default ComImageViewer; 