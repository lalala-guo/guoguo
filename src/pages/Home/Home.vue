<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor  v-for="floor in floors" :key="floor.id" :floor="floor"/>
    <!-- <Floor /> -->
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import TodayRecommend from "./TodayRecommend/TodayRecommend.vue";
import Rank from "./Rank/Rank.vue";
import Like from "./Like/Like.vue";
import Floor from "./Floor/Floor.vue";
import Brand from "./Brand/Brand.vue";
import {mapState} from "vuex"
export default {
    name:"Home",
    components:{
      ListContainer,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand
    },
  //   mounted () {
  //   // 分发action请求获取banners和floors数据到state中
  //   this.$store.dispatch('getBanners')
  //   this.$store.dispatch('getFloors')
  // },
    computed:{
      ...mapState({
        floors: state => state.home.floors
      })
    }
}
</script>

<style>

</style>