export const cpMixin = {
    methods:{
        pullMoney (count) {
            this.money -= count
            // return count
          },
        gaveMoney (count) {
            this.money -= count
            // 得到父组件对象, 更新其数据
            this.$parent.money += count
        }
    }
}