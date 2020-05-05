// 引入3级分类列表函数数据
import {reqBaseCategoryList} from "@/api/index.js"

// 暴露出去一个对象
export default {
    // 对象内部有state
    state:{
        baseCategoryList: [],
        g: ""
    },

// 先让actions去异步获取state的内容 请求成功 返回请求的数据 result.data
// 然后commit到mutations上边的state.baseCategoryList

    //接收保存新的分类列表
    mutations:{
        // mutations内部要全大写
        RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList){
            state.baseCategoryList = baseCategoryList
        }
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
        // getters:{}
    }



}


