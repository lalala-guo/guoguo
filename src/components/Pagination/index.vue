<template>
  <div class="pagination">
        <!-- 当前页码为1时不能操作 -->
    <button :disabled="myCurrentPage===1" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
        <!-- start要大于1才显示 -->
    <button v-if="startEnd.start>1" @click="setCurrentPage(1)">1</button>
    <!-- start要大于2才显示 -->
    <button disabled v-if="startEnd.start>2">···</button>
    <!-- 遍历   当num与当前页相等时,添加active  -->
    <button v-for="num in startEnd.end" 
      v-if="num>=startEnd.start"
      :class="{active: num===myCurrentPage}"
      @click="setCurrentPage(num)"
      >{{num}}</button>
    <!-- 
      v-for的优先级高于v-if: 先执行v-for的遍历, 每遍历一个再进行v-if的判断  面试题
    -->
    <!-- 只有在end小于totalPages-1 -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
        <!-- 只有在end小于totalPages -->
    <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
        <!-- 当当前页码为totalPages时不能操作 -->
    <button :disabled="myCurrentPage===totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
    
    <button disabled style="margin-left: 30px">共 {{total}} 条</button>
  </div>

</template>

<script>
export default {
  name:"Pagination",
  props:{
    currentPage: { // 当前页码 类型 默认值
        type: Number,
        default: 1
      },
      pageSize: { // 每页数量
        type: Number,
        default: 10
      },
      total: { // 总数量
        type: Number,
        default: 0
      },
      showPageNo: { // 连续页码数
        type: Number,
        default: 5
      }
  },
  data(){
    return {
      // 保存自己的当前页码
      myCurrentPage: this.currentPage
    }
  },
  computed:{
     /* 
      总页数: totalPages
          依赖数据: total 和 pageSize     36 5 
          算法: Math.ceil(total/pageSize)
      */
     totalPages(){
      //  const total = this.total
      //  const pageSize = this.pageSize
      // 解构赋值
       const {total, pageSize} = this
       return Math.ceil(total/pageSize)
     },

     /* 
      计算出连续页码的start和end: {start: 3, end: 7}
        start的最小值为1
        end的最大值为totalPages
      */
     startEnd(){
      //  定义start,end
       let start, end
       // 取出依赖数据 myCurrentPage(当前页码) / showPageNo(连续页码数) / totalPages(总页码)
        const {myCurrentPage, showPageNo, totalPages} = this
       // 计算start
        /* 
        myCurrentPage,  showPageNo,  totalPages
            4               5             8            23[4]56
        */
        start = myCurrentPage - Math.floor(showPageNo/2)
       /* 
        myCurrentPage,  showPageNo,  totalPages
            2               5             8            1[2]345
          但上面计算出的start为0
        */
        // 如果start小于1, 修改为1
        if(start < 1){
          start = 1
        }
        // 计算end
        /* 
        myCurrentPage,  showPageNo,  totalPages
            4               5             8            23[4]56
        */
        end = start + showPageNo - 1
       /* 
        myCurrentPage,  showPageNo,  totalPages
            7               5             8            456[7]8
        上面算出的end为9  start为5   56789 ==> 5678 ==> 45678
        */
        // 如果end超过了totalPages, 修正为totalPages
        if(end > totalPages){
          end = totalPages
          // 根据连续页码数据来修正start
          start = end - showPageNo + 1
        }
         /* 
           myCurrentPage,  showPageNo,  totalPages
              3               5            4           
           上面算出的 start = 0  end = 4      01234不对
          */
          // 如果start小于1, 修正为1
        if(start < 1){
          start = 1
        }
        // 返回start end
        return {start, end}
     }
  },
  watch:{
    currentPage(value){
      // 当父组件改变了其对应的当前页码数据时, 此回调函数就会自动调用
      // 更新内部的当前页码
      this.myCurrentPage = value
      // 也可以this.currentPage
    }
  },
  methods:{
    // 设置当前页码
    setCurrentPage(currentPage){
        // 一定要是更新自己data中的当前页码, 而不更新接收的currentPage属性
        this.myCurrentPage = currentPage
        // 分发vue自定义事件: 通知父组件, 当前页码变化了
        this.$emit("currentChange", currentPage)
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>