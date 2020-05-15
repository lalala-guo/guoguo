import Home from "../pages/Home/Home.vue";
import Login from "../pages/Login/Login.vue";
import Reginster from "../pages/Reginster/Reginster.vue";
import Search from "../pages/Search/Search.vue";
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
        component:Home
    },    
    {
        name:"search",
        path:"/search/:keyword?",
        component:Search,
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
    
]