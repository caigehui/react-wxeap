'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/nav-bar/style/css');

var _navBar = require('antd-mobile/lib/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _css2 = require('antd-mobile/lib/list/style/css');

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _css3 = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css4 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

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

var _Cell = require('../Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _ListView = require('../ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _constants = require('../../constants');

var COLORS = _interopRequireWildcard(_constants);

var _acc = require('../../utils/acc');

var Acc = _interopRequireWildcard(_acc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colors = [COLORS.BLUE_COLOR, COLORS.RED_COLOR, COLORS.GREEN_COLOR, COLORS.YELLOW_COLOR];

var OrgPicker = function (_React$Component) {
    _inherits(OrgPicker, _React$Component);

    function OrgPicker(props) {
        _classCallCheck(this, OrgPicker);

        var _this = _possibleConstructorReturn(this, (OrgPicker.__proto__ || Object.getPrototypeOf(OrgPicker)).call(this, props));

        _this.request = function (id) {
            _this.setState({ loading: true });

            if (_this.props.type === 'cmpCheck') {
                // 公司多选，展示当前公司的子公司
                (0, _request2.default)(API + 'EAPOrg/QueryChildrenCompany?companyId=' + id).then(function (_ref) {
                    var data = _ref.data;

                    OrgPicker.indexForType[_this.props.type] = [].concat(_toConsumableArray(_this.state.index), [data.companies[0]]);
                    _this.setState({
                        index: OrgPicker.indexForType[_this.props.type],
                        companies: data.companies,
                        loading: false
                    });
                    // 刷新
                    _this.listView.refreshUI();
                    _this.listView.scrollToTop();
                });
            } else if (_this.props.type === 'cmpRadio') {
                // 公司单选，只展示用户所在的全部公司
                (0, _request2.default)(API + 'EAPOrg/QueryCompany').then(function (_ref2) {
                    var data = _ref2.data;

                    _this.setState({
                        companies: data.companies,
                        loading: false
                    });
                    // 刷新
                    _this.listView.refreshUI();
                    _this.listView.scrollToTop();
                });
            } else {
                (0, _request2.default)(API + 'EAPOrg/QueryOrg?dptId=' + id + '&companyId=0').then(function (_ref3) {
                    var data = _ref3.data;

                    OrgPicker.indexForType[_this.props.type] = [].concat(_toConsumableArray(_this.state.index), [data.org[0]]);
                    _this.setState({
                        index: OrgPicker.indexForType[_this.props.type],
                        org: data.org,
                        loading: false
                    });
                    // 刷新
                    _this.listView.refreshUI();
                    _this.listView.scrollToTop();
                });
            }
        };

        _this.onConfirm = function () {
            if (!_this.props.enableEmpty && _this.state.checked.length === 0) return;
            _this.props.onConfirm && _this.props.onConfirm(_this.state.checked);
            _popup2.default.hide();
        };

        _this.onChange = function (item) {
            var type = _this.props.type;

            switch (type) {
                case 'empCheck':
                case 'dptCheck':
                case 'cmpCheck':
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
                case 'cmpRadio':
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

            OrgPicker.indexForType[_this.props.type] = newIndex;
            _this.setState({
                index: newIndex
            });
            _this.request(dptId);
        };

        _this.onCheckedClick = function (item) {
            var checked = _this.state.checked;

            _this.setState({
                checked: checked.removeByCondition(function (i) {
                    return i.id === item.id;
                })
            });
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
            index: OrgPicker.indexForType[props.type] || [],
            loading: true,
            org: [],
            companies: []
        };
        return _this;
    }

    _createClass(OrgPicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                if (_this2.state.index.length === 0) {
                    _this2.request(0);
                } else {
                    var id = _this2.state.index[_this2.state.index.length - 1].id;
                    _this2.request(id);
                    _this2.setState({
                        index: _this2.state.index.removeByCondition(function (i) {
                            return i.id === id;
                        })
                    });
                }
            }, 250);
            window.addEventListener('resize', function () {
                _this2.forceUpdate();
            }, false);
        }
    }, {
        key: 'getNavTitle',
        value: function getNavTitle() {
            var type = this.props.type;

            switch (type) {
                case 'empCheck':
                    return '人员多选';
                case 'empRadio':
                    return '人员单选';
                case 'dptCheck':
                    return '部门多选';
                case 'dptRadio':
                    return '部门单选';
                case 'cmpCheck':
                    return '子公司选择';
                case 'cmpRadio':
                    return '切换公司';
            }
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
            var _this3 = this;

            var checked = this.state.checked;

            if (checked.length === 0) return null;
            var checkedEl = [];
            checked.map(function (item, i) {
                checkedEl.push(_react2.default.createElement(
                    'div',
                    { key: i,
                        onClick: function onClick() {
                            return _this3.onCheckedClick(item);
                        },
                        style: _extends({}, styles.item, { color: COLORS.RED_COLOR
                        }) },
                    item.name
                ));
                if (i === checked.length - 1) return;
                checkedEl.push(_react2.default.createElement(
                    'div',
                    { key: i + '-sep', style: _extends({}, styles.item, { padding: 0, color: COLORS.SUBTITLE_COLOR
                        }) },
                    '\u3001'
                ));
            });
            return _react2.default.createElement(
                _View2.default,
                { style: styles.checkedContainer },
                _react2.default.createElement(
                    'div',
                    { style: _extends({}, styles.item, { color: COLORS.TITLE_COLOR }) },
                    '\u5DF2\u9009\u62E9\uFF1A'
                ),
                checkedEl
            );
        }
    }, {
        key: 'renderIndexContainer',
        value: function renderIndexContainer() {
            var _this4 = this;

            var index = this.state.index;

            if (index.length === 0) return null;
            if (this.props.type === 'cmpRadio') return null; // 切换公司不需要Index
            var el = [];
            index.map(function (dpt, i) {
                el.push(_react2.default.createElement(
                    'div',
                    { key: i, onClick: function onClick() {
                            i !== index.length - 1 && _this4.dptLink(dpt.id);
                        }, style: i === index.length - 1 ? _extends({}, styles.item, { color: COLORS.SUBTITLE_COLOR }) : styles.item },
                    dpt.name
                ));
                if (i === index.length - 1) return;
                el.push(_react2.default.createElement(
                    'div',
                    { key: i + '-sep', style: _extends({}, styles.item, { padding: 0
                        }) },
                    _react2.default.createElement(_icon2.default, { type: 'right', color: COLORS.SUBTITLE_COLOR, size: 'md' })
                ));
            });
            return _react2.default.createElement(
                _View2.default,
                { style: _extends({}, styles.indexContainer, { width: document.documentElement.clientWidth - 50 }) },
                el
            );
        }
    }, {
        key: 'renderPickerContainer',
        value: function renderPickerContainer() {
            var _this5 = this;

            var _state = this.state,
                org = _state.org,
                checked = _state.checked,
                index = _state.index,
                companies = _state.companies;

            return _react2.default.createElement(
                'div',
                { style: styles.pickerContainer },
                function () {
                    switch (_this5.props.type) {
                        case 'empCheck':
                        case 'empRadio':
                            return _react2.default.createElement(
                                _list2.default,
                                null,
                                org.map(function (item) {
                                    if (item.type === 'all') return null;
                                    return _react2.default.createElement(_Cell2.default, {
                                        key: item.id,
                                        checkable: item.type === 'emp',
                                        checked: checked.searchByCondition(function (a) {
                                            return a.id === item.id;
                                        }),
                                        onClick: function onClick() {
                                            return item.type === 'emp' ? _this5.onChange(item) : _this5.onClick(item.id);
                                        },
                                        onCheck: function onCheck() {
                                            return _this5.onChange(item);
                                        },
                                        renderContent: function renderContent() {
                                            return _react2.default.createElement(
                                                _View2.default,
                                                { style: styles.cell },
                                                item.type === 'dpt' ? _react2.default.createElement('img', { src: require('../../assets/org.png'), style: styles.icon }) : !item.avatarHash ? _react2.default.createElement(
                                                    'div',
                                                    { style: _extends({}, styles.icon, { backgroundColor: colors[item.id % colors.length] }) },
                                                    item.name.substring(item.name.length - (item.name.length > 2 ? 2 : 1), item.name.length)
                                                ) : _react2.default.createElement('img', { src: Acc.getThumbUrl(item.avatarHash), style: styles.icon }),
                                                _react2.default.createElement(
                                                    _View2.default,
                                                    { style: styles.label },
                                                    item.name,
                                                    item.type === 'dpt' ? null : _react2.default.createElement(
                                                        'span',
                                                        { style: styles.job },
                                                        item.job
                                                    )
                                                ),
                                                item.type === 'dpt' ? _react2.default.createElement(
                                                    _View2.default,
                                                    { style: styles.arrow },
                                                    _react2.default.createElement(_icon2.default, { type: 'right',
                                                        size: 'md', color: COLORS.SUBTITLE_COLOR })
                                                ) : null
                                            );
                                        } });
                                })
                            );
                        case 'dptCheck':
                        case 'dptRadio':
                            return _react2.default.createElement(
                                _list2.default,
                                null,
                                org.map(function (item) {
                                    if (item.type === 'dpt' || index.length === 1 && item.type === 'all') {
                                        return _react2.default.createElement(_Cell2.default, {
                                            key: item.id,
                                            checked: checked.searchByCondition(function (a) {
                                                return a.id === item.id;
                                            }),
                                            checkable: true,
                                            onClick: function onClick() {
                                                return item.isLeaf || index.length === 1 && item.type === 'all' ? _this5.onChange(item) : _this5.onClick(item.id);
                                            },
                                            onCheck: function onCheck() {
                                                return _this5.onChange(item);
                                            },
                                            renderContent: function renderContent() {
                                                return _react2.default.createElement(
                                                    _View2.default,
                                                    { style: styles.cell },
                                                    _react2.default.createElement('img', { src: index.length === 1 && item.type === 'all' ? require('../../assets/org-prt.png') : require('../../assets/org.png'),
                                                        style: styles.icon }),
                                                    _react2.default.createElement(
                                                        _View2.default,
                                                        { style: styles.label },
                                                        item.name
                                                    ),
                                                    !item.isLeaf && !(index.length === 1 && item.type === 'all') ? _react2.default.createElement(
                                                        _View2.default,
                                                        { style: styles.arrow },
                                                        _react2.default.createElement(_icon2.default, { type: 'right',
                                                            size: 'md', color: COLORS.SUBTITLE_COLOR })
                                                    ) : null
                                                );
                                            } });
                                    } else {
                                        return null;
                                    }
                                })
                            );
                        case 'cmpCheck':
                            return _react2.default.createElement(
                                _list2.default,
                                null,
                                companies.map(function (item, i) {
                                    if (i === 0) return null;
                                    return _react2.default.createElement(_Cell2.default, {
                                        key: item.id,
                                        checked: checked.searchByCondition(function (a) {
                                            return a.id === item.id;
                                        }),
                                        checkable: true,
                                        onClick: function onClick() {
                                            return item.isLeaf ? _this5.onChange(item) : _this5.onClick(item.id);
                                        },
                                        onCheck: function onCheck() {
                                            return _this5.onChange(item);
                                        },
                                        renderContent: function renderContent() {
                                            return _react2.default.createElement(
                                                _View2.default,
                                                { style: styles.cell },
                                                _react2.default.createElement('img', { src: require('../../assets/org.png'),
                                                    style: styles.icon }),
                                                _react2.default.createElement(
                                                    _View2.default,
                                                    { style: styles.label },
                                                    item.name
                                                ),
                                                !item.isLeaf ? _react2.default.createElement(
                                                    _View2.default,
                                                    { style: styles.arrow },
                                                    _react2.default.createElement(_icon2.default, { type: 'right',
                                                        size: 'md', color: COLORS.SUBTITLE_COLOR })
                                                ) : null
                                            );
                                        } });
                                })
                            );
                        case 'cmpRadio':
                            return _react2.default.createElement(
                                _list2.default,
                                null,
                                companies.map(function (item) {
                                    return _react2.default.createElement(_Cell2.default, {
                                        key: item.id,
                                        checked: checked.searchByCondition(function (a) {
                                            return a.id === item.id;
                                        }),
                                        checkable: true,
                                        onClick: function onClick() {
                                            return _this5.onChange(item);
                                        },
                                        onCheck: function onCheck() {
                                            return _this5.onChange(item);
                                        },
                                        renderContent: function renderContent() {
                                            return _react2.default.createElement(
                                                _View2.default,
                                                { style: styles.cell },
                                                _react2.default.createElement('img', { src: require('../../assets/org.png'),
                                                    style: styles.icon }),
                                                _react2.default.createElement(
                                                    _View2.default,
                                                    { style: styles.label },
                                                    item.name
                                                )
                                            );
                                        } });
                                })
                            );
                    }
                }()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

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
                            _react2.default.createElement(_icon2.default, { type: require('../../assets/tick.svg'), color: !this.props.enableEmpty && this.state.checked.length === 0 ? 'rgba(74, 144, 226, 0.3)' : COLORS.PRIMARY_COLOR })
                        )
                    },
                    this.getNavTitle()
                ),
                _react2.default.createElement(_ListView2.default, {
                    ref: function ref(o) {
                        return _this6.listView = o;
                    },
                    style: { height: document.documentElement.clientHeight - 90, width: '100%', backgroundColor: COLORS.BACKGROUND_COLOR },
                    refreshable: false,
                    footerHidden: true,
                    renderHeader: this.renderHeader,
                    renderRow: function renderRow() {
                        return _this6.state.loading ? _this6.renderLoading() : _this6.state.org.length === 1 ? _this6.renderNoEmp() : _this6.renderPickerContainer();
                    },
                    onFetch: function onFetch(page, fill) {
                        _this6.fill = fill;
                        fill([''], true);
                    } })
            );
        }
    }]);

    return OrgPicker;
}(_react2.default.Component);

OrgPicker.propTypes = {
    type: _react2.default.PropTypes.oneOf(['empCheck', 'empRadio', 'dptCheck', 'dptRadio', 'cmpCheck', 'cmpRadio']),
    checked: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    onConfirm: _react2.default.PropTypes.func,
    enableEmpty: _react2.default.PropTypes.bool
};
OrgPicker.defaultProps = {
    type: 'empRadio',
    checked: []
};
OrgPicker.indexForType = {};


var styles = {
    container: {
        width: '100%',
        backgroundColor: 'white'
    },
    checkedContainer: {
        paddingLeft: 30,
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center'
    },
    indexContainer: {
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all'
    },
    pickerContainer: {
        borderTop: '1px solid ' + COLORS.BORDER_COLOR,
        borderBottom: '1px solid ' + COLORS.BORDER_COLOR,
        width: '100%'
    },
    loading: {
        width: '100%',
        marginTop: 20,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BACKGROUND_COLOR
    },
    loadingText: {
        fontSize: 28,
        color: COLORS.TITLE_COLOR
    },
    cell: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        borderBottom: '1px solid ' + COLORS.BORDER_COLOR
    },
    label: {
        marginLeft: 20,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        color: COLORS.TITLE_COLOR,
        fontSize: 32
    },
    icon: {
        display: '-webkit-flex',
        width: 70,
        height: 70,
        borderRadius: '50%',
        fontSize: 25,
        justifyContent: 'center',
        alignItems: 'center',
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
    arrow: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 60
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