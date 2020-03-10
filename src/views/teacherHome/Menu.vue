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
        <span class="titlename">教师端</span>
      </el-menu-item>
      <el-menu-item index="1" @click="alltopic">
        <i class="el-icon-menu"></i>
        <span slot="title">已有课题</span>
      </el-menu-item>
      <el-menu-item index="2" @click="applyThesis">
        <i class="el-icon-menu"></i>
        <span slot="title">课题申报</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">学生申报</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span slot="title">我的学生</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">信息修改</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
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
      alltopic(){
        this.$router.push('/teacher/alltopic')
      },
      applyThesis(){
        this.$router.push('/teacher/edit')
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