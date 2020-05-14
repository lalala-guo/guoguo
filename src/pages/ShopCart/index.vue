<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1"
              @change="checkCartItem(item)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeItemNum(item, -1)">-</a>
            
            <!-- 变化的数值 = 输入的值 - 原本的值   -->
            <input autocomplete="off" type="text" class="itxt" :value="item.skuNum"
              @change="changeItemNum(item, $event.target.value-item.skuNum,$event)"
            >
            <a href="javascript:void(0)" class="plus" @click="changeItemNum(item, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.cartPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascrpt:" class="sindelet" @click="deleteCartItem(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all" :disabled="cartList.length===0">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <!-- <a href="#none" v-for="item in cartList" :key="item.id" @click="deleteCartItem(item.skuId)">删除选中的商品</a> -->
        <a href="javascrpt:"  @click="deleteCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex"
  export default {
    name: 'ShopCart',
    computed:{
      ...mapState({
        cartList: state => state.shopCart.cartList,
        // computed: state => state.shopCart.computed
      }),
      ...mapGetters(['totalCount', 'totalPrice']),
      // 不用mapState的写法
      // cartList () {
      //   return this.$store.state.shopCart.cartList
      // },
      
      // 是否全选
      isAllChecked:{
        get(){
            // 判断
            // return this.cartList.find(item => item.isChecked!==1)===undefined
            // return this.cartList.filter(item => item.isChecked===1).length===this.cartList.length
            // return !this.cartList.some(item => item.isChecked!==1)
            // return this.cartList.every(item => item.isChecked===1)
            if(this.cartList.length !== 0){
               return this.cartList.every(item => item.isChecked===1)
            }
        },
        // 监视当前勾选状态的改变  利用异步action
        async set(value){
          try{
              // 分发
            await this.$store.dispatch("checkAllCartItems",value)
            // 成功之后再次获取数据
            this.$store.dispatch('getCartList')
          }catch(error){  //请求失败
            alert(error.message)
          }
        }
      },
      //  deleteCartItem:{
      //    get(){
      //     //  return this.cartList.length === 0
      //    },
      //    async set(value){
      //       try{
      //         await this.$store.dispatch('deletAllCartItem', value.skuId)
      //         this.$store.dispatch('getCartList')
      //         // if(this.cartList.length === 0){
      //         //   this.$store.dispatch("checkAllCartItems", 0)
      //         // }
      //       }catch(error){
      //         alert(error.message)
      //       }
      //    }
      // },
    },
    mounted(){
      this.$store.dispatch("getCartList")
    },
    methods:{
      async deleteCartItem(skuId){
          if(window.confirm("你确定要删除此商品吗?")){
            try{
              await this.$store.dispatch('deletCartItem', skuId)
              this.$store.dispatch('getCartList')
              // if(this.cartList.length === 0){
              //   this.$store.dispatch("checkAllCartItems", 0)
              // }
            }catch(error){
              alert(error.message)
            }
          }
      },
      async deleteCartItems(){
        if(window.confirm("你确定要删除选中的商品吗?")){
            try{
              await this.$store.dispatch('deletAllCartItem', this.cartList.skuId)
              this.$store.dispatch('getCartList')
              // if(this.cartList.length === 0){
              //   computed.ischecked = false
              // }
            }catch(error){
              alert(error.message)
            }
        }
      },
      async changeItemNum(item, numChange, event){
          if(item.skuNum + numChange > 0){
            try{
              const result = await this.$store.dispatch('addToCart',{skuId: item.skuId, skuNum: numChange})
              //成功再次请求数据
              this.$store.dispatch('getCartList')
            }catch(error){
              alert(error.message)
            }
          }else{
            if(event){
              event.target.value = item.skuNum
            }
          }
      },
      async checkCartItem(item){
        // 获取需要的数据
        const skuId = item.skuId
        // console.log(skuId)
        const isChecked = item.isChecked===1 ? 0 : 1
        try{
          // 分发
          await this.$store.dispatch("checkCartItem",{skuId, isChecked})  //async await 函数返回的promise状态成功与否
          // 成功  重新请求获取数据
          this.$store.dispatch("getCartList")
        }catch(error){
          // 失败
          alert(error.message)
        }
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 5%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 30%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 15%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 5%;
          }

          .cart-list-con2 {
            width: 30%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 15%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 15%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 15%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>