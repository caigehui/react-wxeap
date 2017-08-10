'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = require('antd-mobile/lib/icon/style/css');

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _css2 = require('antd-mobile/lib/popup/style/css');

var _popup = require('antd-mobile/lib/popup');

var _popup2 = _interopRequireDefault(_popup);

var _css3 = require('antd-mobile/lib/tabs/style/css');

var _tabs = require('antd-mobile/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _wrapProps = require('../../utils/wrapProps');

var _wrapProps2 = _interopRequireDefault(_wrapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _tabs2.default.TabPane;

var DatePicker = (_temp = _class = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        // 初始化日期业务模型
        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this.onClick = function (label) {
            if (label === '自定义日期') return _this.setState({ isCustomDate: true });
            var format = _this.props.format;

            var checked = {
                label: label,
                start: function () {
                    switch (label) {
                        case '今日':
                            return (0, _moment2.default)().format(format);
                        case '昨日':
                            return (0, _moment2.default)().subtract(1, 'days').format(format);
                        case '本周':
                            return (0, _moment2.default)().startOf('week').format(format);
                        case '上周':
                            return (0, _moment2.default)().subtract(1, 'weeks').startOf('week').format(format);
                        case '本月':
                            return (0, _moment2.default)().startOf('month').format(format);
                        case '上月':
                            return (0, _moment2.default)().subtract(1, 'months').startOf('month').format(format);
                        case '一天内':
                            return (0, _moment2.default)().subtract(1, 'days').format(format);
                        case '一周内':
                            return (0, _moment2.default)().subtract(1, 'weeks').format(format);
                        case '一月内':
                            return (0, _moment2.default)().subtract(1, 'months').format(format);
                        case '一年内':
                            return (0, _moment2.default)().subtract(1, 'years').format(format);
                        default:
                            return '';
                    }
                }(),
                end: function () {
                    switch (label) {
                        case '今日':
                            return (0, _moment2.default)().format(format);
                        case '昨日':
                            return (0, _moment2.default)().subtract(1, 'days').format(format);
                        case '本周':
                            return (0, _moment2.default)().endOf('week').format(format);
                        case '上周':
                            return (0, _moment2.default)().subtract(1, 'weeks').endOf('week').format(format);
                        case '本月':
                            return (0, _moment2.default)().endOf('month').format(format);
                        case '上月':
                            return (0, _moment2.default)().subtract(1, 'months').endOf('month').format(format);
                        case '一天内':
                        case '一周内':
                        case '一月内':
                        case '一年内':
                            return (0, _moment2.default)().format(format);
                        default:
                            return '';
                    }
                }(),
                type: ''
            };
            _this.setState({
                checked: checked
            });
            setTimeout(function () {
                _this.props.onSelect && _this.props.onSelect(checked);
                _popup2.default.hide();
            }, 200);
        };

        _this.onTabChange = function (key) {
            _this.setState({
                tab: key
            });
        };

        _this.cleanSelectedDate = function () {
            _this.setState({
                selectedDate: {
                    start: '',
                    end: ''
                }
            });
        };

        _this.onSelectDate = function () {
            var _this$state = _this.state,
                selectedDate = _this$state.selectedDate,
                tab = _this$state.tab;
            var format = _this.props.format;

            var checked = {
                label: '自定义日期',
                start: function () {
                    switch (tab) {
                        case '1':
                            return selectedDate.start.format(format);
                        case '2':
                            return selectedDate.start.startOf('week').format(format);
                        case '3':
                            return selectedDate.start.startOf('month').format(format);
                        case '4':
                            return selectedDate.start.startOf('quarter').format(format);
                    }
                }(),
                end: function () {
                    switch (tab) {
                        case '1':
                            return selectedDate.end.format(format);
                        case '2':
                            return selectedDate.end.endOf('week').format(format);
                        case '3':
                            return selectedDate.end.endOf('month').format(format);
                        case '4':
                            return selectedDate.end.endOf('quarter').format(format);
                    }
                }(),
                type: function () {
                    switch (tab) {
                        case '1':
                            return '日历';
                        case '2':
                            return '周历';
                        case '3':
                            return '月历';
                        case '4':
                            return '季度';
                    }
                }()
            };
            _this.props.onSelect && _this.props.onSelect(checked);
            _popup2.default.hide();
        };

        _this.renderCalendar = function (isDay) {
            var currents = _this.state.currents;

            var selectedDate = {
                start: (0, _moment2.default)(_this.state.selectedDate.start),
                end: (0, _moment2.default)(_this.state.selectedDate.end)
            };
            var current = isDay ? currents[0] : currents[1]; // 日历的时间轴
            var lastMonthEndDay = (0, _moment2.default)(current.subtract(1, 'months').endOf('month')); // 上个月最后一天
            current.add(1, 'months');
            var nextMonthStartDay = (0, _moment2.default)(current.add(1, 'months').startOf('month')); // 下个月第一天
            current.subtract(1, 'months');
            var startDay = current.startOf('month').day() || 7; // 如果是星期天则为7
            var dayNum = current.endOf('month').date() + startDay; // 本月天数+上月剩余天数

            return _react2.default.createElement(
                _View2.default,
                { style: styles.calendar },
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.picker },
                    _react2.default.createElement(
                        _View2.default,
                        null,
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginRight: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(isDay ? 0 : 1, 1, current.subtract(1, 'years'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'left', color: 'rgb(160, 160, 160)' })
                        ),
                        current.format('YYYY年'),
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginLeft: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(isDay ? 0 : 1, 1, current.add(1, 'years'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'right', color: 'rgb(160, 160, 160)' })
                        )
                    ),
                    _react2.default.createElement(
                        _View2.default,
                        null,
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginRight: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(isDay ? 0 : 1, 1, current.subtract(1, 'months'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'left', color: 'rgb(160, 160, 160)' })
                        ),
                        current.format('M月'),
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginLeft: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(isDay ? 0 : 1, 1, current.add(1, 'months'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'right', color: 'rgb(160, 160, 160)' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.days },
                    function () {
                        var el = [];
                        for (var i = 0; i < 7; i++) {
                            var _loop = function _loop(j) {
                                var style = styles.day;
                                var textStyle = styles.text;
                                var label = '';
                                var tip = '';
                                // 表头
                                if (i === 0) {
                                    style = _extends({}, style, { borderBottom: '1px solid rgb(220, 220, 220)' });
                                    switch (j) {
                                        case 0:
                                            label = '一';
                                            break;
                                        case 1:
                                            label = '二';
                                            break;
                                        case 2:
                                            label = '三';
                                            break;
                                        case 3:
                                            label = '四';
                                            break;
                                        case 4:
                                            label = '五';
                                            break;
                                        case 5:
                                            label = '六';
                                            break;
                                        case 6:
                                            label = '日';
                                            break;
                                    }
                                }

                                // 周末的日期
                                if (j > 4) {
                                    textStyle = _extends({}, textStyle, styles.weekends);
                                }

                                var setSelectedDay = function setSelectedDay(date) {
                                    if (!isDay) {
                                        // 周历
                                        if (selectedDate.start && date.isSameOrAfter(selectedDate.start.startOf('week')) && date.isSameOrBefore(selectedDate.start.endOf('week'))) {
                                            if (date.isSame(selectedDate.start.startOf('week'), 'day')) tip = '开始';
                                            if (date.isSame(selectedDate.start.endOf('week'), 'day')) tip = '结束';
                                            textStyle = _extends({}, textStyle, styles.daySelected);
                                        }
                                    } else {
                                        // 日历
                                        if (selectedDate.start && date.isSame(selectedDate.start, 'day')) {
                                            tip = '开始';
                                            textStyle = _extends({}, textStyle, styles.daySelected);
                                        } else if (selectedDate.end && date.isAfter(selectedDate.start) && date.isBefore(selectedDate.end)) {
                                            textStyle = _extends({}, textStyle, styles.daySelected);
                                        } else if (selectedDate.end && date.isSame(selectedDate.end, 'day')) {
                                            tip = '结束';
                                            textStyle = _extends({}, textStyle, styles.daySelected);
                                        }
                                    }
                                };
                                var date = null;

                                // 上个月的日期
                                if (i === 1 && j < startDay - 1) {
                                    textStyle = _extends({}, textStyle, styles.inactive);
                                    date = (0, _moment2.default)(lastMonthEndDay.subtract(startDay - 2 - j, 'days'));
                                    lastMonthEndDay.add(startDay - 2 - j, 'days');
                                    label = date.format('D');
                                    setSelectedDay(date);
                                } else if (i === Math.ceil(dayNum / 7) && j >= dayNum % 7 - 1 || i > Math.ceil(dayNum / 7)) {
                                    var offsetY = i - Math.ceil(dayNum / 7);
                                    var offsetX = j - dayNum % 7 + 1;
                                    textStyle = _extends({}, textStyle, styles.inactive);
                                    date = (0, _moment2.default)(nextMonthStartDay.add(offsetY * 7 + offsetX, 'days'));
                                    label = date.format('D');
                                    nextMonthStartDay.subtract(offsetY * 7 + offsetX, 'days');
                                    setSelectedDay(date);
                                } else if (i > 0) {
                                    var _offsetY = i - 1;
                                    var _offsetX = j - startDay + 1;
                                    date = (0, _moment2.default)(current.startOf('month').add(_offsetY * 7 + _offsetX, 'days'));
                                    label = date.format('D');
                                    setSelectedDay(date);
                                }
                                el.push(_react2.default.createElement(
                                    _View2.default,
                                    { key: i + '-' + j, style: style },
                                    _react2.default.createElement(
                                        _View2.default,
                                        { style: textStyle, onClick: function onClick() {
                                                if (!date) return;
                                                if (isDay) {
                                                    // 日历
                                                    if (selectedDate.start.isSame(selectedDate.end, 'day')) {

                                                        _this.setState({
                                                            selectedDate: {
                                                                start: date.isBefore(selectedDate.start) ? date : selectedDate.start,
                                                                end: date.isBefore(selectedDate.start) ? selectedDate.start : date
                                                            }
                                                        });
                                                    } else {
                                                        _this.setState({
                                                            selectedDate: {
                                                                start: date,
                                                                end: date
                                                            }
                                                        });
                                                    }
                                                } else {
                                                    // 周历
                                                    _this.setState({
                                                        selectedDate: {
                                                            start: (0, _moment2.default)(date.startOf('week')),
                                                            end: (0, _moment2.default)(date.endOf('week'))
                                                        }
                                                    });
                                                }
                                            } },
                                        label,
                                        i === 0 ? null : _react2.default.createElement(
                                            _View2.default,
                                            { style: styles.text2 },
                                            tip
                                        )
                                    )
                                ));
                            };

                            for (var j = 0; j < 7; j++) {
                                _loop(j);
                            }
                        }
                        return el;
                    }()
                )
            );
        };

        _this.renderMonth = function () {
            var currents = _this.state.currents;

            var selectedDate = {
                start: (0, _moment2.default)(_this.state.selectedDate.start),
                end: (0, _moment2.default)(_this.state.selectedDate.end)
            };
            var current = currents[2];
            return _react2.default.createElement(
                _View2.default,
                { style: styles.calendar },
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.picker },
                    _react2.default.createElement(
                        _View2.default,
                        null,
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginRight: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(2, 1, current.subtract(1, 'years'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'left', color: 'rgb(160, 160, 160)' })
                        ),
                        current.format('YYYY年'),
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginLeft: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(2, 1, current.add(1, 'years'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'right', color: 'rgb(160, 160, 160)' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.months },
                    function () {
                        var el = [];

                        var _loop2 = function _loop2(i) {
                            var _loop3 = function _loop3(j) {
                                var style = styles.month;
                                var label = i * 3 + j + 1 + '\u6708';
                                if (current.isSame(selectedDate.start, 'year')) {
                                    if (i * 3 + j === selectedDate.start.month()) {
                                        style = _extends({}, style, styles.monthSelected);
                                    }
                                }
                                el.push(_react2.default.createElement(
                                    _View2.default,
                                    { key: i + '-' + j, style: style, onClick: function onClick() {
                                            _this.setState({
                                                selectedDate: {
                                                    start: (0, _moment2.default)(current).month(i * 3 + j).startOf('month'),
                                                    end: (0, _moment2.default)(current).month(i * 3 + j).endOf('month')
                                                }
                                            });
                                        } },
                                    label
                                ));
                            };

                            for (var j = 0; j < 3; j++) {
                                _loop3(j);
                            }
                        };

                        for (var i = 0; i < 4; i++) {
                            _loop2(i);
                        }
                        return el;
                    }()
                )
            );
        };

        _this.renderSeason = function () {
            var currents = _this.state.currents;

            var selectedDate = {
                start: (0, _moment2.default)(_this.state.selectedDate.start),
                end: (0, _moment2.default)(_this.state.selectedDate.end)
            };
            var current = currents[3];
            return _react2.default.createElement(
                _View2.default,
                { style: styles.calendar },
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.picker },
                    _react2.default.createElement(
                        _View2.default,
                        null,
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginRight: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(3, 1, current.subtract(1, 'years'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'left', color: 'rgb(160, 160, 160)' })
                        ),
                        current.format('YYYY年'),
                        _react2.default.createElement(
                            _View2.default,
                            { style: _extends({}, styles.icon, { marginLeft: 20 }), onClick: function onClick() {
                                    var currents = _this.state.currents;

                                    currents.splice(3, 1, current.add(1, 'years'));
                                    _this.setState({
                                        currents: currents
                                    });
                                } },
                            _react2.default.createElement(_icon2.default, { type: 'right', color: 'rgb(160, 160, 160)' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _View2.default,
                    { style: styles.seasons },
                    function () {
                        var el = [];

                        var _loop4 = function _loop4(i) {
                            var style = styles.season;
                            if (current.isSame(selectedDate.start, 'year')) {
                                if (i + 1 === selectedDate.start.quarter()) {
                                    style = _extends({}, style, styles.seasonSelected);
                                }
                            }
                            el.push(_react2.default.createElement(
                                _View2.default,
                                { key: i, style: style, onClick: function onClick() {
                                        _this.setState({
                                            selectedDate: {
                                                start: (0, _moment2.default)(current).quarter(i + 1).startOf('quarter'),
                                                end: (0, _moment2.default)(current).quarter(i + 1).endOf('quarter')
                                            }
                                        });
                                    } },
                                i + 1 + '\u5B63\u5EA6'
                            ));
                        };

                        for (var i = 0; i < 4; i++) {
                            _loop4(i);
                        }
                        return el;
                    }()
                )
            );
        };

        _this.state = {
            checked: props.checked, // 已选择的日期
            isCustomDate: false, // 是否自定义日期范围
            tab: function () {
                // 当前自定义日期范围的类型
                switch (props.checked.type) {
                    case '日历':
                        return '1';
                    case '周历':
                        return '2';
                    case '月历':
                        return '3';
                    case '季度':
                        return '4';
                    default:
                        return '1';
                }
            }(),
            currents: function () {
                // 自定义日期范围的年月时间点
                var current = props.checked.start ? (0, _moment2.default)(props.checked.start, props.format) : (0, _moment2.default)();
                return [current, current, current, current];
            }(),
            selectedDate: {
                start: props.checked.start ? (0, _moment2.default)(props.checked.start, props.format) : '',
                end: props.checked.end ? (0, _moment2.default)(props.checked.end, props.format) : ''
            }

        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            window.addEventListener('resize', function () {
                _this2.forceUpdate();
            }, false);
        }

        /**
         * 点击各个Item
         */


        /**
         * 选项卡发生改变
         */


        /**
         * 清空日期
         */


        /**
         * 自定义日期范围点击确定
         */


        /**
         * 渲染日历和周历
         */


        /**
         * 渲染月份
         */


        /**
         * 渲染季度
         */

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var type = this.props.type;
            var _state = this.state,
                checked = _state.checked,
                isCustomDate = _state.isCustomDate,
                selectedDate = _state.selectedDate,
                tab = _state.tab;

            var row1 = type === 'filter' ? ['一天内', '一周内', '一月内'] : ['今日', '昨日', '本周'];
            var row2 = type === 'filter' ? ['一年内'] : ['上周', '本月', '上月'];
            if (isCustomDate) return _react2.default.createElement(
                _View2.default,
                { style: _extends({}, styles.container, { height: document.documentElement.clientHeight }), onClick: _popup2.default.hide },
                _react2.default.createElement(
                    _View2.default,
                    { style: _extends({}, styles.customContainer, {
                            width: document.documentElement.clientWidth - 120
                        }), onClick: function onClick(e) {
                            return e.stopPropagation();
                        } },
                    _react2.default.createElement(
                        _tabs2.default,
                        { defaultActiveKey: '1', activeKey: tab, onChange: this.onTabChange, style: styles.tabs, swipeable: false },
                        _react2.default.createElement(
                            TabPane,
                            { tab: '\u65E5\u5386', key: '1' },
                            this.renderCalendar(true)
                        ),
                        _react2.default.createElement(
                            TabPane,
                            { tab: '\u5468\u5386', key: '2' },
                            this.renderCalendar(false)
                        ),
                        _react2.default.createElement(
                            TabPane,
                            { tab: '\u6708\u5386', key: '3' },
                            this.renderMonth()
                        ),
                        _react2.default.createElement(
                            TabPane,
                            { tab: '\u5B63\u5EA6', key: '4' },
                            this.renderSeason()
                        )
                    ),
                    _react2.default.createElement(
                        _View2.default,
                        { style: styles.bottom },
                        _react2.default.createElement(
                            _View2.default,
                            { style: styles.cancel, onClick: this.cleanSelectedDate },
                            '\u6E05\u7A7A\u65E5\u671F'
                        ),
                        _react2.default.createElement(
                            _View2.default,
                            { style: selectedDate.start ? styles.confirm : styles.confirmForbidden, onClick: selectedDate.start ? this.onSelectDate : null },
                            '\u786E\u5B9A'
                        )
                    )
                )
            );
            return _react2.default.createElement(
                _View2.default,
                { style: _extends({}, styles.container, { height: document.documentElement.clientHeight }), onClick: _popup2.default.hide },
                _react2.default.createElement(
                    _View2.default,
                    { style: _extends({}, styles.insideContainer, { width: document.documentElement.clientWidth - 120 }), onClick: function onClick(e) {
                            return e.stopPropagation();
                        } },
                    _react2.default.createElement(
                        _View2.default,
                        { style: styles.row },
                        row1.map(function (name) {
                            return _react2.default.createElement(
                                _View2.default,
                                { key: name, style: name === checked.label ? _extends({}, styles.item, styles.itemSelected) : styles.item, onClick: function onClick(e) {
                                        e.stopPropagation();_this3.onClick(name);
                                    } },
                                name
                            );
                        })
                    ),
                    _react2.default.createElement(
                        _View2.default,
                        { style: styles.row },
                        row2.map(function (name) {
                            return _react2.default.createElement(
                                _View2.default,
                                { key: name, style: name === checked.label ? _extends({}, styles.item, styles.itemSelected) : styles.item, onClick: function onClick(e) {
                                        e.stopPropagation();_this3.onClick(name);
                                    } },
                                name
                            );
                        })
                    ),
                    _react2.default.createElement(
                        _View2.default,
                        { style: styles.row },
                        _react2.default.createElement(
                            _View2.default,
                            { style: '自定义日期' === checked.label ? _extends({}, styles.item, styles.itemSelected) : styles.item, onClick: function onClick(e) {
                                    e.stopPropagation();_this3.onClick('自定义日期');
                                } },
                            '自定义日期' === checked.label ? checked.start + ' \u81F3 ' + checked.end : '自定义日期范围'
                        )
                    ),
                    _react2.default.createElement(
                        _View2.default,
                        { style: styles.row },
                        _react2.default.createElement(
                            _View2.default,
                            { style: '全部日期' === checked.label ? _extends({}, styles.item, styles.itemSelected) : styles.item, onClick: function onClick(e) {
                                    e.stopPropagation();_this3.onClick('全部日期');
                                } },
                            '\u5168\u90E8\u65E5\u671F'
                        )
                    )
                )
            );
        }
    }]);

    return DatePicker;
}(_react2.default.Component), _class.propTypes = {
    onSelect: _react.PropTypes.func,
    checked: _react.PropTypes.object,
    format: _react.PropTypes.string,
    type: _react.PropTypes.oneOf(['filter', 'statistics'])

}, _class.defaultProps = {
    checked: {
        label: '自定义日期', // 标签
        start: '2017-05-25', // 开始日期
        end: '2017-05-25', // 结束日期
        type: '' // 自定义的类型
    },
    format: 'YYYY-MM-DD',
    type: 'filter'
}, _temp);


var styles = {
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    insideContainer: {
        height: 400,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12
    },
    customContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        height: document.documentElement.clientHeight <= 960 ? 800 : 910
    },
    row: {
        marginTop: 10,
        marginBottom: 10,
        width: '95%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        height: '100%',
        marginLeft: 10,
        marginRight: 10,
        fontSize: 28,
        backgroundColor: 'rgb(240, 240, 240)',
        color: 'rgb(100, 100, 100)',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemSelected: {
        border: '1px solid #108ee9',
        backgroundColor: 'transparent',
        color: '#108ee9'
    },
    tabs: {
        width: '95%',
        height: document.documentElement.clientHeight <= 960 ? 709 : 819
    },
    calendar: {
        width: '100%',
        height: document.documentElement.clientHeight <= 960 ? 612 : 722
    },
    picker: {
        color: 'rgb(60, 60, 60)',
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    icon: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    days: {
        height: document.documentElement.clientHeight <= 960 ? 532 : 642,
        width: '100%',
        overflow: 'hidden'
    },
    day: {
        width: '14.28%',
        height: '14.28%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(60, 60, 60)',
        fontSize: 25,
        height: '90%',
        width: '100%',
        margin: 5,
        borderRadius: 8,
        flexDirection: 'column'
    },
    text2: {
        marginTop: 5,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 20
    },
    weekends: {
        color: 'rgb(242, 114, 93)'
    },
    inactive: {
        color: 'rgb(200, 200, 200)'
    },
    daySelected: {
        color: 'white',
        backgroundColor: '#108ee9'
    },
    months: {
        height: 450,
        width: '100%',
        overflow: 'hidden'
    },
    month: {
        width: '33.3%',
        height: '25%',
        borderRadius: 16,
        color: 'rgb(60, 60, 60)',
        fontSize: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    monthSelected: {
        color: 'white',
        backgroundColor: '#108ee9'
    },
    seasons: {
        height: 100,
        width: '100%',
        overflow: 'hidden'
    },
    season: {
        width: '25%',
        height: '100%',
        borderRadius: 16,
        color: 'rgb(60, 60, 60)',
        fontSize: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    seasonSelected: {
        color: 'white',
        backgroundColor: '#108ee9'
    },
    bottom: {
        borderTop: '1px solid rgb(220, 220, 220)',
        width: '100%',
        height: 90,
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    cancel: {
        width: '50%',
        height: '100%',
        color: '#108ee9',
        fontSize: 30,
        borderRight: '1px solid rgb(220,220,220)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirm: {
        height: '100%',
        width: '50%',
        color: '#108ee9',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmForbidden: {
        width: '50%',
        height: '100%',
        color: 'rgb(160 ,160, 160)',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

function show(options) {
    _popup2.default.show(_react2.default.createElement(DatePicker, options), { transitionName: 'am-fade', wrapProps: _wrapProps2.default });
}

exports.default = show;