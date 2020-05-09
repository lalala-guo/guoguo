<template>
    <div class="type-nav">
        <div class="container">
            <!-- 移出大盒子currentIndex为-2   移入大盒子currentIndex为-1 -->
            <div @mouseleave="hideCategoryList" @mouseenter="showCategoryList">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡显示 -->
                <transition name="move">
                    <div class="sort" v-show="isShowFirst">
                        <div class="all-sort-list2" @click="toSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                                :class="{item_on: index===currentIndex}" @mouseenter="show(index)">
                                <h3>
                                    <!-- <a href="">{{c1.categoryName}}</a> -->
                                    <!-- 编程式路由导航   $router.push()   -->
                                    <!-- 标签的自定义属性   data-xxx  不论写的名称是大写还是小写   传入的时候都会为小写  -->
                                    <a href="javascript:;" :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    <!-- 声明式路由导航  router-link    会创建好多router-link组件  效率低   -->
                                    <!-- <router-link
                                        :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">
                                        {{c1.categoryName}}</router-link> -->
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                                <!-- <a href="">{{c2.categoryName}}</a> -->
                                                <a href="javascript:;" :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                <!-- <router-link
                                                    :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">
                                                    {{c2.categoryName}}</router-link> -->

                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <!-- <a href="">{{c3.categoryName}}</a> -->
                                                    <a href="javascript:;" :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c1.category3d">{{c3.categoryName}}</a>
                                                    <!-- <router-link
                                                        :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">
                                                        {{c3.categoryName}}</router-link> -->

                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    // 引入lodash  按需引入
    import throttle from "lodash/throttle"
    import {
        mapState
    } from "vuex"
    export default {
        data() {
            return {
                // currentIndex: -1
                currentIndex: -2,
                isShowFirst: false
            }
        },
        name: "TypeNav",
        // 计算属性去获取state数据
        computed: {
            // baseCategoryList(){
            //     return this.$store.state.home.baseCategoryList
            // }
            ...mapState({
                categoryList: state => state.home.baseCategoryList
            })
        },

        beforeMount(){
            // 判断当前的路径是否是 / 
            this.isShowFirst = this.$route.path === "/"
            // if(this.$route.path === "/"){
            //     this.isShowFirst = true
            // }
        },

        // 减少请求次数  要将发送请求的代码放入到 App 组件中 减少请求次数  
        // 每次请求都是销毁再再次创建请求数据  效率低  

        // mounted() {
        //     // 通过异步actions获取异步数据到vuex的state中
        //     this.$store.dispatch('getBaseCategoryList')
        // },
        
        methods: {
            // 移入显示事件   通过lodash  函数节流操作
            show: throttle(function (index) {
                // console.log(index)
                // 但是此时由于节流的原因 会造成快速移出时  页面停在最后划过的位置  所以要通过判断是否出去大盒子来解决
                if (this.currentIndex === -2) return //代表完全移出大盒子  就不再更新页面
                this.currentIndex = index
            }, 200),
            // show(index) {
            //     this.currentIndex = index
            // },
            // 事件委托   减少点击请求跳转的次数
            toSearch(event) {
                // 通过对象的解构赋值去 event.target.dataset 来获取数据 categoryname   category1id   category2id   category3id
                const {
                    categoryname,
                    category1id,
                    category2id,
                    category3id
                } = event.target.dataset

                // 声明 query 让自定义属性 categoryName 等于数据中 categoryname 的值
                const query = {
                    categoryName: categoryname
                }

                // 判断categoryid是否有值   因为三级列表一次只能选择一个  所以三个id只能一个有值  
                // 有值就将这个值赋值给相对应的自定义id 并给到query中
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else if (category3id) {
                    query.category3Id = category3id
                }

                //声明用于路由跳转的location对象
                const location = {
                    name: 'search',
                    query
                }

                // 获取params参数   对象的解构赋值
                const { keyword } = this.$route.params
                
                //分类搜索时, 也携带搜索的关键字params参数
                //判断keyword是否有值 如果有值 就将值赋给location对象的params参数
                if(keyword){
                    location.params = { keyword }
                }
                // 跳转search
                // 判断当前是不是在search界面  是就replace  不是就push
                // if(this.$route.path.indexOf("/search") === 0){
                if(this.$route.name === "/search"){
                    this.$router.replace(location)
                }else{
                    this.$router.push(location)
                }
                
                // 隐藏一级列表
                this.hideCategoryList()

            },

            // 显示 分类列表
            showCategoryList(){
                this.currentIndex = -1
                // 显示的时候 isShowFirst = true
                this.isShowFirst = true
            },
            // 隐藏 分类列表
            hideCategoryList(){
                this.currentIndex = -2
                // 判断当前路径是否是 /    如果是 / 就不隐藏 否则就隐藏
                if(this.$route.path !== "/"){
                    this.isShowFirst = false
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                // 分类列表的过渡效果
                &.move-enter-active{
                    transition: all .4s;  //过渡时间为1s 
                }
                &.move-enter{
                    opacity:0;  // 过渡之前的透明度为0
                    height: 0;  // 过渡之前的高度为0
                }

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            _height: 200px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 555px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &.item_on {
                            background: #ccc;

                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>