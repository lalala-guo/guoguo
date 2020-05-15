import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js"
import store from '@/store'

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

 const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
  }
})

// 全局守卫    
// 只有登录了, 才能查看交易/支付/个人中心界面
router.beforeEach((to, from, next) => {
  // 将所有要进行检查的目标路由 创建成一个数组
  const checkPaths = ['/trade', '/pay', '/center'] 
  // 获取跳转的路由路径  to.path
  const targetPath = to.path
  // 判断目标路由是否要进行登录检查   看目标路由的根路径是否是要跳转的目标路径
  const isCheckPath = checkPaths.some(path => targetPath.indexOf(path)===0)

  if(isCheckPath){  // 目标路由需要进行登录检查
    if(store.state.user.userInfo.name){   //查看store内userInfo是否有数据
       // 如果已经登录  放行
       next()
    }else{
      // 未登录强制跳转登录页面
      // next('/login')
      // 在守卫中进行强制跳转到Login时携带redirect参数(query参数), 值是想去的目标路径
      next('/login?redirect=' + targetPath)
    }
  }else{ //不需要进行登录检查
    next()
  }
})

export default router