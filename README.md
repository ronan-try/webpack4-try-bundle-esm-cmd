# 🚀 Welcome to webpack4-try-bundle-esm-cmd

`lodash` 和 `lodash-es`是一个很好的实验对象。

代码：`./test_lodash.js`
```js
import { debounce } from 'lodash'
// import debounce from 'lodash/debounce'
// import { debounce } from 'lodash-es'
// import debounce from 'lodash-es/debounce'

export const test_debounce = () => {
    console.log(debounce, 'test_debounce', '123')
}

export const test001 = () => console.log('test001')
export const test002 = () => console.log('test002')
export const test003 = () => console.log('test003')
```


## 🙄 Target 
1. 分析webpack4打包文件代码，查看cmd、esm打包区别。
2. lodash和lodash-es正好作为实验对象；lodash最佳使用推荐，以及推荐理由

## 🤔 Try 几个场景
### - 😘 Try000 cmd: 全引入lodash，`import { debounce } from 'lodash'`
1. app.js 中会引入的是`整个lodash文件`
2. chunk.js 中近`2w`行的lodash代码，且没有`ununsed harmony`标识，意味着不会被shaking掉

![from_lodash_allin_0_app.png](./log_imgs/from_lodash_allin_0_app.png)
![from_lodash_allin_1_chunk.png](./log_imgs/from_lodash_allin_1_chunk.png)


### - 😘 Tyr001 cmd: 全路径引入lodash某方法，`import debounce from 'lodash/debounce'`
1. app.js 中会引入的是`lodash/debounce`文件。对比Try000，仅引入了相关代码
2. chunk.js 中近`400`行的lodash代码，且没有`ununsed harmony`标识，意味着不会被shaking掉
3. lodash的打包代码量明显减小：`2w->400` 🤙🏻 🤙🏻 🤙🏻

![from_lodash_fullpath_0_app.png](./log_imgs/from_lodash_fullpath_0_app.png)
![from_lodash_fullpath_1_chunk.png](./log_imgs/from_lodash_fullpath_1_chunk.png)


### - 😘 Try010 esm: 全引入lodash，`import { debounce } from 'lodash-es'`
1. app.js 中会引入的是`整个lodash-es文件`
2. chunk.js 中近`2w`行的lodash代码，且有`ununsed harmony`标识，意味着shaking

![from_lodash-es_0_app.png](./log_imgs/from_lodash-es_0_app.png)
![from_lodash-es_1_chunk.png](./log_imgs/from_lodash-es_1_chunk.png)


### - 😘 Tyr011 esm: 全路径引入lodash某方法，`import debounce from 'lodash-es/debounce'`
1. app.js 中会引入的是`lodash-es/debounce`文件。对比Try010，仅引入了相关代码
2. chunk.js 中近`500`行的lodash代码，且没有`ununsed harmony`标识，意味着不会被shaking掉，且 没有垃圾冗余代码
3. lodash的打包代码量明显减小：`2w->500` 🤙🏻🤙🏻🤙🏻

![from_lodash_fullpath_0_app.png](./log_imgs/from_lodash-es_fullpath_0.app.png)
![from_lodash_fullpath_1_chunk.png](./log_imgs/from_lodash-es_fullpath_1.chunk.png)


## 🙄 Target 撒花 🌹 🌺 🌻  🌷 🌱 🌲 🌳 🌴 🌵 🌾 🌿 🍀 🍁 🍂 🍃
### 1. 分析webpack4打包文件代码，查看cmd、esm打包区别。
1. cmd：webpack4对cmd库 直接提供一个命名空间，不对内部代码进行分析 ([v4官方说明](https://v4.webpack.js.org/guides/code-splitting/))。

- [不能像Parcel那样对cmd进行tree shaking](https://baijiahao.baidu.com/s?id=1665363889032577362&wfr=spider&for=pc)

- [webpack5新增功能之一就是对cmd进行TreeShaing](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/)

2. esm: webapck4对esm库 进行ES6静态结构分析，后期可tree shaking。

### 2. lodash最佳使用推荐，以及推荐理由
1. 如果使用`全引入`方式，推荐lodash-es > lodash，虽然lodash、lodash-es两者都会把全部文件进行bundle，但是lodash-es可以进行shaking

2. 如果使用`全路径引入`方式，推荐lodash vs lodash-es，区别不大。因为[lodash-npm源码](https://github.com/lodash/lodash/blob/4.17.20-npm/cloneDeep.js)层面已经将函数拆分的很细，并且通过`全路径引入`组装完成

3. 虽然lodash-es `全引入` 和 `全路径引入` 最终结果相同，但是 `全路径引入` 能够提高打包时效：节约打包+shaking

🤙🏻 🤙🏻 🤙🏻 **最终推荐 全路径引入某Fun(lodash vs lodash-es) --> 全引入(lodash-es > lodash + lodash-webpack-plugin)**



## 😘 small tips
### 1. vue中的alias`@/` 代表`xxx/xx/xxx/src`  是resolve的配置解析策略

### 2. webapck4 init生成的配置方案中，开发模式下的打包默认是`eval`，打包文件可读性太难了
Thk for 传送门 [够全的webpack4配置](https://blog.csdn.net/github_34708151/article/details/103900725)

default 配置，来感受一下：
![eval_形式的打包](./log_imgs/eval_形式的打包.png)

调整一下配置，整个世界都变的美好：
```js
module.exports = {
  devtool: 'none',
}
```
![pure_形式的打包](./log_imgs/pure_形式的打包.png)



## 👀 👂 对上次使用lodash全路径引入某函数的方法稍微有点迟疑，也发现了开源项目中lodash的使用方式，感谢jinru
### 😘 ant-design-vue-1.x
![ant-design-vue-1.x](./lodash_imgs/ant-design-vue-1.x.png)

### 😘 ant-design-vue-2.x
![ant-design-vue-2.x](./lodash_imgs/ant-design-vue-2.x.png)

### 😘 ant-design-react
![ant-design-react](./lodash_imgs/ant-design-react.png)

🤔 🤔 既然已经使用了lodash-es，为啥还在全路径的引入呢？于是有了这次实验。


### 完结 撒花
🌹 🌺 🌻  🌷 🌱 🌲 🌳 🌴 🌵 🌾 🌿 🍀 🍁 🍂 🍃

![relations.xmind](./docs/relations.png)
