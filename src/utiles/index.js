/* 
包含一些工具函数的模块
*/

import { v4 as uuidv4 } from 'uuid'
/* 
得到当前的用户临时ID
1. 从localStorage中获取
2. 通过UUID库来生成
*/
export function getUserTemp(){
    // 从localStorage里面读取userTempid
    let userTempid = localStorage.getItem('USER_TEMP_ID_KEY')
    if(!userTempid){
        // 没有就调用uuid创建
        userTempid = uuidv4()
        // 设置给localStorage
        localStorage.setItem('USER_TEMP_ID_KEY',userTempid)
    }
    return userTempid
}
