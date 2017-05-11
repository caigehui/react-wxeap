'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/nav-bar/style/css');

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _css2 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css3 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _css4 = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapProps = require('../../utils/wrapProps');

var _wrapProps2 = _interopRequireDefault(_wrapProps);

var _request = require('../../app/request');

var _request2 = _interopRequireDefault(_request);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ListView = require('../ListView');

var _ListView2 = _interopRequireDefault(_ListView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = _list2.default.Item;

var colors = ['rgb(78, 168, 236)', 'rgb(26, 193, 148)', 'rgb(242, 114, 93)', 'rgb(247, 181, 92)'];

var OrgPicker = function (_React$Component) {
    _inherits(OrgPicker, _React$Component);

    function OrgPicker(props) {
        _classCallCheck(this, OrgPicker);

        var _this = _possibleConstructorReturn(this, (OrgPicker.__proto__ || Object.getPrototypeOf(OrgPicker)).call(this, props));

        _this.request = function (dptId) {
            _this.setState({ loading: true });
            (0, _request2.default)(API + 'EAPOrg/QueryOrg?dptId=' + dptId + '&companyId=' + _this.props.companyId).then(function (_ref) {
                var data = _ref.data;

                _this.setState({
                    index: [].concat(_toConsumableArray(_this.state.index), [data.org[0]]),
                    org: data.org,
                    loading: false
                });
                _this.fill([''], true);
            });
        };

        _this.onConfirm = function () {
            _this.props.onConfirm && _this.props.onConfirm(_this.state.checked);
            _popup2.default.hide();
        };

        _this.onChange = function (item) {
            var type = _this.props.type;

            switch (type) {
                case 'empCheck':
                case 'dptCheck':
                    _this.setState({
                        checked: _this.state.checked.searchByCondition(function (a) {
                            return a.id === item.id;
                        }) ? _this.state.checked.removeByCondition(function (a) {
                            return a.id === item.id;
                        }) : [].concat(_toConsumableArray(_this.state.checked), [item])
                    });
                    break;
                case 'empRadio':
                case 'dptRadio':
                    _this.setState({
                        checked: [item]
                    });
                    setTimeout(_this.onConfirm, 100);
                    break;
            }
        };

        _this.onClick = function (id) {
            _this.request(id);
        };

        _this.dptLink = function (dptId) {
            var index = _this.state.index;

            var newIndex = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = index[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    if (i.id === dptId) break;
                    newIndex.push(i);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _this.setState({
                index: newIndex
            });
            _this.request(dptId);
        };

        _this.renderHeader = function () {
            return _react2.default.createElement(
                'div',
                { style: { backgroundColor: 'white' } },
                _this.renderCheckedContainer(),
                _this.renderIndexContainer()
            );
        };

        _this.state = {
            checked: props.checked,
            index: [],
            loading: true,
            org: []
        };
        return _this;
    }

    _createClass(OrgPicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.request(0);
            window.addEventListener('resize', function () {
                _this2.forceUpdate();
            }, false);
        }
    }, {
        key: 'getNavTitle',
        value: function getNavTitle() {
            var type = this.props.type;

            if (type === 'empCheck') return '人员多选';else if (type === 'empRadio') return '人员单选';else if (type === 'dptCheck') return '部门多选';else return '部门单选';
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading() {
            return _react2.default.createElement(
                _View2.default,
                { style: styles.loading },
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.loadingText },
                    '\u52A0\u8F7D\u4E2D...'
                )
            );
        }
    }, {
        key: 'renderNoEmp',
        value: function renderNoEmp() {
            return _react2.default.createElement(
                _View2.default,
                { style: styles.loading },
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.loadingText },
                    '\u8BE5\u90E8\u95E8\u662F\u7A7A\u7684'
                )
            );
        }
    }, {
        key: 'renderCheckedContainer',
        value: function renderCheckedContainer() {
            var checked = this.state.checked;

            if (checked.length === 0) return null;
            var checkedEl = [];
            checked.map(function (item, i) {
                checkedEl.push(_react2.default.createElement(
                    'div',
                    { key: i, style: _extends({}, styles.item, { color: 'rgb(213, 76, 60)'
                        }) },
                    item.name
                ));
                if (i === checked.length - 1) return;
                checkedEl.push(_react2.default.createElement(
                    'div',
                    { key: i + '-sep', style: _extends({}, styles.item, { padding: 0, color: 'rgb(150, 150, 150)'
                        }) },
                    '\u3001'
                ));
            });
            return _react2.default.createElement(
                _View2.default,
                { style: styles.checkedContainer },
                _react2.default.createElement(
                    'div',
                    { style: _extends({}, styles.item, { color: 'rgb(60, 60, 60)' }) },
                    '\u5DF2\u9009\u62E9\uFF1A'
                ),
                checkedEl
            );
        }
    }, {
        key: 'renderIndexContainer',
        value: function renderIndexContainer() {
            var _this3 = this;

            var index = this.state.index;

            if (index.length === 0) return null;
            var el = [];
            index.map(function (dpt, i) {
                el.push(_react2.default.createElement(
                    'div',
                    { key: i, onClick: function onClick() {
                            i !== index.length - 1 && _this3.dptLink(dpt.id);
                        }, style: i === index.length - 1 ? _extends({}, styles.item, { color: 'rgb(150, 150 ,150)' }) : styles.item },
                    dpt.name
                ));
                el.push(_react2.default.createElement(
                    'div',
                    { key: i + '-sep', style: _extends({}, styles.item, { padding: 0
                        }) },
                    _react2.default.createElement(_icon2.default, { type: 'right', color: 'rgb(150, 150, 150)', size: 'md' })
                ));
                if (i === index.length - 1) return;
            });
            return _react2.default.createElement(
                _View2.default,
                { style: styles.indexContainer },
                el
            );
        }
    }, {
        key: 'renderPickerContainer',
        value: function renderPickerContainer() {
            var _this4 = this;

            var _state = this.state,
                org = _state.org,
                checked = _state.checked;

            return _react2.default.createElement(
                'div',
                { style: styles.pickerContainer },
                function () {
                    switch (_this4.props.type) {
                        case 'empCheck':
                        case 'empRadio':
                            return _react2.default.createElement(
                                _list2.default,
                                null,
                                org.map(function (item, i) {
                                    if (item.type !== 'all') {
                                        return _react2.default.createElement(
                                            ListItem,
                                            {
                                                key: i,
                                                onClick: function onClick() {
                                                    return item.type === 'emp' ? _this4.onChange(item) : _this4.onClick(item.id);
                                                },
                                                thumb: item.face === 'none' ? _react2.default.createElement(
                                                    'div',
                                                    { style: _extends({}, styles.icon, { backgroundColor: colors[i % colors.length] }) },
                                                    item.name.substring(item.name.length - (item.name.length > 2 ? 2 : 1), item.name.length)
                                                ) : _react2.default.createElement('img', { src: item.type === 'dpt' ? require('../../assets/org.png') : item.face, style: styles.icon }),
                                                extra: item.type === 'emp' ? checked.searchByCondition(function (a) {
                                                    return a.id === item.id;
                                                }) ? _react2.default.createElement(_icon2.default, { type: 'check',
                                                    size: 'md', color: 'rgb(0, 126, 218)' }) : null : _react2.default.createElement(_icon2.default, { type: 'right',
                                                    size: 'md', color: 'rgb(150, 150, 150)' }) },
                                            item.name,
                                            item.type === 'dpt' ? null : _react2.default.createElement(
                                                'span',
                                                { style: styles.job },
                                                item.job
                                            )
                                        );
                                    } else return null;
                                })
                            );
                        case 'dptCheck':
                        case 'dptRadio':
                            return _react2.default.createElement(
                                _list2.default,
                                null,
                                org.map(function (item, i) {
                                    if (item.type !== 'emp') {
                                        return _react2.default.createElement(
                                            ListItem,
                                            {
                                                key: i,
                                                thumb: _react2.default.createElement('img', { src: item.type === 'all' ? require('../../assets/org-prt.png') : require('../../assets/org.png'), style: item.type === 'all' ? styles.icon : _extends({}, styles.icon, { marginLeft: 20 }) }),
                                                extra: item.isLeaf || item.type === 'all' ? checked.searchByCondition(function (a) {
                                                    return a.id === item.id;
                                                }) ? _react2.default.createElement(_icon2.default, { type: 'check',
                                                    size: 'md', color: 'rgb(0, 126, 218)' }) : null : _react2.default.createElement(_icon2.default, { type: 'right',
                                                    size: 'md', color: 'rgb(150, 150, 150)' }),
                                                onClick: function onClick() {
                                                    return item.isLeaf || item.type === 'all' ? _this4.onChange(item) : _this4.onClick(item.id);
                                                } },
                                            item.name
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            );
                    }
                }()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                'div',
                { style: _extends({}, styles.container, { height: document.documentElement.clientHeight }) },
                _react2.default.createElement(
                    _navBar2.default,
                    {
                        iconName: require('../../assets/close.svg'),
                        mode: 'light',
                        onLeftClick: _popup2.default.hide,
                        rightContent: this.props.type === 'empRadio' || this.props.type === 'dptRadio' ? null : _react2.default.createElement(
                            'div',
                            { style: styles.tick, onClick: this.onConfirm
                            },
                            _react2.default.createElement(_icon2.default, { type: require('../../assets/tick.svg') })
                        )
                    },
                    this.getNavTitle()
                ),
                _react2.default.createElement(_ListView2.default, {
                    style: { height: document.documentElement.clientHeight - 90, width: '100%', backgroundColor: 'rgb(245,245,249)' },
                    refreshable: false,
                    footerHidden: true,
                    renderHeader: this.renderHeader,
                    renderRow: function renderRow() {
                        return _this5.state.loading ? _this5.renderLoading() : _this5.state.org.length === 1 ? _this5.renderNoEmp() : _this5.renderPickerContainer();
                    },
                    onFetch: function onFetch(page, fill) {
                        _this5.fill = fill;
                        fill([''], true);
                    } })
            );
        }
    }]);

    return OrgPicker;
}(_react2.default.Component);

OrgPicker.propTypes = {
    type: _react2.default.PropTypes.oneOf(['empCheck', 'empRadio', 'dptCheck', 'dptRadio']),
    checked: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    onConfirm: _react2.default.PropTypes.func,
    companyId: _react2.default.PropTypes.number
};
OrgPicker.defaultProps = {
    type: 'empRadio',
    checked: [],
    companyId: 0
};


var styles = {
    container: {
        width: '100%',
        backgroundColor: 'white'
    },
    checkedContainer: {
        marginLeft: '5%',
        width: '95%',
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        borderBottom: '1px solid rgb(220,220,220)'
    },
    indexContainer: {
        marginLeft: '5%',
        width: '95%',
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center'
    },
    pickerContainer: {
        borderTop: '1px solid rgb(220,220,220)',
        borderBottom: '1px solid rgb(220,220,220)',
        width: '100%'
    },
    loading: {
        width: '100%',
        marginTop: 20,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(245,245,249)'
    },
    loadingText: {
        fontSize: 28,
        color: 'rgb(60, 60, 60)'
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        textAlign: 'center',
        fontSize: 25,
        lineHeight: '70px',
        color: 'white'
    },
    item: {
        display: '-webkit-flex',
        alignItems: 'center',
        height: 50,
        fontSize: 28,
        color: 'rgb(0,126,218)',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 6
    },
    job: {
        color: 'white',
        backgroundColor: 'rgb(57, 174, 255)',
        borderRadius: 8,
        padding: '5px 10px',
        marginLeft: 15,
        fontSize: 22
    }
};

exports.default = function (options) {
    _popup2.default.show(_react2.default.createElement(OrgPicker, options), { transitionName: 'am-fade', wrapProps: _wrapProps2.default });
};