// 登录数据
import {reqLogin, reqReginster, reqLoginout} from '@/api'
//引入
import {getUserTemp, localSet, localGet,loginOut} from "@/utiles";

// window.onbeforeunload = function (e) {
//     login()                // 清除
// };
// 暴露一个对象
export default {
    // 创建子state
    state:{
        userInfo:localGet(),  // 从local中读取数据
        userTempid: getUserTemp()
    },
    mutations:{
        RECEIVE_USER_INFO(state,userInfo){
            state.userInfo = userInfo
        },
        LOGIN_OUT(state, userInfor){
            state.userInfo = userInfor
        }
    },
    // 创建异步action
    actions:{
        async login({commit},{mobile,password}){
            const result = await reqLogin(mobile,password)
            if(result.code === 200){
                // 成功 获取userInfo的数据
                const userInfo = result.data
                commit('RECEIVE_USER_INFO',userInfo)
                localSet(userInfo)
            }else{
                throw new Error(result.data || result.message || '登录失败')
            }
        },

        async register({commit},userInfo){
            const result = await reqReginster(userInfo)
            if(result.code!==200){
                throw new Error(result.data || result.message || "注册失败")
            }
        },
        
        async Loginout({commit}){
            const result = await reqLoginout()
            if(result.code===200){
                commit('LOGIN_OUT','')
                // loginOut('')
            }else{
                throw new Error(result.message || '退出失败')
            }
        }

    },
    getters:{
    }
}