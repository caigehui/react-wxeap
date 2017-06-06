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

    componentDidMount() {
        document.title = this.props.title;
    }

    render() {

        const { title, onBack, hide, autoHide, rightContent } = this.props;
        return (
            autoHide && (hide || MobileDetect.isWechat || MobileDetect.isApp) ?
                <div/> :
                <NavBar
                    mode="light" leftContent={onBack ? '返回' : null} rightContent={rightContent} onLeftClick={onBack} iconName={onBack ? 'left' : null}>
                    {title}
                </NavBar>
        );
    }

}