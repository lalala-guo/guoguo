// 请求文件
// 引入封装好的ajax文件
import ajax from "./ajax.js"
import ajaxMock from "./ajaxMock"

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

export const reqBanners = () => ajaxMock("/banners")
export const reqFloors = () => ajaxMock("/floors")

export const reqProductList = (searchParams) => ajax({
    url: '/list',
    method: 'POST',
    data: searchParams
  })
//   测试
//   reqProductList({
//     "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// })