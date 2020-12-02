## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。
因为这是基于element-ui的封装组件，使用了内部镜像源，首先
```bash
npm set registry http://192.168.5.151:4873
```
之后install时会默认使用内部镜像源下载依赖包
```shell
npm i miduo-element-ui -S
```

如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：[快速上手](/#/zh-CN/component/quickstart)。
