<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import {cpMixin} from './mixins'
export default {
  name: 'Son',
  // 配置mixin
  mixins: [cpMixin], 
  data () {
    return {
      money: 30000
    }
  },

  methods: {
    gaveMoney(count){
      this.money -= count
      this.$parent.money += count
    }
  }
}
</script>
