# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

# 安装运行
```
yarn install
```
```
yarn serve
```

# 其他命令
1. eslint校验
```
yarn lint
```
2. eslint修复
```
yarn fix
```
3. 生产打包
```
yarn build
```