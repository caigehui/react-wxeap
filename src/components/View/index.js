import React, { PropTypes } from 'react';

const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
};

export default class View extends React.Component {
    
    static propTypes = {
        style: PropTypes.object,
        children: PropTypes.any
    }

    render() {
        return (
            <div {...this.props} style={{ ...style, ...this.props.style }}>
                {React.Children.map(this.props.children, child => child)}
            </div>
        );
    }
}