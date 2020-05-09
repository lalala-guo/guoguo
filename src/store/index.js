// vuex的主文件
// 引入vue   vuex   安装使用vuex
import Vue from "vue";
import Vuex from "vuex";

// 引入子文件
import home from "./modules/home.js";
import user from "./modules/user.js"
import search from "./modules/search.js"
// 使用
Vue.use(Vuex)

// const actions = {

// }
// const mutations = {

// }
// const actions = {
    
// }

const store = new Vuex.Store({
    // state,   
    // mutations,
    // actions,
    // getters,
    modules:{
        home,
        user,
        search
    }
})

// 暴露出去
export default store