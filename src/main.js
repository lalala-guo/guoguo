import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
// 使用mockServer
import "./mock/mockServer.js"
import "swiper/css/swiper.min.css"

// 全局引入
import TypeNav from "./components/TypeNav/TypeNav.vue";
import Carousel from "./components/Carousel/Carousel.vue";
import Pagination from './components/Pagination/index.vue'

Vue.component("TypeNav",TypeNav);
Vue.component("Carousel",Carousel);
Vue.component('Pagination', Pagination)

import store from "@/store/index.js"
Vue.config.productionTip = false // 去掉不是生产环境的提示

new Vue({
    beforeCreate(){
        Vue.prototype.$globalEventBus = this
    },
    render: h => h(App),
    router,
    store,
}).$mount("#app")