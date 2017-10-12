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

var _css4 = require('antd-mobile/lib/search-bar/style/css');

var _searchBar = require('antd-mobile/lib/search-bar');

var _searchBar2 = _interopRequireDefault(_searchBar);

var _css5 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

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

var _Acc = require('../../utils/Acc');

var Acc = _interopRequireWildcard(_Acc);

var _Header = require('../Search/Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colors = [COLORS.BLUE_COLOR, COLORS.RED_COLOR, COLORS.GREEN_COLOR, COLORS.YELLOW_COLOR];

var OrgPicker = (_temp = _class = function (_React$Component) {
    _inherits(OrgPicker, _React$Component);

    function OrgPicker(props) {
        var _this2 = this;

        _classCallCheck(this, OrgPicker);

        var _this = _possibleConstructorReturn(this, (OrgPicker.__proto__ || Object.getPrototypeOf(OrgPicker)).call(this, props));

        _this.request = function () {
            var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(id) {
                var _ref2, data, _ref3, _data, _ref4, me, _ref5, _data2;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _this.setState({ loading: true });

                                if (!(_this.props.type === 'cmpCheck')) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 4;
                                return (0, _request2.default)(API + 'EAPOrg/QueryChildrenCompany?companyId=' + id);

                            case 4:
                                _ref2 = _context.sent;
                                data = _ref2.data;

                                OrgPicker.indexForType[_this.props.type] = [].concat(_toConsumableArray(_this.state.index), [data.companies[0]]);
                                _this.setState({
                                    index: OrgPicker.indexForType[_this.props.type],
                                    companies: data.companies,
                                    loading: false
                                });
                                _context.next = 30;
                                break;

                            case 10:
                                if (!(_this.props.type === 'cmpRadio')) {
                                    _context.next = 18;
                                    break;
                                }

                                _context.next = 13;
                                return (0, _request2.default)(API + 'EAPOrg/QueryCompany');

                            case 13:
                                _ref3 = _context.sent;
                                _data = _ref3.data;

                                _this.setState({
                                    companies: _data.companies,
                                    loading: false
                                });
                                _context.next = 30;
                                break;

                            case 18:
                                if (!(_this.props.accessControl && id === 0)) {
                                    _context.next = 24;
                                    break;
                                }

                                _context.next = 21;
                                return (0, _request2.default)(API + 'EAPMe/QueryMe');

                            case 21:
                                _ref4 = _context.sent;
                                me = _ref4.data.me;

                                id = me.currentCmpDptId;

                            case 24:
                                _context.next = 26;
                                return (0, _request2.default)(API + 'EAPOrg/QueryOrg?dptId=' + id + '&companyId=0');

                            case 26:
                                _ref5 = _context.sent;
                                _data2 = _ref5.data;

                                OrgPicker.indexForType[_this.props.type] = [].concat(_toConsumableArray(_this.state.index), [_data2.org[0]]);
                                _this.setState({
                                    index: OrgPicker.indexForType[_this.props.type],
                                    org: _data2.org,
                                    loading: false
                                });

                            case 30:

                                // 刷新
                                _this.listView.refreshUI();
                                _this.listView.scrollToTop();

                            case 32:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

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
            if (_this.props.disableCheckedDelete) return;
            var checked = _this.state.checked;

            _this.setState({
                checked: checked.removeByCondition(function (i) {
                    return i.id === item.id;
                })
            });
        };

        _this.onSearch = function (content) {
            _this.setState({
                content: content
            });
            content = content.replace(/(^\s*)|(\s*$)/g, '');
            if (content.length === 0) return _this.setState({ emps: [] });
            _this.setState({ searching: true });
            (0, _request2.default)(API + 'EAPOrg/Search?content=' + content).then(function (_ref6) {
                var data = _ref6.data;

                _this.setState({
                    emps: data.emps,
                    searching: false
                });
            });
        };

        _this.renderHeader = function () {
            return _react2.default.createElement(
                'div',
                { style: { backgroundColor: 'white' } },
                _this.renderSearchContainer(),
                _this.renderCheckedContainer(),
                _this.renderIndexContainer()
            );
        };

        _this.state = {
            originalChecked: props.checked,
            checked: props.checked,
            index: props.nocache ? [] : OrgPicker.indexForType[props.type] || [],
            loading: true,
            org: [],
            companies: [],
            content: '',
            emps: [],
            focused: false,
            searching: false
        };
        return _this;
    }

    _createClass(OrgPicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            setTimeout(function () {
                if (_this3.state.index.length === 0) {
                    _this3.request(0);
                } else {
                    var id = _this3.state.index[_this3.state.index.length - 1].id;
                    _this3.request(id);
                    _this3.setState({
                        index: _this3.state.index.removeByCondition(function (i) {
                            return i.id === id;
                        })
                    });
                }
            }, 250);
            window.addEventListener('resize', function () {
                _this3.forceUpdate();
            }, false);
        }
    }, {
        key: 'getNavTitle',
        value: function getNavTitle() {
            var _props = this.props,
                type = _props.type,
                customLabel = _props.customLabel;

            if (customLabel) return customLabel;
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
                    return '切换单位';
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
        key: 'renderSearchContainer',
        value: function renderSearchContainer() {
            var _this4 = this;

            var type = this.props.type;

            switch (type) {
                case 'dptCheck':
                case 'dptRadio':
                case 'cmpRadio':
                case 'cmpCheck':
                    return null;
            }
            return _react2.default.createElement(_searchBar2.default, { placeholder: '\u641C\u7D22', value: this.state.content, onChange: this.onSearch, onFocus: function onFocus() {
                    return _this4.setState({ focused: true });
                }, onBlur: function onBlur() {
                    return _this4.setState({ focused: false });
                }, onCancel: function onCancel() {
                    return _this4.setState({ emps: [], content: '' });
                } });
        }
    }, {
        key: 'renderCheckedContainer',
        value: function renderCheckedContainer() {
            var _this5 = this;

            var checked = this.state.checked;

            if (checked.length === 0) return null;
            var checkedEl = [];
            checked.map(function (item, i) {
                checkedEl.push(_react2.default.createElement(
                    'div',
                    { key: i,
                        onClick: function onClick() {
                            return _this5.onCheckedClick(item);
                        },
                        style: _extends({}, styles.item, { color: _this5.props.disableCheckedDelete ? COLORS.SUBTITLE_COLOR : COLORS.RED_COLOR
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
            var _this6 = this;

            var index = this.state.index;

            if (index.length === 0) return null;
            if (this.state.focused || this.state.content.length > 0) return null;
            if (this.props.type === 'cmpRadio') return null; // 切换公司不需要Index
            var el = [];
            index.map(function (dpt, i) {
                el.push(_react2.default.createElement(
                    'div',
                    { key: i, onClick: function onClick() {
                            i !== index.length - 1 && _this6.dptLink(dpt.id);
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
        key: 'renderSearchResult',
        value: function renderSearchResult() {
            var _this7 = this;

            var _state = this.state,
                emps = _state.emps,
                content = _state.content,
                searching = _state.searching,
                checked = _state.checked,
                originalChecked = _state.originalChecked;

            return _react2.default.createElement(
                'div',
                { style: styles.pickerContainer },
                content.length === 0 ? _react2.default.createElement(_Header2.default, { label: '\u641C\u7D22\u4EBA\u5458', type: 'search' }) : emps.length === 0 ? _react2.default.createElement(_Header2.default, { label: searching ? '加载中' : '没有该人员', type: searching ? 'search' : 'search-noresult' }) : _react2.default.createElement(
                    _list2.default,
                    null,
                    emps.map(function (item) {
                        return _react2.default.createElement(_Cell2.default, {
                            disabled: _this7.props.disableCheckedDelete ? originalChecked.searchByCondition(function (i) {
                                return i.id === item.id;
                            }) : false,
                            key: item.id,
                            checkable: true,
                            checked: checked.searchByCondition(function (a) {
                                return a.id === item.id;
                            }),
                            onClick: function onClick() {
                                return _this7.onChange(item);
                            },
                            onCheck: function onCheck() {
                                return _this7.onChange(item);
                            },
                            renderContent: function renderContent() {
                                return _react2.default.createElement(
                                    _View2.default,
                                    { style: styles.cell },
                                    !item.avatarHash ? _react2.default.createElement(
                                        'div',
                                        { style: _extends({}, styles.icon, { backgroundColor: colors[item.id % colors.length] }) },
                                        item.name.substring(item.name.length - (item.name.length > 2 ? 2 : 1), item.name.length)
                                    ) : _react2.default.createElement('img', { src: Acc.getThumbUrl(item.avatarHash), style: styles.icon }),
                                    _react2.default.createElement(
                                        _View2.default,
                                        { style: styles.label },
                                        item.name,
                                        !item.jobName ? null : _react2.default.createElement(
                                            'span',
                                            { style: styles.job },
                                            item.jobName
                                        )
                                    )
                                );
                            } });
                    })
                )
            );
        }
    }, {
        key: 'renderPickerContainer',
        value: function renderPickerContainer() {
            var _this8 = this;

            if (this.state.focused || this.state.content.length > 0) return this.renderSearchResult();
            var disableCheckedDelete = this.props.disableCheckedDelete;
            var _state2 = this.state,
                org = _state2.org,
                checked = _state2.checked,
                index = _state2.index,
                companies = _state2.companies,
                originalChecked = _state2.originalChecked;

            return _react2.default.createElement(
                'div',
                { style: styles.pickerContainer },
                function () {
                    switch (_this8.props.type) {
                        case 'empCheck':
                        case 'empRadio':
                            return _react2.default.createElement(
                                _list2.default,
                                null,
                                org.map(function (item) {
                                    if (item.type === 'all') return null;
                                    return _react2.default.createElement(_Cell2.default, {
                                        disabled: disableCheckedDelete ? originalChecked.searchByCondition(function (i) {
                                            return i.id === item.id;
                                        }) : false,
                                        key: item.id,
                                        checkable: item.type === 'emp',
                                        checked: checked.searchByCondition(function (a) {
                                            return a.id === item.id;
                                        }),
                                        onClick: function onClick() {
                                            return item.type === 'emp' ? _this8.onChange(item) : _this8.onClick(item.id);
                                        },
                                        onCheck: function onCheck() {
                                            return _this8.onChange(item);
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
                                                    item.type === 'dpt' || !item.jobName ? null : _react2.default.createElement(
                                                        'span',
                                                        { style: styles.job },
                                                        item.jobName
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
                                            disabled: disableCheckedDelete ? originalChecked.searchByCondition(function (i) {
                                                return i.id === item.id;
                                            }) : false,
                                            key: item.id,
                                            checked: checked.searchByCondition(function (a) {
                                                return a.id === item.id;
                                            }),
                                            checkable: true,
                                            onClick: function onClick() {
                                                return item.isLeaf || index.length === 1 && item.type === 'all' ? _this8.onChange(item) : _this8.onClick(item.id);
                                            },
                                            onCheck: function onCheck() {
                                                return _this8.onChange(item);
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
                                        disabled: disableCheckedDelete ? originalChecked.searchByCondition(function (i) {
                                            return i.id === item.id;
                                        }) : false,
                                        key: item.id,
                                        checked: checked.searchByCondition(function (a) {
                                            return a.id === item.id;
                                        }),
                                        checkable: true,
                                        onClick: function onClick() {
                                            return item.isLeaf ? _this8.onChange(item) : _this8.onClick(item.id);
                                        },
                                        onCheck: function onCheck() {
                                            return _this8.onChange(item);
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
                                        disabled: disableCheckedDelete ? originalChecked.searchByCondition(function (i) {
                                            return i.id === item.id;
                                        }) : false,
                                        key: item.id,
                                        checked: checked.searchByCondition(function (a) {
                                            return a.id === item.id;
                                        }),
                                        checkable: true,
                                        onClick: function onClick() {
                                            return _this8.onChange(item);
                                        },
                                        onCheck: function onCheck() {
                                            return _this8.onChange(item);
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
            var _this9 = this;

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
                        return _this9.listView = o;
                    },
                    style: { height: document.documentElement.clientHeight - 90, width: '100%', backgroundColor: COLORS.BACKGROUND_COLOR },
                    refreshable: false,
                    footerHidden: true,
                    renderHeader: this.renderHeader,
                    renderRow: function renderRow() {
                        return _this9.state.loading ? _this9.renderLoading() : _this9.state.org.length === 1 ? _this9.renderNoEmp() : _this9.renderPickerContainer();
                    },
                    onFetch: function onFetch(page, fill) {
                        _this9.fill = fill;
                        fill([''], true);
                    } })
            );
        }
    }]);

    return OrgPicker;
}(_react2.default.Component), _class.propTypes = {
    type: _react2.default.PropTypes.oneOf(['empCheck', 'empRadio', 'dptCheck', 'dptRadio', 'cmpCheck', 'cmpRadio']),
    checked: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    onConfirm: _react2.default.PropTypes.func,
    enableEmpty: _react2.default.PropTypes.bool,
    customLabel: _react2.default.PropTypes.string,
    nocache: _react2.default.PropTypes.bool,
    disableCheckedDelete: _react2.default.PropTypes.bool,
    accessControl: _react2.default.PropTypes.bool
}, _class.defaultProps = {
    type: 'empRadio',
    checked: []
}, _class.indexForType = {}, _temp);


var styles = {
    container: {
        width: '100%',
        backgroundColor: 'white'
    },
    checkedContainer: {
        padding: '15px 30px',
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

function show(options) {
    _popup2.default.show(_react2.default.createElement(OrgPicker, options), { transitionName: 'am-fade', wrapProps: _wrapProps2.default });
}

exports.default = show;