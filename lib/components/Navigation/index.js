'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/nav-bar/style/css');

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _css2 = require('antd-mobile/lib/badge/style/css');

var _badge = require('antd-mobile/lib/badge');

var _badge2 = _interopRequireDefault(_badge);

var _css3 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css4 = require('antd-mobile/lib/menu/style/css');

var _menu = require('antd-mobile/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _css5 = require('antd-mobile/lib/popover/style/css');

var _popover = require('antd-mobile/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = _popover2.default.Item;
function isWX() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
var inlineStyles = {
    fooMenu: {
        zIndex: 2,
        position: 'absolute',
        top: 91,
        left: 0,
        right: 0
    },
    menuActive: {
        content: '',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1
    },
    leftContent: {
        width: 200,
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    message: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 90
    },
    menu: {
        marginLeft: 15,
        display: 'flex',
        alignItems: 'center',
        width: 60,
        height: 90
    }
};

var Navigation = function (_React$Component) {
    _inherits(Navigation, _React$Component);

    function Navigation(props) {
        _classCallCheck(this, Navigation);

        var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

        _this.onPopoverSelect = function (opt) {
            _this.setState({
                showPopover: false
            });
            _this.props.onPopoverSelect(opt.props.value, 0);
        };

        _this.onPopoverClick = function (showPopover) {
            _this.setState({
                showPopover: showPopover,
                showMenu: false
            });
        };

        _this.getNavTitle = function (value, data) {
            var label = '';
            data.forEach(function (dataItem) {
                if (dataItem.value === value[0]) {
                    label = dataItem.label;
                    if (dataItem.children && value[1]) {
                        dataItem.children.forEach(function (cItem) {
                            if (cItem.value === value[1]) {
                                label += ' ' + cItem.label;
                            }
                        });
                    }
                }
            });
            return label;
        };

        _this.onMenuSelect = function (menuValue) {
            if (menuValue.toString() === _this.props.menuValue.toString()) return;
            _this.setState({
                showMenu: false,
                navTitle: _this.getNavTitle(menuValue, _this.props.menuData)
            });
            _this.props.onMenuSelect && _this.props.onMenuSelect(menuValue);
        };

        _this.onMenuClick = function (e) {
            e.stopPropagation();
            e.preventDefault(); // Fix event propagation on Android
            _this.setState({
                showMenu: _this.state.switchCompany ? true : !_this.state.showMenu,
                switchCompany: false
            });
        };

        _this.onSwitchCompanyClick = function () {
            // Fix event propagation on Android
            if (_this.state.switchCompany) {
                _this.setState({
                    showMenu: !_this.state.showMenu,
                    switchCompany: !_this.state.switchCompany
                });
            } else {
                _this.setState({
                    showMenu: true,
                    switchCompany: true
                });
            }
        };

        _this.onCompanySelect = function (companyValue) {
            if (companyValue.toString() === _this.props.companyValue.toString()) return;
            _this.setState({
                showMenu: false,
                switchCompany: false
            });
            _this.props.onCompanySelect && _this.props.onCompanySelect(companyValue);
        };

        _this.state = {
            showPopover: false,
            switchCompany: false,
            showMenu: false,
            navTitle: props.title || _this.getNavTitle(props.menuValue, props.menuData)
        };
        return _this;
    }

    _createClass(Navigation, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var offsetX = -10; // just for pc demo
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
                offsetX = -26;
            }

            var _state = this.state,
                showMenu = _state.showMenu,
                showPopover = _state.showPopover,
                switchCompany = _state.switchCompany,
                mock = _state.mock,
                navTitle = _state.navTitle;
            var _props = this.props,
                menuData = _props.menuData,
                menuValue = _props.menuValue,
                addOptions = _props.addOptions,
                homeMode = _props.homeMode,
                title = _props.title,
                companyData = _props.companyData,
                companyValue = _props.companyValue,
                messages = _props.messages;


            var menu = _react2.default.createElement(_menu2.default, {
                style: inlineStyles.fooMenu,
                data: switchCompany ? companyData : menuData,
                value: switchCompany ? companyValue : menuValue,
                onChange: switchCompany ? this.onCompanySelect : this.onMenuSelect,
                height: document.documentElement.clientHeight * 0.6
            });

            var leftProps = {
                onLeftClick: this.props.onBack
            };
            if (homeMode) {
                leftProps = {
                    iconName: isWX() ? null : 'left',
                    onLeftClick: isWX() ? null : this.props.onBack,
                    leftContent: _react2.default.createElement(
                        'div',
                        { style: inlineStyles.leftContent },
                        _react2.default.createElement(
                            'div',
                            { key: '1', style: inlineStyles.menu, onClick: this.onMenuClick },
                            _react2.default.createElement(_icon2.default, { type: require('../../assets/menu.svg') })
                        ),
                        messages.length > 0 ? _react2.default.createElement(
                            'div',
                            { key: '2', style: inlineStyles.message, onClick: function onClick(e) {
                                    e.stopPropagation();
                                    _this2.props.onMessagesClick && _this2.props.onMessagesClick();
                                } },
                            _react2.default.createElement(_badge2.default, { text: messages.length, size: 'large' })
                        ) : null
                    )
                };
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _navBar2.default,
                    _extends({}, leftProps, {
                        mode: 'light',
                        rightContent: !homeMode ? null : [companyData[0].children.length > 1 ? _react2.default.createElement(_icon2.default, { key: 'switch', onClick: this.onSwitchCompanyClick, type: require('../../assets/switch.svg') }) : null, _react2.default.createElement(
                            _popover2.default,
                            { key: 'pop', mask: true,
                                visible: showPopover,
                                overlay: addOptions.map(function (option, i) {
                                    return _react2.default.createElement(
                                        Item,
                                        {
                                            key: i,
                                            value: option,
                                            icon: _react2.default.createElement(_icon2.default, { type: require('../../assets/add.svg'), size: 'xs' })
                                        },
                                        '\u65B0\u589E' + option
                                    );
                                }),
                                popupAlign: {
                                    overflow: { adjustY: 0, adjustX: 0 },
                                    offset: [offsetX, 15]
                                },
                                onVisibleChange: this.onPopoverClick,
                                onSelect: this.onPopoverSelect },
                            _react2.default.createElement(
                                'div',
                                { style: {
                                        height: '100%',
                                        padding: '0 0.3rem',
                                        marginRight: '-0.3rem',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                },
                                _react2.default.createElement(_icon2.default, { type: require('../../assets/new1.svg'), size: 'xs' })
                            )
                        )] }),
                    !homeMode ? title : navTitle
                ),
                _react2.default.createElement('div', { onClick: function onClick() {
                        return _this2.setState({ showMenu: false });
                    }, style: showMenu ? inlineStyles.menuActive : {} }),
                showMenu ? menu : null
            );
        }
    }]);

    return Navigation;
}(_react2.default.Component);

Navigation.PropTypes = {
    menuData: _react.PropTypes.array,
    menuValue: _react.PropTypes.string,
    addOptions: _react.PropTypes.array,
    homeMode: _react.PropTypes.bool,
    title: _react.PropTypes.string,
    company: _react.PropTypes.array,
    companyData: _react.PropTypes.array,
    companyValue: _react.PropTypes.string,
    messages: _react.PropTypes.array,
    onMessagesClick: _react.PropTypes.func
};
exports.default = Navigation;