<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <MyComponent A='a' B='b' @input="test" />
    <HintButton  title="添加" type="primary" icon="el-icon-plus" size="mini" @click="add" @xxx="test" />
    <HintButton  title="双击添加" type="primary" icon="el-icon-plus" size="mini" @dblclick.native="add" />
    <HintButton  title="修改" type="info" icon="el-icon-edit" size="mini" @click="update"  />
    <HintButton  title="删除" type="danger" icon="el-icon-delete" size="mini" @click="remove"  />
  </div>
</template>

<script type="text/ecmascript-6">
  import MyComponent from './MyComponent'
  import HintButton from './HintButton'
  export default {
    name: 'AttrsListenersTest',

    methods: {
      test(){
      
      },
      add(){
        alert('add添加')
      },
      update(){
        alert('update修改')
      },
      remove(){
        alert('remove删除')
      }
    },
    components: {
      MyComponent,
      HintButton
    }
  }
</script>
