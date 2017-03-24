import React from 'react';

export default class Seperator extends React.Component {

    render() {        
        return (
            <div style={{ height: 1, width: '100%', borderBottom: '1px solid rgb(230,230,235)' ,...this.props.style}} />
        )
    }
}