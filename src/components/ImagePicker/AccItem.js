import React from 'react';
import * as COLORS from '../../constants';
import * as Acc from '../../utils/Acc';
import ImageViewer from '../ImageViewer';
import View from '../View';
import MobileDetect from '../../utils/MobileDetect';
import wrapProps from '../../utils/wrapProps';
import request from '../../app/request'
import { Icon, Toast, ActionSheet, Modal } from 'antd-mobile';

export default class AccItem extends React.Component {
    static propTypes = {
        accs: React.PropTypes.array,
    }

    static defaultProps = {
        accs: []
    }

    constructor(props) {
        super(props);
        this.state = {
            accs: props.accs
        }
    }

    getFileImg(acc) {
        const url = EAP_PATH;
        const filetype = this.getFileType(acc.oName);
        if (filetype === 'png' || filetype === 'jpg' || filetype === 'jpeg' || filetype === 'gif') {
            return `${url}Service/WxGetFile.ashx?imgSize=small&hash=${acc.hash}`;
        } else if (filetype === 'txt')
            return `${url}Images/Yunpan/txt80.png`;
        else if (filetype === 'xls' || filetype === 'xlsx')
            return `${url}Images/Yunpan/Xls80.png`;
        else if (filetype === 'doc' || filetype === 'docx')
            return `${url}Images/Yunpan/Doc80.png`;
        else if (filetype === 'pptx' || filetype === 'ppt')
            return `${url}Images/Yunpan/PPT80.png`;
        else if (filetype === 'zip' || filetype === 'rar')
            return `${url}Images/Yunpan/Zip80.png`;
        else if (filetype === 'pdf')
            return `${url}Images/Yunpan/PDF80.png`;
        else
            return `${url}Images/Yunpan/Unknown80.png`;
    }

    getFileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

    onAccClick = (acc) => {
        const url = EAP_PATH;
        // 获取文件后缀名，如果是图片文件就调用图片文件的组件预览，否则就跳转至预览页面
        const filetype = this.getFileType(acc.oName);
        if (filetype === 'png' || filetype === 'jpg' || filetype === 'jpeg' || filetype === 'gif')
            ImageViewer(0, [{ url: `${url}Service/WxGetFile.ashx?hash=${acc.hash}` }]);
        else
            window.location.href = Acc.getPreviewPath(acc.id);
    }

    onDownloadClick = (acc) => {

        try {
            let elemIF = document.createElement('iframe');
            elemIF.src = Acc.getImageUrl(acc.hash);
            elemIF.style.display = 'none';
            document.body.appendChild(elemIF);
        } catch (err) {
            Toast.fail('下载异常！', 2);
            // return;
        }
    }

    onDelete = (acc) => {
        Modal.alert('删除附件', `此操作不可逆，确认删除${acc.oName}吗？`, [
            {
                text: '取消', onPress: () => {
                    // do nothing
                }, style: 'default'
            },
            {
                text: '确定', onPress: async () => {
                    Toast.loading('正在删除', 0);
                    const accId = `${acc.id}`;
                    const { err } = await request(`${API}/EAPAcc/DeleteAcc?id=${accId}`);
                    if (!err) {
                        Toast.success('删除成功', 1);
                        const { accs } = this.state;
                        const newAccs = accs.removeByCondition(i => i.id === acc.id);
                        this.setState({
                            accs: newAccs
                        });
                    } else {
                        Toast.fail(`${err}，删除失败`, 2);
                    }
                }, style: { fontWeight: 'bold' }
            }
        ]);
    }

    showActionSheet = (acc) => {
        const IOSBUTTONS = ['预览', '删除', '取消'];
        const BUTTONS = ['预览', '下载', '删除', '取消']
        if (MobileDetect.isIOS) {
            ActionSheet.showActionSheetWithOptions(
                {
                    options: IOSBUTTONS,
                    cancelButtonIndex: IOSBUTTONS.length - 1,
                    destructiveButtonIndex: IOSBUTTONS.length - 2,
                    // title: acc.oName,
                    message: acc.oName,
                    maskClosable: true,
                    wrapProps,
                },
                (buttonIndex) => {
                    if (buttonIndex === IOSBUTTONS.length - 1) return;
                    if (buttonIndex === 0) {
                        this.onAccClick(acc);
                    } else if (buttonIndex === IOSBUTTONS.length - 2) {
                        this.onDelete(acc);
                    }
                }
            );
        } else {
            ActionSheet.showActionSheetWithOptions(
                {
                    options: BUTTONS,
                    cancelButtonIndex: BUTTONS.length - 1,
                    destructiveButtonIndex: BUTTONS.length - 2,
                    // title: acc.oName,
                    message: acc.oName,
                    maskClosable: true,
                    wrapProps,
                },
                (buttonIndex) => {
                    if (buttonIndex === BUTTONS.length - 1) return;
                    if (buttonIndex === 0) {
                        this.onAccClick(acc);
                    } else if (buttonIndex === BUTTONS.length - 2) {
                        this.onDelete(acc);
                    } else if (buttonIndex === 1) {
                        this.onDownloadClick(acc);
                    }
                }
            );
        }

    }

    render() {
        const { accs } = this.state;
        return (
            <View style={accs.length === 0 ? styles.hide : { width: '95%', margin: '10px auto', fontSize: 26 }}>
                <View style={{ width: '100%' }}>
                    {
                        accs.map((acc, i) => (
                            <View key={i} style={{ ...styles.accRow, borderBottom: i === accs.length - 1 ? '0' : `1px solid ${COLORS.BORDER_COLOR}` }} onClick={() => this.showActionSheet(acc)}>
                                <img src={this.getFileImg(acc)} style={styles.fileImg} />
                                <View style={{ ...styles.label, color: COLORS.TITLE_COLOR }}>
                                    {acc.oName}
                                    <span style={styles.size}>{`(${parseInt(acc.size / 1024)}KB)`}</span>
                                </View>
                                <View style={styles.arrow}>
                                    <Icon type="right" color={COLORS.SUBTITLE_COLOR} size="md" />
                                </View>
                            </View>
                        ))
                    }
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        width: '100%',
    },
    labelRow: {
        alignItems: 'center',
        height: 80,
        width: '100%'
    },
    icon: {
        height: 40,
        width: 40,
        marginLeft: 30
    },
    label: {
        fontSize: 24,
        color: COLORS.SUBTITLE_COLOR,
        marginLeft: 10,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        overflow: 'hidden'
    },
    accRow: {
        marginLeft: 30,
        width: '100%',
        height: 100,
        alignItems: 'center'
    },
    fileImg: {
        width: 60,
        height: 60,
        borderRadius: 8
    },
    size: {
        color: COLORS.SUBTITLE_COLOR,
        marginLeft: 10,
    },
    arrow: {
        marginRight: 40,
        width: 40,
        height: 40,
        marginBottom: 10
    },
    hide: {
        display: 'none'
    }
};