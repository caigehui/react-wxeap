'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/textarea-item/style/css');

var _textareaItem = require('antd-mobile/lib/textarea-item');

var _textareaItem2 = _interopRequireDefault(_textareaItem);

var _css2 = require('antd-mobile/lib/nav-bar/style/css');

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _css3 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css4 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _css5 = require('antd-mobile/lib/toast/style/css');

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapProps = require('../../utils/wrapProps');

var _wrapProps2 = _interopRequireDefault(_wrapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputBox = (_temp2 = _class = function (_React$Component) {
    _inherits(InputBox, _React$Component);

    function InputBox() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InputBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputBox.__proto__ || Object.getPrototypeOf(InputBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            focused: false,
            value: _this.props.initialValue || ''
        }, _this.onConfirm = function () {
            if (_this.state.value.length < _this.props.minLength) return _toast2.default.info('\u8BF7\u8F93\u5165\u81F3\u5C11' + _this.props.minLength + '\u4E2A\u5B57\u7B26', 2);
            var hiddenDisabled = _this.props.onConfirm && _this.props.onConfirm(_this.state.value);
            !hiddenDisabled && _popup2.default.hide();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InputBox, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                focused: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                title = _props.title,
                placeholder = _props.placeholder,
                maxLength = _props.maxLength;

            return _react2.default.createElement(
                'div',
                { style: styles.container },
                _react2.default.createElement(
                    _navBar2.default,
                    {
                        iconName: require('../../assets/close.svg'),
                        mode: 'light',
                        onLeftClick: _popup2.default.hide,
                        rightContent: _react2.default.createElement(
                            'div',
                            { style: styles.tick, onClick: this.onConfirm
                            },
                            _react2.default.createElement(_icon2.default, { type: require('../../assets/tick.svg') })
                        )
                    },
                    title
                ),
                _react2.default.createElement(
                    'div',
                    { style: styles.textarea },
                    _react2.default.createElement(_textareaItem2.default, {
                        onFocus: function onFocus() {
                            return _this2.setState({ focused: false });
                        },
                        focused: this.state.focused,
                        value: this.state.value,
                        onChange: function onChange(value) {
                            return _this2.setState({ value: value });
                        },
                        placeholder: placeholder,
                        rows: 5,
                        count: maxLength,
                        autoHeight: true
                    })
                )
            );
        }
    }]);

    return InputBox;
}(_react2.default.Component), _class.propTypes = {
    onConfirm: _react2.default.PropTypes.func,
    title: _react2.default.PropTypes.string,
    initialValue: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.string,
    maxLength: _react2.default.PropTypes.number,
    minLength: _react2.default.PropTypes.number
}, _temp2);

var styles = {
    container: {
        minHeight: 400,
        width: '100%',
        backgroundColor: 'white'
    },
    tick: {
        height: '100%',
        padding: '0 0.3rem',
        marginRight: '-0.3rem',
        display: '-webkit-flex',
        alignItems: 'center'
    },
    textarea: {
        minHeight: 310,
        width: '93%',
        marginLeft: '3%',
        fontSize: 25
    }
};

function show(options) {
    _popup2.default.show(_react2.default.createElement(InputBox, options), { wrapProps: _wrapProps2.default });
}

exports.default = show;