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
        <span class="titlename">管理员</span>
      </el-menu-item>
      <el-menu-item index="1" @click="teacherInfo">
        <i class="el-icon-menu"></i>
        <span slot="title">教师管理</span>
      </el-menu-item>
      <el-menu-item index="2" @click="studentInfo">
        <i class="el-icon-menu"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click="managerInfo">
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
      teacherInfo(){
        this.$router.push('/manager/teacher-info')
      },
      studentInfo(){
        this.$router.push('/manager/student-info')
      },
      managerInfo(){
        this.$router.push('/manager/manager-info')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
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