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


//  GET请求  地址:/api/item/{ skuId }
export const reqProduct = (skuId) => ajax(`/item/${skuId}`)  //skuId 要和routes里面的占位符一样

// 加入购物车  post请求   /api/cart/addToCart/{ skuID }/{ skuNum }
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 获取购物车列表    /api/cart/cartList   GET
export const reqCartList = () => ajax('cart/cartList')

// 切换商品选中状态    /api/cart/checkCart/{skuID}/{isChecked}  GET 
// isChecked   0: 取消选中状态   1: 选中  
export const reqCheckCartItem = (skuId, isChecked) => ajax(`/cart/checkCart/${skuId}/${isChecked}`)

// 删除购物车商品   /api/cart/deleteCart/{skuId}    DELETE
export const reqDeleteItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)

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

// 注册   /api/user/passport/register   POST
export const reqReginster = (userInfo) => ajax.post('/user/passport/register', userInfo)

// 退出登录   /api/user/passport/logout 
export const reqLoginout = () => ajax('/user/passport/logout')

// 获取我的订单     /api/order/auth/{page}/{limit}      GET
export const reqMyOrder = (page, limit) => ajax(`/order/auth/${page}/${limit}`)

// 获取订单交易页信息   /api/order/auth/trade   GET
export const reqTradeInfo = () => ajax('/order/auth/trade')  //后台通过token知道哪个订单

// 获取订单支付信息     /api/payment/weixin/createNative/{orderId}   GET
export const reqPayInfo = (orderId) => ajax(`/payment/weixin/createNative/${orderId}`)

// 查询订单支付状态  /api/payment/weixin/queryPayStatus/{orderId}
export const reqOrderStatus = (orderId) => ajax(`/payment/weixin/queryPayStatus/${orderId}`)

// 提交订单   /api/order/auth/submitOrder?tradeNo={tradeNo}    POST
export const reqSubmitOrder = (tradeNo,orderInfo) => ajax({
    url: '/order/auth/submitOrder',
    method:'POST',
    params: {tradeNo},      // query 参数  后台用params传递
    data: orderInfo
})

