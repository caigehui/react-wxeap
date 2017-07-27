# ImageUploadView

可以自定义按钮的上传组件

```

<ImageUploadView 
    renderContent={() => <View/>}
    onImagePicked={url => console.log(url)}
    /> 

```


| 属性 | 说明 | 类型 | 默认值 |
| ----|-----|------|------ |
| renderContent    |  渲染子元素  | func  |   |
| onImagePicked    | 选择了图片，传入url参数  | func |   |
| style | 容器样式覆盖  | object |  {  } |
| maxWidth | 图片的最大宽度，如果图片的宽度超出最大值会等比压缩至最大值 | number | 1024 |