/* 
包含vuex所有的子模块
 */

import home from './home'
import user from './user'
import search from './search'
export default {
  home,
  user,
  search
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