import Home from "../pages/Home/Home.vue";
import Login from "../pages/Login/Login.vue";
import Reginster from "../pages/Reginster/Reginster.vue";
import Search from "../pages/Search/Search.vue";


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
        }
    },
]