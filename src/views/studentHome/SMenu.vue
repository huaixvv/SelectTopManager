<template>
  <div >
    <el-col :span="4" >
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#606266"
      active-text-color="#409EFF">
      <el-menu-item>
        <i class="el-icon-user-solid"></i>
        <span class="titlename">学生端</span>
      </el-menu-item>
      <el-menu-item index="1" @click="tohome">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="toapply">
        <i class="el-icon-menu"></i>
        <span slot="title">申报题目</span>
      </el-menu-item>
      <el-menu-item index="3" @click="toselect">
        <i class="el-icon-menu"></i>
        <span slot="title">学生选题</span>
      </el-menu-item>
      <el-menu-item index="4" @click="toanalyse">
        <i class="el-icon-document"></i>
        <span slot="title">选题分析</span>
      </el-menu-item>
      <el-menu-item index="5" @click="toeditinfo">
        <i class="el-icon-setting"></i>
        <span slot="title">信息修改</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </div>
</template>

<script>
  export default {
    name: 'SMenu',
    data () {
      return {
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      tohome(){
        this.$router.push('home');
      },
      toselect(){
        this.$router.push('select');
      },
      toanalyse(){
        this.$router.push('analyse');
      },
      toeditinfo(){
        this.$router.push('editinfo');
      },
      toapply(){
        this.$router.push('applysis');
      }
    },
    components: {
    }
  }
</script>

<style scoped>
 .el-menu-vertical-demo{
   padding: 0 0 400px 0;
 }

 .titlename{
   font-size: 20px;
 }
</style>