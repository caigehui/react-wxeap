import React from 'react';
import ImageViewer from '../ImageViewer';
import * as COLORS from '../../constants';
import * as Acc from '../../utils/Acc';

export default class RichContentView extends React.Component {

    static propTypes = {
        content: React.PropTypes.string,
        style: React.PropTypes.object,
        editable: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        contentId: React.PropTypes.string,
        enableContentChange: React.PropTypes.bool,
        onImageClick: React.PropTypes.func,
        isFixImgHeight: React.PropTypes.bool
    }

    static defaultProps = {
        content: '暂无内容',
        style: {},
        editable: false,
        contentId: 'temp',
        enableContentChange: false
    }

    state = {
        content: this.props.content
    }

    imgs = [];

    componentWillReceiveProps(nextProps) {
        // 防止表单出现改变
        if (!this.props.enableContentChange) {
            if (this.state.content === '') {
                this.setState({ content: nextProps.content });
            }
        } else {
            if (this.state.content !== nextProps.content) {
                this.setState({ content: nextProps.content });
            }
        }

    }

    componentDidMount() {
        this.addImgListener();
    }

    componentDidUpdate() {
        this.addImgListener();
    }


    addImgListener = () => {
        for (let i = 0; i < this.imgs.length; i++) {
            let img = this.imgs[i];

            // 快速克隆移除所有listener：https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
            let oldImgEl = document.getElementById(img.id);
            let newImgEl = oldImgEl.cloneNode(true);
            oldImgEl.parentNode.replaceChild(newImgEl, oldImgEl);

            const onImgClick = () => {
                if (this.props.onImageClick) {
                    this.props.onImageClick(i, img.url, newImgEl);
                } else {
                    ImageViewer(i, this.imgs, newImgEl);
                }
            };
            newImgEl.addEventListener('click', onImgClick);
        }
    }

    render() {
        let data = this.state.content.replace(/font-size:\s*\d*px;/gi, '').replace(/font-size:\s*\d*pt;/gi, '').replace(/ alt=""/gi, '');
        let result = '';
        this.imgs = [];
        let currentId = 0;
        while (data.length > 0) {
            if (data.indexOf('<img src="') < 0) {
                result += data;
                break;
            }
            result += data.substring(0, data.indexOf('<img src="'));
            data = data.substring(data.indexOf('<img src="') + 10);
            let url = data.substring(0, data.indexOf('"'));
            let newUrl = Acc.getImageFromContent(url);
            if (!this.imgs.searchByCondition(i => i.id === this.props.contentId + '-' + currentId)) {
                this.imgs = [...this.imgs, {
                    id: this.props.contentId + '-' + currentId,
                    url: newUrl
                }];
            }
            result += this.props.isFixImgHeight ? `<img id="${this.props.contentId + '-' + currentId}" style="height: 200px; object-fit: contain;max-width: 360px" src="${newUrl}" />` : `<img id="${this.props.contentId + '-' + currentId}" style="width: 100%;" src="${newUrl}" />`;
            currentId++;
            data = data.substring(data.indexOf('/>') < 0 ? data.indexOf('>') + 1 : data.indexOf('/>') + 2);
        }
        return (
            <div style={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'white',
                color: COLORS.TITLE_COLOR,
                paddingTop: 20,
                fontSize: 30,
                paddingBottom: 20,
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                ...this.props.style
            }} dangerouslySetInnerHTML={{
                __html: result
            }}
                contentEditable={this.props.editable}
                onInput={e => {
                    this.props.onChange && this.props.onChange(e.target.innerHTML);
                }} />
        );
    }

}