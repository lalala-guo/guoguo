<template>
  <div>
    <TypeNav />
    <h1>params字符串形式传参: {{$route.params.keyword}}</h1>
    <h1>query字符串形式传参: {{$route.query.keyword2}}</h1>
    <h1>params对象形式传参: {{keyword3}}</h1>
    <h1>query对象形式传参: {{keyword4}}</h1>
  </div>
</template>

<script>
export default {
    name:"Search",
    props:['keyword3','keyword4']
}
</script>

<style>

</style>