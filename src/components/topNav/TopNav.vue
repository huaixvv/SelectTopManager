<template>
  <div class="nav">
    <div class="left">
      <h1>湖南文理学院</h1>
      <h2>大学生毕业设计（论文）管理系统</h2>
    </div>
    <div class="right">
      <div class="user">{{userInfo.name}}({{userInfo.number}}),  欢迎使用系统!</div>
      <div>学年：2020  /  角色：{{userInfo.role}}  /  学院：{{userInfo.college}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopNav',
    props: {
      userInfo:{
        type: Object,
        default(){
          return {};
        }
      }
    },
    created(){
      console.log(this.userInfo);
    },
    data () {
      return {
      }
    },
    components: {
    }
  }
</script>

<style scoped>
 .nav{
   background-color: #409EFF;
   height: 120px;
   line-height: 40px;
 }
 h1{
   font-size: 24px;
 }
 h2{
   font-size: 26px;
 }

 .left{
   margin: 20px 0px 0px 30px;
   float: left;
   color: #fff;

 }

 .right{
   margin: 20px 30px 0px 0px;
   float: right;
   color: #fff;
 }
 .user{
   font-weight: 500;
   letter-spacing: 1px;
 }
</style>
