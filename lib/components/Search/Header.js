'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (_temp = _class = function (_Component) {
    _inherits(Header, _Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                type = _props.type;

            return _react2.default.createElement(
                _View2.default,
                { style: styles.container },
                _react2.default.createElement('img', { src: type === 'search' ? require('../../assets/search.png') : require('../../assets/search-noresult.png'), style: { height: 80 } }),
                _react2.default.createElement(
                    _View2.default,
                    { style: { alignItems: 'center', marginTop: 10 } },
                    _react2.default.createElement(
                        'span',
                        { style: { fontSize: 28, color: '#bfbfbf' } },
                        label
                    )
                )
            );
        }
    }]);

    return Header;
}(_react.Component), _class.propTypes = {
    label: _react.PropTypes.string,
    type: _react.PropTypes.oneOf(['search', 'search-noresult'])
}, _temp);
exports.default = Header;


var styles = {
    container: {
        marginTop: 100,
        width: '100%',
        height: 500,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContents: 'center',
        backgroundColor: COLORS.BACKGROUND_COLOR
    }
};