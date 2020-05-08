// 引入3级分类列表函数数据
import {reqBaseCategoryList} from "@/api/index.js"
import { reqBanners, reqFloors } from "@/api"

// 暴露出去一个对象
export default {
    // 对象内部有state
    state:{
        baseCategoryList: [],
        banners: [],
        floors: []
    },

// 先让actions去异步获取state的内容 请求成功 返回请求的数据 result.data
// 然后commit到mutations上边的state.baseCategoryList

    //接收保存新的分类列表
    mutations:{
        // mutations内部要全大写
        RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList){
            state.baseCategoryList = baseCategoryList
        },
        RECEIVE_Banners(state,banners){
            state.banners = banners
        },
        RECEIVE_Floors(state,floors){
            state.floors = floors
        },
    },
    actions:{
        // 获取分类列表异步的actions
        async getBaseCategoryList({commit}){
            const result = await  reqBaseCategoryList()
            // 判断请求成功
            if(result.code === 200){
                // 获取请求回来的data数据   然后commit到mutations上
                const baseCategoryList = result.data
                commit("RECEIVE_BASE_CATEGORY_LIST", baseCategoryList)
            }
        },
        async getBanners({commit}){
            // 发送ajax请求   获取数据   调用函数
            const result = await reqBanners()
            // 判断成功  提取data数据  commit给mutation
            if(result.code === 200 ){
                const banners = result.data
                commit("RECEIVE_Banners", banners)
            }
        },
        async getFloors({commit}){
            // 发送ajax请求   获取数据   调用函数
            const result = await reqFloors()
            // 判断成功  提取data数据  commit给mutation
            if(result.code === 200 ){
                const floors = result.data
                commit("RECEIVE_Banners", floors)
            }
        },
    }



}


