import {reqProductList} from '@/api'

// 创建
const state={
    // 初始化
    productList:{}
    
};
const mutations={
    // 接收保存数据
    RECIVE_PRODUCT_LIST(state,productList){
        state.productList = productList 
    }
};
const actions={
    // 获取数据的异步action    解构commit  传入参数数据
    async getProductList({commit}, searchParams){ 
        // 异步接收传入的参数数据
        const result = await reqProductList(searchParams)
        // 判断请求成功  就获取请求回来的数据的data部分
        if(result.code === 200){
            const productList = result.data
            // 提交到RECIVE_PRODUCT_LIST
            commit("RECIVE_PRODUCT_LIST" , productList)
        }
    }
}
const getters = {
    trademarkList (state) { // 当前模块的state
      return state.productList.trademarkList || []
    },
  
    attrsList (state) {
      return state.productList.attrsList || []
    }
  }

// 向外暴露
export default {
    state,
    mutations,
    actions,
    getters
}
