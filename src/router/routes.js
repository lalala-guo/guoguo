// import Home from "../pages/Home/Home.vue";
// import Search from "../pages/Search/Search.vue";
import Login from "../pages/Login/Login.vue";
import Reginster from "../pages/Reginster/Reginster.vue";
import Detail from "../pages/Detail/index.vue"
import AddCartSuccess from "../pages/AddCartSuccess/index.vue"
import ShopCart from "../pages/ShopCart"
// 订单支付  
import Trade from "../pages/Trade"
import Pay from "../pages/Pay"
import PaySuccess from "../pages/PaySuccess"
import Center from "../pages/Center"
import MyOrder from "../pages/Center/MyOrder"
import GroupBuy from "../pages/Center/GroupBuy"
import store from "@/store";

export default [
    {
        path:"/",
        component:() => import('@/pages/Home/Home.vue')  // 懒加载
    },
    {
        name:"search",
        path:"/search/:keyword?",
        component:() => import('@/pages/Search/Search.vue'), // 懒加载
        props: route => ({keyword3:route.params.keyword, keyword4:route.query.keyword2})
    },
    {
        name:"detail",
        path:"/detail/:skuId",
        component:Detail,
    },
    {
        path:"/addcartsuccess",
        component:AddCartSuccess,
    },
    {
        path:"/shopcart",
        component:ShopCart,
        
    },

    {
        path:"/trade",
        component:Trade,
        beforeEnter(to, from, next)  {
            if(from.path === '/shopcart'){
                next()
            }else{
                next('/shopcart')
            }
        }
    },
    {
        path:"/pay",
        component:Pay,
        // 将query参数映射成props传递给路由组件
        props: route => ({orderId:   route.query.orderId}),
        beforeEnter(to, from, next)  {
            if(from.path === '/trade'){
                next()
            }else{
                next('/trade')
            }
        }
    },
    {
        path:"/paysuccess",
        component:PaySuccess,
        beforeEnter(to, from, next) {
            if(from.path === '/pay'){
                next()
            }else{
                next('/pay')
            }
        }
    },
    {
        path:"/center",
        component:Center,
        children:[
            {
                path:'/center/myorder',
                component: MyOrder
            },
            {
                path:'/center/groupbuy',
                component: GroupBuy
            },
            {
                path:'',
                redirect:'myorder'
            }
        ]
    },
    {
        path:"/reginster",
        component:Reginster,
        meta:{
            isHideFooter:true
        }
    },
    {
        path:"/login",
        component:Login,
        meta:{
            isHideFooter:true
        },
        // 路由前置守卫
        // 判断是否登录  只有没有登录 才能查看登录页面
        // beforeEnter: (to, from, next) => {
        //     if(!store.state.user.userInfo.name){
        //         // 没有登录放行
        //         next()
        //     }else{
        //         // 登录了强制跳转到首页
        //         next('/')
        //     }
        // }
    },
    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
          {
            path: 'event',
            component: () => import('@/pages/Communication/EventTest/EventTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'model',
            component: () => import('@/pages/Communication/ModelTest/ModelTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'sync',
            component: () => import('@/pages/Communication/SyncTest/SyncTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'attrs-listeners',
            component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'children-parent',
            component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'scope-slot',
            component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
            meta: {
              isHideFooter: true
            },
          }
        ],
      },
    
]