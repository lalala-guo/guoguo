<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"/>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
// 引入 暴露的函数
import {reqBaseCategoryList, reqLogin} from "@/api"

// 引入 ajaxMock文件
// import {reqFloors} from "@/api"

export default {
    name:"App",

  // 发送请求  mounted  created
  // 用async函数  
    async created(){
      // const result1 = await reqBaseCategoryList()
      // const result2 = await reqLogin("13700000000", 111111)
      // const result = await reqFloors()
      // console.log("mockresult", result)

    this.$store.dispatch('getFloors')
    this.$store.dispatch('getBanners')



      // 通过异步actions获取异步数据到vuex的state中
      this.$store.dispatch('getBaseCategoryList')
    },



    components:{
      Header,
      Footer
    }
}
</script>

<style>

</style>