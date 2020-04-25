<template>
  <div class="box">
    <div class="left">
      <div class="userimg">
        <img src="~assets/img/info.jpg" alt="">
        <p>欢迎您，赵志轩</p>
      </div>
      <div class="msgbox">

      </div>
    </div>
    <div class="right">
      <div class="sisbox">
        <div class="sis-title">题目：基于WEB的学生毕业设计选题系统的设计与实现</div>
        <div class="sis-state">状态：审核通过</div>
        <div class="sis-word">任务书：<a href="">点击下载任务书</a></div>
        <hr>
        <div class="sis-tea">指导教师：孙光辉</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  .box{
    display: flex;
  }
 .left{
   width: 250px;
   height: 600px;
 }
 .right{
   flex: 1;
   height: 600px;
   display: flex;
   justify-content: center;
   /* background-color: blue; */
 }
  .userimg{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 50px;
    margin-left: 40px;
    width: 200px;
    height: 200px;
    background-color: rgba(216, 218, 216, 0.671);
    border-radius: 10px;
  }
  .left p{
    font-size: 16px;
    font-weight: 500;
    width: 120px;
    margin-top: -34px;
  }
 .userimg img{
   width: 110px;
   height: 110px;
   border-radius: 50%;
 }

 .sisbox{
   border-radius: 10px;
   margin-top: 50px;
   width: 90%;
   height: 200px;
   background-color: rgba(216, 218, 216, 0.671);
   
 }

 .sisbox div{
   font-size: 16px;
   font-weight: 500;
   padding: 12px 40px;
 }

 hr{
   border: none;
   height: 1px;
   width: 88%;
   background-color: rgba(160, 159, 157, 0.514);
 }
 .sis-title{
  margin-top: 10px;
 }
</style>