/*
管理购物车vuex模块 
 */

import {reqCartList, reqCheckCartItem, reqAddToCart} from '@/api'

export default  {
    state: {
        cartList: [] //购物项的列表
    },

    mutations: {
        RECIVE_CART_LIST(state,{cartList}){
            state.cartList = cartList
        }
    },

    actions: {
        async  getCartList({commit}){
            const result = await reqCartList()
                if(result.code===200){
                    const cartList = result.data
                    commit("RECIVE_CART_LIST",{cartList})
                }
        },
        // 单个勾选状态的异步action
        
        async checkCartItem({commit}, {skuId,isChecked}){

            const result = await reqCheckCartItem(skuId,isChecked)
            if(result.code !== 200){
                throw new Error(result.message || "操作失败")
            }
        },

        // 全选框的勾选影响单个选框的异步action
        /* 
            context对象的结构:
            {
                state,      // 等同于 `store.state`，若在模块中则为局部状态
                commit,     // 等同于 `store.commit`   
                dispatch,   // 等同于 `store.dispatch`
                getters,    // 等同于 `store.getters`
            }
        */
        async checkAllCartItems({commit,state,dispatch,getters}, checked){
            const isChecked = checked ? 1 : 0
            const promises = []
            // 遍历cartList, 看是否都选中了
            state.cartList.forEach(item => {
                // 判断 如果当前选项处于选中状态或是为选中状态,也就是说大年状态和传入的状态一致,就return  即不发送请求改变状态
                if(item.ischecked === isChecked) return
                // 分发单个选中的状态
                const promise = dispatch('checkCartItem', {skuId: item.skuId, isChecked})
                // 将每个异步action的promise添加到promises数组中
                promises.push(promise)
            })

            // 利用Promise.all()来实现对多个异步操作的promise的管理
            return Promise.all(promises)
        },

        // 购物车    分发异步action
        // async addToCart({commit}, {skuId, skuNum,callback}){ 
        //     // 异步接收传入的参数数据
        //     const result = await reqAddToCart(skuId, skuNum)
        //     if(result.code === 200){
        //         console.log("成功")
        //         callback()
        //     }else{
        //         console.log("失败")
        //         callback("失败")
        //     }
        // },

        // async addToCart({commit}, {skuId, skuNum}){ 
        //     // 异步接收传入的参数数据
        //     const result = await reqAddToCart(skuId, skuNum)
        //     if(result.code === 200){
        //         return ""
        //     }else{
        //         return "失败"
        //     }
        // },

        async addToCart({commit}, {skuId, skuNum}){ 
            // 异步接收传入的参数数据
            const result = await reqAddToCart(skuId, skuNum)
            if(result.code === 200){
                return ""
            }else{
                throw new Error("失败")
            }
        }
    },

    getters: {
        //   数量
        totalCount(state){
        // 1.  得到数量要通过遍历shopCart中cartList数组中的商品项,并拿到选中商品(isChecked)的skuNum  相加
            // let total = 0  // 初始化数量的值为0
            // state.cartList.forEach(item => {    // 回调函数
            //     // 取出skuNum    isChecked
            //     const {skuNum, ischecked} = item
            //     // 判断商品是否选中
            //     if(ischecked === 1){
            //         total += skuNum
            //     }
            // })    
            // return total   // 返回数量

        // 2.  利用数组的方法reduce来计算累加累乘  reduce(回调函数,初始值)
            return state.cartList.reduce((pre,item) => {
                return item.isChecked === 1 ? pre + item.skuNum : pre    // pre: 初始   item: 数据
            }, 0)
        },

        
        totalPrice(state){
            // 1.  得到数量要通过遍历shopCart中cartList数组中的商品项,并拿到选中商品(isChecked)的skuNum  相加
                // let total = 0  // 初始化数量的值为0
                // state.cartList.forEach(item => {    // 回调函数
                //     // 取出skuNum    isChecked
                //     const {skuNum, ischecked, cartPrice} = item
                //     // 判断商品是否选中
                //     if(ischecked === 1){
                //         total += skuNum * cartPrice
                //     }
                // })    
                // return total   // 返回数量

            // 2.  利用数组的方法reduce来计算累加累乘  reduce(回调函数,初始值)
                return state.cartList.reduce((pre,item) => {
                    return item.isChecked === 1 ? pre + item.skuNum*item.cartPrice : pre    // pre: 初始   item: 数据
                }, 0)
        }
    }
}