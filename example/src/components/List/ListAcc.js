import React, { PropTypes, Component } from 'react';
import { View, } from 'react-wxeap';
import { Accordion } from 'antd-mobile';
class ListAcc extends Component {
    static propTypes = {
        children: PropTypes.any,
        title: PropTypes.string,
        saveKey: PropTypes.func,
        id: PropTypes.string,
        isSpread: PropTypes.array
    }

  onChange = (key) => {
      this.props.saveKey && this.props.saveKey(key,this.props.id);
  }

    render() {
        const {id,isSpread,children,title} = this.props;

        return (
            <div style={{ width: '90%', margin: '20px auto', marginBottom: 10, paddingTop: 30, paddingBottom: 30, backgroundColor: '#FFFFFF' }}>
                <Accordion id={id} activeKey={isSpread} onChange={this.onChange}>
                    <Accordion.Panel header= {title}>
                        <View style={{ width: '90%', flexDirection: 'column', margin: '0 auto', }}>
                             {children}
                        </View>
                    </Accordion.Panel>
                </Accordion>
            </div>
        );
    }
}

export default ListAcc;
