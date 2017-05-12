import React, { PropTypes } from 'react';
import { NavBar } from 'antd-mobile';
import * as MobileDetect from '../../utils/mobileDetect';

export default class Navigation extends React.Component {

    static propTypes = {
        onBack: PropTypes.func,
        title: PropTypes.string,
        hide: PropTypes.bool
    }

    static defaultProps = {
        title: ' ',
        hide: false
    }

    componentDidMount() {
        document.title = this.props.title;
    }

    componentDidUpdate() {
        document.title = this.props.title;
    }

    render() {

        const { title, onBack, hide } = this.props;
        return (
            hide || MobileDetect.isWechat || MobileDetect.isApp ?
                <div/> :
                <NavBar
                    mode="light" onLeftClick={onBack}>
                    {title}
                </NavBar>
        );
    }

}