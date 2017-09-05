import React from 'react';
import {
    Popup,
    NavBar,
    TextareaItem,
    Icon,
    Toast
} from 'antd-mobile';
import wrapProps from '../../utils/wrapProps';


class InputBox extends React.Component {

    static propTypes = {
        onConfirm: React.PropTypes.func,
        title: React.PropTypes.string,
        initialValue: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        maxLength: React.PropTypes.number,
        minLength: React.PropTypes.number,
    }

    state = {
        focused: false,
        value: this.props.initialValue || ''
    }

    componentDidMount() {
        this.setState({
            focused: true
        });
    }

    onConfirm = () => {
        if(this.state.value.length < this.props.minLength) return Toast.info(`请输入至少${this.props.minLength}个字符`, 2);
        let hiddenDisabled = this.props.onConfirm && this.props.onConfirm(this.state.value);
        !hiddenDisabled && Popup.hide();
    }

    render() {
        const { title, placeholder, maxLength } = this.props;
        return (
            <div style={styles.container}>
                <NavBar
                    iconName={require('../../assets/close.svg')}
                    mode="light"
                    onLeftClick={Popup.hide}
                    rightContent={<div style={styles.tick} onClick={this.onConfirm}
                    >
                        <Icon type={require('../../assets/tick.svg')} />
                    </div>}
                >{title}</NavBar>
                <div style={styles.textarea}>
                    <TextareaItem
                        onFocus={() => this.setState({ focused: false })}
                        focused={this.state.focused}
                        value={this.state.value}
                        onChange={(value) => this.setState({ value })}
                        placeholder={placeholder}
                        rows={5}
                        count={maxLength}
                    />
                </div>
            </div>
        );
    }

}
const styles = {
    container: {
        minHeight: 400,
        width: '100%',
        backgroundColor: 'white',
    },
    tick: {
        height: '100%',
        padding: '0 0.3rem',
        marginRight: '-0.3rem',
        display: '-webkit-flex',
        alignItems: 'center',
    },
    textarea: {
        minHeight: 310,
        width: '93%',
        marginLeft: '3%',
        fontSize: 25
    }
};

function show(options) {
    Popup.show(<InputBox {...options}/>);
}

export default show;