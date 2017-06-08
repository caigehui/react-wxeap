# RichContentView

显示富文本的View

```

import { RichContentView } from 'react-wxeap';

<ScrollView height={document.documentElement.clientHeight - (MobileDetect.isWechat || MobileDetect.isApp ? 80 : 170)}>
    <View style={{
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
    }}>
        <RichContentView style={{ width: document.documentElement.clientWidth - 60 }} content='<h1>sadasa</h1><p><img src="../../Common/WxGetFile.aspx?file=EditorFiles%5cMessageImages_92%5c201706%5c201706080951522636.png" alt="" /></p><p><span style="font-size:18px;"><span style="color:#ff0000;">saddddddd</span></span></p><p><span style="font-family:Microsoft YaHei;color:#ff0000;"><span style="font-size: 18px;">其实我也不知道啊</span></span></p><p><span style="font-size:18px;"><img src="../../Common/WxGetFile.aspx?file=EditorFiles%5cMessageImages_92%5c201706%5c201706080952216532.png" alt="" /><br /></span></p><p><span style="font-size:18px;">大叔大婶大所大所大</span></p><p></p>' />
    </View>
    <AccView accs={[{
        id: 1448,
        oName: '14234234345342543.jpeg',
        size: 780831,
        hash: '2B04DF3ECC1D94AFDDFF082D139C6F15'
    }, {
        id: 1448,
        oName: 'sdasds.doc',
        size: 123687,
        hash: '2321432342343'
    }]} />
</ScrollView>
```