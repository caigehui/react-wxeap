import React, { PropTypes } from 'react';
import { NavBar } from 'antd-mobile';
import * as MobileDetect from '../../utils/mobileDetect';

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

    configureTitle = () => {
        document.title = this.props.title;
        MobileDetect.isApp && window.postMessage(JSON.stringify({
            type: 'onTitleUpdate',
            payload: {
                title: this.props.title
            }
        }));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.title !== this.props.title) {
            this.configureTitle();
        }
    }

    componentDidMount() {
        this.configureTitle();
    }

    render() {

        const { title, onBack, hide, autoHide, rightContent } = this.props;
        return (
            autoHide && (hide || MobileDetect.isWechat || MobileDetect.isApp) ?
                <div/> :
                <NavBar
                    mode="light" leftContent={onBack ? '返回' : null} rightContent={rightContent} onLeftClick={onBack} iconName={onBack ? 'left' : null}>
                    {title.length > 8 ? title.substring(0 ,7) + '...' : title}
                </NavBar>
        );
    }

}