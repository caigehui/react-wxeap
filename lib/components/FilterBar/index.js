'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../constants');

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _isarray = require('isarray');

var _isarray2 = _interopRequireDefault(_isarray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    container: {
        width: '100%',
        height: 120,
        backgroudColor: 'white',
        borderBottom: '1px solid ' + _constants.BORDER_COLOR,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    filterItem: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 25,
        color: _constants.SUBTITLE_COLOR
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
    }
};

var FilterBar = function (_React$Component) {
    _inherits(FilterBar, _React$Component);

    function FilterBar(props) {
        _classCallCheck(this, FilterBar);

        var _this = _possibleConstructorReturn(this, (FilterBar.__proto__ || Object.getPrototypeOf(FilterBar)).call(this, props));

        if (props.conditions.length > 4) {
            console.warn('FilterBar接收到超过4个condition，但只会显示前四个');
        }
        _this.state = {
            selectedIndex: -1 // -1时表示没有菜单是激活状态
        };
        return _this;
    }

    _createClass(FilterBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                conditions = _props.conditions,
                values = _props.values;
            var selectedIndex = this.state.selectedIndex;

            return conditions.length > 0 ? _react2.default.createElement(
                _View2.default,
                { style: styles.container },
                conditions.map(function (item, i) {
                    var value = values[i];
                    var condition = conditions[i];
                    if (!(0, _isarray2.default)(condition)) {
                        console.error('\u7B2C' + i + '\u4E2Acondition\u4E0D\u662FArray\u7C7B\u578B');
                        return null;
                    }
                    var label = condition.findByCondition(function (a) {
                        return a.value === value;
                    });
                    if (!label) {
                        console.error('\u7B2C' + i + '\u4E2Acondition\u4E2D\u4E0D\u5B58\u5728' + value);
                        return null;
                    }
                    var isSelected = selectedIndex === i;
                    var itemTitleStyle = isSelected ? styles.itemTitle : _extends({}, styles.itemTitle, styles.itemTitleSelected);
                    var iconStyle = isSelected ? styles.icon : _extends({}, styles.icon, styles.iconUp);
                    var iconColor = isSelected ? _constants.PRIMARY_COLOR : _constants.SUBTITLE_COLOR;
                    return _react2.default.createElement(
                        _View2.default,
                        null,
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
                })
            ) : null;
        }
    }]);

    return FilterBar;
}(_react2.default.Component);

FilterBar.propTypes = {
    conditions: _react.PropTypes.array,
    values: _react.PropTypes.array,
    onChange: _react.PropTypes.func
};
exports.default = FilterBar;