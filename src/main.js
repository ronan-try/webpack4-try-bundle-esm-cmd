// import { test } from './utils/index'
// import { test_debounce } from './utils/test_lodash'

// console.log('main_test: ', test)
// console.log('main_test_debounce: ', test_debounce)


/**
 * 🤡 chunks: all/async/initial & minChunks: 2，并没有出来效果，因为这种形式具有一条同步主线
 */
// import { foo } from './async/async_1'
// import { dd } from './async/async_2'

// console.log(foo, dd, 'Ronan: try chunks:initial & minChunks:2')

/**
 * 🤡 chunks: all/async/initial & minChunks: 2, 出来了async_1~async_2的chunk，就是共同使用的xlsx部分
 */
console.log(import(/* webpackChunkName: "async_1" */ './async/async_1'))
console.log(import(/* webpackChunkName: "async_2" */ './async/async_2'))



console.log('main.js', 'a');
