import React, { PropTypes } from 'react';
import { NavBar } from 'antd-mobile';
import * as MobileDetect from '../../utils/MobileDetect';

export default class Navigation extends React.Component {

    static propTypes = {
        onBack: PropTypes.func,
        title: PropTypes.string,
        hide: PropTypes.bool,
        autoHide: PropTypes.bool,
        rightContent: PropTypes.any
    }

    static defaultProps = {
        title: ' ',
        hide: false,
        autoHide: true
    }

    configureTitle = (title) => {

        document.title = title;
        if(MobileDetect.isWechat) {
            let i = document.createElement('iframe');
            i.src = '//m.baidu.com/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 9);
            };
            document.body.appendChild(i);
        }
        
        if (MobileDetect.isApp) {
            const data = {
                type: 'onTitleUpdate',
                payload: {
                    title
                }
            };
            window.postMessage(JSON.stringify(data), '*');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.configureTitle(nextProps.title);
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.configureTitle(this.props.title);
        }, 200);
    }

    render() {

        const { title, onBack, hide, autoHide, rightContent } = this.props;
        return (
            autoHide && (hide || MobileDetect.isWechat || MobileDetect.isApp) ?
                <div /> :
                <NavBar
                    mode="light" leftContent={onBack ? '返回' : null} rightContent={rightContent} onLeftClick={onBack} iconName={onBack ? 'left' : null}>
                    {title.length > 8 ? title.substring(0, 7) + '...' : title}
                </NavBar>
        );
    }

}