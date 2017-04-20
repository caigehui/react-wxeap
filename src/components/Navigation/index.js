import React, { PropTypes } from 'react';
import { NavBar } from 'antd-mobile';
import * as MobileDetect from '../../utils/mobileDetect';

export default class Navigation extends React.Component {

    static propTypes = {
        onBack: PropTypes.func,
        title: PropTypes.string,
    }

    static defaultProps = {
        title: ' '
    }

    componentDidMount() {
        document.title = this.props.title;
    }

    render() {

        const { title, onBack } = this.props;
        return (
            MobileDetect.isWechat ?
                null :
                <NavBar
                    mode="light" onLeftClick={onBack}>
                    {title}
                </NavBar>
        );
    }

}