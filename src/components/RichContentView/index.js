import React from 'react';
import ImageViewer from '../ImageViewer';
import * as COLORS from '../../constants';
import * as Acc from '../../utils/acc';

export default class RichContentView extends React.Component {

    static propTypes = {
        content: React.PropTypes.string,
        style: React.PropTypes.object,
        editable: React.PropTypes.bool,
        onChange: React.PropTypes.func
    }

    static defaultProps = {
        content: '暂无内容',
        style: {},
        editable: false
    }

    state = {
        content: this.props.content
    }

    imgs = [];

    componentWillReceiveProps(nextProps) {
        if(this.state.content === '') {
            this.setState({ content: nextProps.content });
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
            let imgEl = document.getElementById(img.id);
            imgEl.addEventListener('click', () => {
                ImageViewer(i, this.imgs);
            });
        }
    }

    render() {
        let data = this.state.content.replace(/font-size:\s*\d*px;/gi, '').replace(/font-size:\s*\d*pt;/gi, '').replace(' alt=""', '');
        let result = '';
        this.imgs = [];
        while (data.length > 0) {
            if (data.indexOf('<img src="') < 0) {
                result += data;
                break;
            }
            result += data.substring(0, data.indexOf('<img src="'));
            data = data.substring(data.indexOf('<img src="') + 10);
            let url = data.substring(0, data.indexOf('"'));
            let id = url.substring(url.lastIndexOf('.') - 18, url.lastIndexOf('.'));
            if(url.lastIndexOf('.') - 18 < 0) id = url.substring(url.length - 10, url.length - 1);
            let newUrl = Acc.getImageFromContent(url);
            if (!this.imgs.searchByCondition(i => i.id === id)) {
                this.imgs = [...this.imgs, {
                    id,
                    url: newUrl
                }];
            }
            result += `<img id="${id}" style="width: 100%;" src="${newUrl}">`;
            data = data.substring(data.indexOf('/>') + 2);
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
                wordBreak: 'break-all',
                ...this.props.style
            }} dangerouslySetInnerHTML={{
                __html: result
            }}
            contentEditable={this.props.editable} 
            onInput={e => {
                this.props.onChange && this.props.onChange(e.target.innerHTML);
            }}/>
        );
    }

}