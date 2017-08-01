'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = require('antd-mobile/lib/menu/style/css');

var _menu = require('antd-mobile/lib/menu');

var _menu2 = _interopRequireDefault(_menu);

var _css2 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _isarray = require('isarray');

var _isarray2 = _interopRequireDefault(_isarray);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BAR_HEIGHT = 80;
var labels = [];
var FilterBar = (_temp = _class = function (_React$Component) {
    _inherits(FilterBar, _React$Component);

    function FilterBar(props) {
        _classCallCheck(this, FilterBar);

        var _this = _possibleConstructorReturn(this, (FilterBar.__proto__ || Object.getPrototypeOf(FilterBar)).call(this, props));

        _this.setLabels = function (labels) {
            console.warn('depracated!该方法已经被废弃，请使用setLabel');
            _this.setState({ labels: labels });
        };

        _this.setLabel = function (label, i) {
            var labels = _this.state.labels;
            labels.splice(i, 1, label);
            _this.setState({
                labels: labels
            });
        };

        _this.generateConditions = function (conditions) {
            return conditions.map(function (condition) {
                if (condition.searchByCondition(function (a) {
                    return a.hasOwnProperty('children');
                })) {
                    if (!(0, _isarray2.default)(condition)) {
                        console.error('FilterBar: condition不是Array类型');
                        return null;
                    }
                    return condition.map(function (item) {
                        if (!item.hasOwnProperty('children')) return _extends({}, item, { isLeaf: true });
                        return item;
                    });
                }
                return condition;
            });
        };

        _this.onItemClick = function (i) {
            _this.setState({ selectedIndex: -1 });
            _this.props.onClick(i, function (label) {
                if (!label) {
                    if (i === _this.state.selectedIndex) {
                        _this.setState({ selectedIndex: -1 });
                    } else {
                        _this.setState({ selectedIndex: i });
                    }
                } else {
                    var _labels = _this.state.labels;
                    _labels.splice(i, 1, label);
                    _this.setState({ labels: _labels });
                }
            });
        };

        _this.hideMenu = function () {
            _this.setState({ selectedIndex: -1 });
        };

        if (props.conditions.length > 4) {
            console.warn('FilterBar接收到超过4个condition，但只会显示前四个');
        }
        _this.state = {
            selectedIndex: -1, // -1时表示没有菜单是激活状态
            conditions: _this.generateConditions(props.conditions),
            offsetTop: -500,
            labels: props.conditions.map(function () {
                return '';
            })
        };
        return _this;
    }

    _createClass(FilterBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ offsetTop: (0, _reactDom.findDOMNode)(this.bar).offsetTop, labels: labels.length ? labels : this.state.labels });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            labels = this.state.labels;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.conditions) {
                this.setState({ conditions: this.generateConditions(nextProps.conditions) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var values = this.props.values;
            var _state = this.state,
                selectedIndex = _state.selectedIndex,
                conditions = _state.conditions,
                labels = _state.labels;


            return conditions.length > 0 ? _react2.default.createElement(
                _View2.default,
                { style: styles.container, ref: function ref(o) {
                        return _this2.bar = o;
                    } },
                conditions.map(function (item, i) {
                    var value = values[i];
                    var data = conditions[i];
                    // 验证数据类型
                    if (!(0, _isarray2.default)(value)) {
                        console.error('FilterBar: \u7B2C' + i + '\u4E2Avalue\u4E0D\u662FArray\u7C7B\u578B');
                        return null;
                    }
                    // 获取value[0]相应的object，设置label为1级
                    var first = data.findByCondition(function (a) {
                        return a.value === value[0];
                    });
                    var label = first && first.label;
                    // 如果有children，去匹配children的值
                    if (first && first.hasOwnProperty('children')) {
                        var second = first.children.findByCondition(function (a) {
                            return a.value === value[1];
                        });
                        label = second && second.label;
                    }
                    // state的label优先显示
                    label = labels[i] || label || ' ';
                    // 是否被选择
                    var isSelected = selectedIndex === i;
                    // 布局和样式
                    var itemStyle = _extends({}, styles.filterItem, { width: Math.round(1 / conditions.length * 10000) / 100 + '%' });
                    // 移除最后一个item的右边框
                    if (i === conditions.length - 1) itemStyle = _extends({}, itemStyle, { borderRight: 0 });
                    var itemTitleStyle = !isSelected ? styles.itemTitle : _extends({}, styles.itemTitle, styles.itemTitleSelected);
                    var iconStyle = !isSelected ? styles.icon : _extends({}, styles.icon, styles.iconUp);
                    var iconColor = !isSelected ? 'rgb(200,200,200)' : _constants.PRIMARY_COLOR;
                    return _react2.default.createElement(
                        _View2.default,
                        { style: itemStyle, key: i, onClick: function onClick() {
                                return _this2.onItemClick(i);
                            } },
                        _react2.default.createElement(
                            _View2.default,
                            { style: itemTitleStyle },
                            label
                        ),
                        _react2.default.createElement(
                            _View2.default,
                            { style: iconStyle },
                            _react2.default.createElement(_icon2.default, { type: require('../../assets/triangle.svg'), size: 'xxs', color: iconColor })
                        )
                    );
                }),
                selectedIndex !== -1 ? _react2.default.createElement('div', { style: _extends({}, styles.shade, { top: this.state.offsetTop + BAR_HEIGHT + 1 }), onClick: this.hideMenu }) : null,
                selectedIndex !== -1 ? function () {
                    // 获取Menu的data,value,onChange
                    var data = conditions[selectedIndex];
                    var style = _extends({}, styles.menu, { top: _this2.state.offsetTop + BAR_HEIGHT + 1 });
                    var value = values[selectedIndex];
                    var onChange = function onChange(newValue) {
                        if (newValue.toString() === value.toString()) return;
                        // 设置label
                        _this2.setState({
                            labels: _this2.state.labels.map(function (label, i) {
                                if (i === selectedIndex) {
                                    return '';
                                }
                                return label;
                            })
                        });
                        _this2.props.onChange && _this2.props.onChange(values.map(function (value, i) {
                            if (i === selectedIndex) return newValue;
                            return value;
                        }), selectedIndex);
                        _this2.hideMenu();
                    };

                    var level = data.searchByCondition(function (a) {
                        return a.hasOwnProperty('children');
                    }) ? 2 : 1;
                    var height = Math.min(data.length * 100, 500);
                    return _react2.default.createElement(_menu2.default, {
                        height: height,
                        style: style,
                        data: data,
                        level: level,
                        value: value,
                        onChange: onChange
                    });
                }() : null
            ) : null;
        }
    }]);

    return FilterBar;
}(_react2.default.Component), _class.propTypes = {
    conditions: _react.PropTypes.array,
    values: _react.PropTypes.array,
    onChange: _react.PropTypes.func,
    onClick: _react.PropTypes.func
}, _class.defaultProps = {
    onClick: function onClick(i, cb) {
        cb(null);
    }
}, _temp);
exports.default = FilterBar;


var styles = {
    container: {
        width: '100%',
        height: BAR_HEIGHT,
        backgroundColor: 'white',
        borderBottom: '1px solid ' + _constants.BORDER_COLOR,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'no-wrap'
    },
    filterItem: {
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: '1px solid ' + _constants.BORDER_COLOR,
        flexWrap: 'no-wrap'
    },
    itemTitle: {
        textAlign: 'center',
        fontSize: 28,
        color: _constants.SUBTITLE_COLOR,
        marginLeft: 5,
        marginRight: 5,
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    itemTitleSelected: {
        color: _constants.PRIMARY_COLOR
    },
    icon: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconUp: {
        transform: 'rotate(180deg)'
    },
    menu: {
        zIndex: 2,
        position: 'absolute',
        left: 0,
        right: 0
    },
    shade: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1
    }
};