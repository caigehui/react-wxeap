/* eslint-disable */
import React from 'react';

let posX = 0,
    posY = 0,
    scale = 1,
    last_scale = 1,
    last_posX = 0,
    last_posY = 0,
    max_pos_x = 0,
    max_pos_y = 0,
    transform = '';

function hammerIt(elm) {
    let hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });

    let el = elm;

    hammertime.on('doubletap pan pinchmove pinchend pinchcancel panend', function (ev) {
        // pan    
        if (scale != 1) {
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
            if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
        }


        // pinch
        if (ev.type === 'pinchmove') {
            scale = Math.max(.999, Math.min(last_scale * ev.scale, 4));
        }
        if (ev.type === 'pinchend' || ev.type === 'pinchcancel') {
            last_scale = scale;
        }

        // panend
        if (ev.type === 'panend') {
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale !== 1) {
            transform =
                'translate3d(' + posX + 'px,' + posY + 'px, 0) ' +
                'scale3d(' + scale + ', ' + scale + ', 1)';
        }

        if (transform) {
            el.style.webkitTransform = transform;
        }
    });
}

export default class PinchZoomView extends React.Component {

    componentDidMount() {
        hammerIt(this.refs['pinch-zoom-view']);
    }

    /**
     * 设置缩放
     * @param {number} scale 
     */
    setScale = (s) => {
        scale = s;
        this.refs['pinch-zoom-view'].style.webkitTransform =
            'translate3d(0px, ' + Math.ceil((s - 1) * this.refs['pinch-zoom-view'].clientHeight / 2) + 'px, 0) ' +
            'scale3d(' + s + ', ' + s + ', 1)';
    }

    render() {
        return (
            <div ref="pinch-zoom-view">
                {this.props.children}
            </div>
        );
    }

}