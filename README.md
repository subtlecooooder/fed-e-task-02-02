# 模块化开发与规范化标准

## 一、简单题
### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
#### 1. 构建流程
  - 根据配置文件，识别入口文件
  - 识别模块依赖，如`CommonJS`、`AMD`和`ESM`等
  - 识别代码，并通过Loader、Plugins和minimizer对代码进行处理
  - 输出代码到指定文件夹
#### 2. 详细描述
  - 解析配置参数，是合并命令行传入和配置文件(如webpack.config.js)的所有参数。
  - 通过合并后的参数初始化`compiler`对象，注册所有配置插件，插件可以监听生命周期的钩子节点事件，并在对应节点执行对象中的run方法执行编译。
  - 读取配置中的`entry`属性获取打包入口，解析文件构建语法树，找出依赖并且向下递归
  - 递归所有的依赖关系文件并根据文件类型和Loader配置对文件进行转换。
  - 递归完成后，得到所有的处理后的代码块
  - 根据`output`配置输出代码块到指定文件

### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
#### 1. 不同点
  - Loader 专注实现资源模块加载，如`js`、`css`、`图片`等资源
  - Plugin 解决其他自动化问题，如清除dist目录、拷贝不需要打包的静态资源到输出目录、压缩输出代码等

#### 2. 开发思路
  - Loader：
    - Loader 本质上就是一个函数，负责资源文件从输入到输出的转换，我们可以通过文件输入参数`source`获取文件内容并进行下一步处理。
    - 对于同一个资源可以依次使用多个Loader，以管道的方式运行，最终需要返回一段js代码。所以我们开发的Loader可以返回一段导出的JS代码，也可以返回一段字符串交给下一个Loader继续处理。
    - 以一个`markdown`转换loader为例
      ```js
      // 第一种，手动转换为JS代码
      const marked = require('marked')

      module.exports = source => {
        // source为md文件内容
        const html = marked(source)

        return `module.exports = ${JSON.stringify(html)}`
      }

      // 第二种，交给下一个html-loader继续处理
      const marked = require('marked')

      module.exports = source => {
        const html = marked(source)
      
        // 返回html字符串交给下一个loader处理
        return html
      }
      ```
  
  - Plugin：
    - 通过在生命周期的**钩子**中挂载函数来实现扩展
    - 必须是一个**函数**或是一个包含**apply方法**的对象
    - 函数内部的主要流程就是挂载到对应钩子->获取文件内容->修改文件输出
    - 完成移除bundle.js注释插件
      ```js
      class MyPlugin {
        apply (compiler) {
          console.log('MyPlugin 启动')
          // 挂载到emit钩子上
          compiler.hooks.emit.tap('MyPlugin', compilation => {
            // compilation => 可以理解为此次打包的上下文
            for(const name in compilation.assets) {
              if(name.endsWith('.js')) {
                // 获取文件内容
                const contents = compilation.assets[name].source()
                const withoutCommonts = contents.replace(/\/\*\*+\*\//g, '')
                // 修改文件输出
                compilation.assets[name] = {
                  source: () => withoutCommonts,
                  size: () => withoutCommonts.length
                }
              }
            }
          })
        }
      }
      ```

## 二、编程题
### 1、使用 Webpack 实现 Vue 项目打包任务
- 答案已放置在`code`目录下
- [视频简介]()