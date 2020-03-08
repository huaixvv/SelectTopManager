<template>
  <div id="login">
    <div class=""></div>
    <div class="title">
      <h1>湖南文理学院</h1>
      <h2>大学生毕业设计（论文）选题系统</h2>
    </div>
    <div>
      <h3>请登录：</h3>
    </div>
    <div class="loginform">
      <el-form :model="loginform" :label-position="labelPosition" label-width="80px">
        <el-form-item label="账户">
          <el-input v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginform.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="账号类型 :">
          <el-radio-group v-model="loginform.usertype">
            <el-radio label="管理员"></el-radio>
            <el-radio label="学生"></el-radio>
            <el-radio label="教师"></el-radio>
          </el-radio-group>
        </el-form-item>
          <el-button type="primary" @click="login" class="lbtn">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        loginform: {
          username: '',
          password: '',
          usertype: ''
        },
        labelPosition: 'left',
      }
    },
    methods: {
      login(){
        console.log(this.loginform);
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  #login{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(rgba(255, 255, 255, 0.3),
     rgba(255, 255, 255, 0.3)), 
     url('../../assets/img/loginbcg2.jpg') no-repeat center;
    /* background: url('../../assets/img/loginbcg2.jpg') no-repeat center; */
    background-size: 100% 100%;
    height: 700px;
  }

  h3{
    margin-right: 268px;
    color: #60636c;
    margin-top: 80px;

  }
  .title{
    margin: 20px 0 20px 0;
    color:rgb(68, 68, 68);
  }
 .loginform{
   width: 340px;
   /* height:  */
   /* background-color: rgba(255, 255, 255, 0.486); */
 }
.lbtn{
  padding: 12px 142px;
}

</style>