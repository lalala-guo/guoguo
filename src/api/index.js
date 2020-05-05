// 请求文件
// 引入封装好的ajax文件
import ajax from "./ajax.js"

// 请求获取3级分类列表  /api/product/getBaseCategoryList
 export function reqBaseCategoryList(){
    //  返回发送请求的数据  没有参数 
    return ajax({
        method: 'GET',
        url:'/product/getBaseCategoryList'
    })
    // 对象形式
    // return ajax.get('/product/getBaseCategoryList')
 }
//  请求登录   /api/user/passport/login    POST

export function reqLogin(mobile,password){
    return ajax({
        method:'POST',
        url:'/user/passport/login',
        data:{mobile,password}      //传参要用data对象
    })
    // 可用对象形式  
    // return ajax.post('/user/passport/login', {mobile,password})
}
