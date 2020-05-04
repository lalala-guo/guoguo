<template>
  <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p>
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/reginster" class="register">免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <a href="###">我的订单</a>
                        <a href="###">我的购物车</a>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                  <router-link to="/" class="logo" title="尚品汇" >
                    <img src="./images/logo.png" alt="">
                  </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="search">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    data(){
      return {
        keyword:"atguigu"
      }
    },
    name:"Header",
    methods:{
      search(){
        // this.$router.push("/search")
        // this.$router.push(`/search/${this.keyword}`)  //params 字符串传参方式
        // // query  字符串传参方式
        // this.$router.push(`/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`)
        const keyword = this.keyword
    //  如果是空串  要判断  
      //  字符串 方式
        // if(keyword === ""){
        //   this.$router.push("/search")
        // }else {
        //   this.$router.push(`/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`)
        // }
      // 对象方式
        // this.$router.push({
        //   name:"search",
        //   params: { keyword: keyword ==="" ? undefined : keyword },
        //   query: { keyword2: keyword.toUpperCase() }
        // })

        /*
        但是连续点击的时候会报错   从vue-router3.1.0之后 引入了push()的promise的语法  
        如果没有通过参数指定回调函数就返回一个promise指定成功/失败的回调  且内部会判断如果要跳转的路径和参数都没有变化,
        会抛出一个失败的promise

        编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误
        router.push(location, onComplete?, onAbort?): 如果直接指定了回调函数, push方法没有返回值
        router.push(location).then(onComplete).catch(onAbort)
            如果没有直接指定回调函数, push方法返回值为promise
            如果指定的是当前路由路径且参数数据不变化, push内部就会抛出一个失败的promise
        */

      //  解决  1   再添加一个回调函数
     
          // const keyword = this.keyword
          // this.$router.push({
          //   name:"search",
          //   params:{keyword:keyword==="" ? undefined : keyword},
          //   query:{ keyword2: keyword.toUpperCase() }
          // },() => {})
      
     //  解决  2   设置为undefined 再添加一个回调函数
      /*
          const keyword = this.keyword
          this.$router.push({
            name:"search",
            params:{keyword:keyword==="" ? undefined : keyword},
            query:{ keyword2: keyword.toUpperCase() }
          },undefined,() => {})
      */
     //  解决  3   catch处理
      /*
          const keyword = this.keyword
          this.$router.push({
            name:"search",
            params:{keyword:keyword==="" ? undefined : keyword},
            query:{ keyword2: keyword.toUpperCase() }
          }).catch(() => {})
      */

  //  修正Vue原型上的push和replace方法
     //  解决  4   replace
      /*
          const keyword = this.keyword
          this.$router.replace({      
          name: 'search', 
          params: { keyword: keyword==='' ? undefined : keyword },
          query: { keyword2: keyword.toUpperCase() }
        }) 
      */
     //  解决  5   push
      /*
          const keyword = this.keyword
          */
          this.$router.push({ // push是重写后的方法
          name: 'search', 
          params: { keyword: keyword==='' ? undefined : keyword },
          query: { keyword2: keyword.toUpperCase() }
        }).then(() => {console.log('跳转成功的回调执行')})
      
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>