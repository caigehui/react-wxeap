'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = require('antd-mobile/lib/swipe-action/style/css');

var _swipeAction = require('antd-mobile/lib/swipe-action');

var _swipeAction2 = _interopRequireDefault(_swipeAction);

var _css2 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = (_temp2 = _class = function (_React$Component) {
    _inherits(Cell, _React$Component);

    function Cell() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Cell);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cell.__proto__ || Object.getPrototypeOf(Cell)).call.apply(_ref, [this].concat(args))), _this), _this.onCheck = function (e) {
            e.stopPropagation();
            _this.props.onCheck && _this.props.onCheck(!_this.props.checked);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Cell, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                checked = _props.checked,
                swipable = _props.swipable,
                actionButtons = _props.actionButtons,
                checkable = _props.checkable,
                _onClick = _props.onClick,
                renderContent = _props.renderContent,
                height = _props.height;

            return _react2.default.createElement(
                _swipeAction2.default,
                { autoClose: true, right: actionButtons, disabled: !swipable },
                _react2.default.createElement(
                    _View2.default,
                    { style: _extends({}, styles.container, { height: height }), onClick: function onClick() {
                            return _onClick && _onClick(!checked);
                        } },
                    checkable ? _react2.default.createElement(
                        _View2.default,
                        { style: styles.checkContainer, onClick: this.onCheck },
                        _react2.default.createElement(
                            _View2.default,
                            { style: checked ? _extends({}, styles.check, { border: '1.5px solid ' + COLORS.PRIMARY_COLOR }) : styles.check },
                            checked ? _react2.default.createElement(_icon2.default, { type: 'check', color: COLORS.PRIMARY_COLOR }) : null
                        )
                    ) : _react2.default.createElement(_View2.default, { style: styles.placeholder }),
                    renderContent(checked)
                )
            );
        }
    }]);

    return Cell;
}(_react2.default.Component), _class.propTypes = {
    checked: _react.PropTypes.bool,
    height: _react.PropTypes.any,
    swipable: _react.PropTypes.bool,
    checkable: _react.PropTypes.bool,
    onClick: _react.PropTypes.func,
    onCheck: _react.PropTypes.func,
    actionButtons: _react.PropTypes.array,
    renderContent: _react.PropTypes.func
}, _class.defaultProps = {
    swipable: false,
    checkable: false,
    height: 100,
    actionButtons: []
}, _temp2);
exports.default = Cell;


var styles = {
    container: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    checkContainer: {
        width: 100,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        width: 30,
        height: '100%'
    },
    check: {
        borderRadius: '50%',
        border: '1.5px solid ' + COLORS.SUBTITLE_COLOR,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        height: '100%',
        alignItems: 'center'
    }

};