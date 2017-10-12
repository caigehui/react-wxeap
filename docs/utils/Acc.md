# Acc

react-wxeap@2.4.0版本使用hash获取图片，服务器不再返回图片地址。

所以`acc.js`的作用是根据图片的`hash`值获取图片的原图和缩略图

```
import { Acc } from 'react-wxeap'
// 快速转化图片数组
let originImgs = [{hash: 'xasdasdagfsdf'}]
let newImgs = Acc.getImgsDisplay(originImgs) // [{url: 'http://sdasdasdas'}]

// 根据hash获取原图或缩略图地址
let originalPhoto = Acc.getImageUrl('sdasfgsvfxcxcvx');
let originalThumb = Acc.getThumbUrl('asfdsaderewdse');

// 根据附件数组获取图片
let accImgs = Acc.getImagesFromAccs(accs)

// 根据accId获取预览地址
let previePath = Acc.getPreviewPath(accId)

// 获取富文本里面的图片地址
let richImg = Acc.getImageFromContent(url)

```

