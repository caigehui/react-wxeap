'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IndicatorDots;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IndicatorDots(props) {
  // Hide dots when there is only one dot.
  if (props.total < 2) return _react2.default.createElement('div', { style: styles.wrapper });

  var dots = [];
  for (var i = 0; i < props.total; i++) {
    dots.push(_react2.default.createElement(Dot, { key: i, selected: props.index === i }));
  }
  return _react2.default.createElement(
    'div',
    { style: styles.wrapper },
    dots
  );
}

IndicatorDots.propTypes = {
  index: _react2.default.PropTypes.number.isRequired,
  total: _react2.default.PropTypes.number.isRequired
};

var styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '0px',
    textAlign: 'center'
  }
};

function Dot(props) {
  return _react2.default.createElement('span', { style: {
      display: 'inline-block',
      height: '14px',
      width: '14px',
      borderRadius: '7px',
      backgroundColor: 'white',
      margin: '20px 5px',
      opacity: props.selected ? '1' : '0.3',
      transitionDuration: '300ms'
    } });
}

Dot.propTypes = {
  selected: _react2.default.PropTypes.bool
};