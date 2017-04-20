import React, { PropTypes } from 'react';

const style = {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
};

export default class View extends React.Component {
    
    static propTypes = {
        style: PropTypes.object
    }

    render() {
        return (
            <div style={{ ...style, ...this.props.style }}>
                {this.props.children}
            </div>
        );
    }
}