<template>
  <div>
    <h2>深入v-model</h2>

    <input type="text" v-model="name">
    <span>{{name}}</span>
    <br>
    <br>
  <!-- 原生input上面的v-model本质, 动态的value属性与原生input事件监听 -->
    <input type="text" :value='name1' @input="name1=$event.target.value">
    <span>{{name1}}</span>
    <br>
    <br>
  
  <!-- 组件标签上的v-model的本质:  动态的value属性与自定义input事件监听 -->
    <CustomInput v-model="name2" />
    <span>{{name2}}</span>
    <br>
    <br>

    <CustomInput :value='name3' @input="name3=$event" /> 
    <span>{{name3}}</span>
    <br>
    <br>

  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data(){
      return {
        name: 'atguigu',
        name1: 'cat',
        name2: 'dog',
        name3: 'duck'
      }
    },
    components: {
      CustomInput
    }
  }
</script>
