import React, { PropTypes } from 'react';

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

const style = {
    display: '-webkit-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
};
