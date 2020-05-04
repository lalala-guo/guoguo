import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js"
Vue.use(VueRouter);
// 修正Vue原型上的push和replace方法

    // 缓存原型上的push方法
const originPush = VueRouter.prototype.push
    // 缓存原型上的replace方法
const originReplace = VueRouter.prototype.replace
    // 重新指定原型上的push方法
VueRouter.prototype.push = function(location, onComplete, onAbort){
    // console.log("push()", location, onComplete, onAbort)
    // 如果调用this  传递了成功或失败的回调函数 就让原来的push方法进行处理  否则就用catch处理  并返回一个pending状态的promise
    if(onComplete || onAbort){
        // 改变this指向到原来的push方法上
        originPush.call(this, location, onComplete, onAbort)
    } else {
        // 
        return originPush.call(this, location).catch((error) => {
            // console.log('catch到重复请求的error')
            return new Promise(() => {}) // 返回一个pending状态的promise, 中断promise链, 后面成功的回调就不会调用
        })
    }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort) 
  } else {
    return originReplace.call(this, location).catch(() => {
    //   console.log('catch error2')
      return new Promise(() => {})
    })   
  }
}



// // 缓存原型上的push方法
// const originPush = VueRouter.prototype.push
// const originReplace = VueRouter.prototype.replace
// // 重新指定原型上的push方法
// VueRouter.prototype.push = function (location, onComplete, onAbort) {
//   console.log('push()', location, onComplete, onAbort)
//   // this是路由器对象 $router
//   // 如果调用push, 传递了成功或者失败的回调函数
//   if (onComplete || onAbort) {
//     // 让原来的push方法进行处理
//     originPush.call(this, location, onComplete, onAbort) // 不用返回, 因为执行的结果返回是undfined
//   } else { // 如果调用push, 没传递了成功或者失败的回调函数, 可能会抛出失败的promise, 需要catch一下
//     return originPush.call(this, location).catch((error) => {
//       console.log('catch 到重复请求的error')
//       // throw error // 必然不对
      
//       // return undefined // 默认如果重复请求当前路由(参数也一样), 会导致后面then指定的成功回调函数

//       return new Promise(() => {}) // 返回一个pending状态的promise, 中断promise链, 后面成功的回调就不会调用

//     })   // 必须返回产生的promise对象
//   }
// }

// VueRouter.prototype.replace = function (location, onComplete, onAbort) {
//   if (onComplete || onAbort) {
//     originReplace.call(this, location, onComplete, onAbort) 
//   } else {
//     return originReplace.call(this, location).catch(() => {
//       console.log('catch error2')
//       return new Promise(() => {})
//     })   
//   }
// }





export default new VueRouter({
    routes,
})