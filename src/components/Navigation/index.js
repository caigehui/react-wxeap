import React, { PropTypes } from 'react';
import {
  NavBar,
  Icon,
  Popover,
  Menu,
  ActivityIndicator,
  Badge
} from 'antd-mobile';
import styles from './index.css';
const Item = Popover.Item;

const inlineStyles = {
  leftContent: {
    width: 200,
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 90,
  },
  menu: {
    marginLeft: 15,
    display: 'flex',
    alignItems: 'center',
    width: 60,
    height: 90
  }
}

export default class Navigation extends React.Component {

  static PropTypes = {
    menuData: PropTypes.array,
    menuValue: PropTypes.string,
    addOptions: PropTypes.array,
    homeMode: PropTypes.bool,
    title: PropTypes.string,
    company: PropTypes.array,
    companyData: PropTypes.array,
    companyValue: PropTypes.string,
    messages: PropTypes.array,
    onMessagesClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      showPopover: false,
      switchCompany: false,
      showMenu: false,
      navTitle: !props.homeMode ? '' : this.getNavTitle(props.menuValue, props.menuData)
    };
  }

  onPopoverSelect = (opt) => {
    this.setState({
      showPopover: false,
    });
    this.props.onPopoverSelect(opt.props.value, 0)
  }

  onPopoverClick = (showPopover) => {
    this.setState({
      showPopover,
      showMenu: false
    });
  }

  getNavTitle = (value, data) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    return label;
  }

  onMenuSelect = (menuValue) => {
    if (menuValue.toString() === this.props.menuValue.toString()) return;
    this.setState({
      showMenu: false,
      navTitle: this.getNavTitle(menuValue, this.props.menuData)
    })
    this.props.onMenuSelect && this.props.onMenuSelect(menuValue);
  }


  onMenuClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      showMenu: this.state.switchCompany ? true : !this.state.showMenu,
      switchCompany: false
    });
  }

  onSwitchCompanyClick = () => {
    // Fix event propagation on Android
    if (this.state.switchCompany) {
      this.setState({
        showMenu: !this.state.showMenu,
        switchCompany: !this.state.switchCompany
      })
    } else {
      this.setState({
        showMenu: true,
        switchCompany: true
      })
    }
  }

  onCompanySelect = (companyValue) => {
    if (companyValue.toString() === this.props.companyValue.toString()) return;
    this.setState({
      showMenu: false,
      switchCompany: false,
    })
    this.props.onCompanySelect && this.props.onCompanySelect(companyValue);
  }

  render() {
    let offsetX = -10; // just for pc demo
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      offsetX = -26;
    }

    const { showMenu, showPopover, switchCompany, mock, navTitle } = this.state;
    const { menuData, menuValue, addOptions, homeMode, title, companyData, companyValue, messages } = this.props;

    const menu = (
      <Menu
        className={styles.fooMenu}
        data={switchCompany ? companyData : menuData}
        value={switchCompany ? companyValue : menuValue}
        onChange={switchCompany ? this.onCompanySelect : this.onMenuSelect}
        height={document.documentElement.clientHeight * 0.6}
      />
    );

    let leftProps = {
      onLeftClick: this.props.onBack
    }
    if (homeMode) {
      leftProps = {
        onLeftClick: this.props.onBack,
        leftContent: (
          <div style={inlineStyles.leftContent}>
            <div key="1" style={inlineStyles.menu} onClick={this.onMenuClick} >
              <Icon type={require('../../assets/menu.svg')} />
            </div>
            {messages.length > 0 ?
              <div key="2" style={inlineStyles.message} onClick={this.props.onMessagesClick}>
                <Badge text={messages.length} size="large" />
              </div> : null}
          </div>
        )
      }
    }

    return (
      <div className={showMenu ? styles.menuActive : ''}>
        <div>
          <NavBar
            {...leftProps}
            mode="light"
            rightContent={
              !homeMode ? null : [
                companyData[0].children.length > 1 ? <Icon key="switch" onClick={this.onSwitchCompanyClick} type={require('../../assets/switch.svg')} /> : null,
                <Popover key="pop" mask
                  visible={showPopover}
                  overlay={addOptions.map((option, i) => <Item
                    key={i}
                    value={option}
                    icon={<Icon type={require('../../assets/add.svg')} size="xs" />}
                  >{`新增${option}`}</Item>)}
                  popupAlign={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [offsetX, 15],
                  }}
                  onVisibleChange={this.onPopoverClick}
                  onSelect={this.onPopoverSelect}>
                  <div style={{
                    height: '100%',
                    padding: '0 0.3rem',
                    marginRight: '-0.3rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <Icon type={require('../../assets/new1.svg')} size="xs" />
                  </div>
                </Popover>
              ]}>
            {!homeMode ? title : navTitle}
          </NavBar>
        </div>
        {showMenu ? menu : null}
      </div>
    )
  }

}