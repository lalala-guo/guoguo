/* 
包含vuex所有的子模块
 */

import home from './home'
import user from './user'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'



export default {
  home,
  user,
  search,
  detail,
  shopCart
}

/* 
vuex的store管理的总state是什么结构:
  {
    home: {
      baseCategoryList: [],
      x: {},
      y: ''
    },

    user: {
      userInfo: {},
      x: ''
    }
  }
*/