import React from 'react';
import * as COLORS from '../../constants';
import * as Acc from '../../utils/Acc';
import ImageViewer from '../ImageViewer';
import View from '../View';
import { Icon } from 'antd-mobile';

export default class AccItem extends React.Component {
    static propTypes = {
        accs: React.PropTypes.array
    }

    static defaultProps = {
        accs: []
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

    render() {
        const { accs } = this.props;
        return (
            <View style={accs.length === 0 ? styles.hide : { width: '95%', margin: '10px auto', fontSize: 26 }}>
                <View style={{ width: '100%' }}>

                    {
                        accs.map((acc, i) => (
                            <View key={i} style={{ ...styles.accRow, borderBottom: i === accs.length - 1 ? '0' : `1px solid ${COLORS.BORDER_COLOR}` }} onClick={() => this.onAccClick(acc)}>
                                <img src={this.getFileImg(acc)} style={styles.fileImg} />
                                <View style={{ ...styles.label, color: COLORS.TITLE_COLOR, flex: 1 }}>
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