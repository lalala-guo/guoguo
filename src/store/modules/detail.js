import {reqProduct} from '@/api'

// 创建
const state={
    // 初始化
    detailInfo:{}
    
};
const mutations={
    // 接收保存数据
    productInfo(state,detailInfo){
        state.detailInfo = detailInfo 
    }
};
const actions={
    // 获取数据的异步action    解构commit  传入参数数据
    async getProductInfo({commit}, skuId){ 
        // 异步接收传入的参数数据
        const result = await reqProduct(skuId)
        // 判断请求成功  就获取请求回来的数据的data部分
        if(result.code === 200){
            const detailInfo = result.data
            // 提交到RECIVE_PRODUCT_LIST
            commit("productInfo" , detailInfo)
        }
    }
}
const getters = {
    categoryView(state){
       const categoryView = state.detailInfo.categoryView
        return categoryView || {}
    },
    skuInfo(state){
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo || {}
    },
    skuImageList(state){
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo ? skuInfo.skuImageList : []
    },
    spuSaleAttrList(state){
        const spuSaleAttrList = state.detailInfo.spuSaleAttrList
        return spuSaleAttrList ?   spuSaleAttrList : [] 
    }
  }

// 向外暴露
export default {
    state,
    mutations,
    actions,
    getters
}
