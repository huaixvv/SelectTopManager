<template>
  <div id="login">
    <div class=""></div>
    <div class="title">
      <div>湖南文理学院</div>
      <div>大学生毕业设计（论文）选题系统</div>
    </div>
    <div class="pleace-login">
      请登录：
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

  import { getStudentByName } from "network/stuRequest";
  import { getTeacherByName } from "network/teaRequest";
  
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
        switch (this.loginform.usertype) {
          case '管理员':
            
            break;
          case '学生':
            getStudentByName(this.loginform.username).then(res => {
               if(res.data.code == 0) {
                window.sessionStorage.setItem("student", res.data.data.studentId);
                window.sessionStorage.setItem("studentName", res.data.data.studentName);
                this.$router.push('/student/home')
              }else{
                 this.$message({
                  message: res.data.msg,
                  type: 'error',
                  offset: 160,
                  center: true
                });
              }
              console.log(res);
            });
            break;
          case '教师':
            getTeacherByName(this.loginform.username, this.loginform.password).then(res => {
              if(res.data.code== 0) {
                window.sessionStorage.setItem("teacher", res.data.data.teacherId);
                window.sessionStorage.setItem("teacherName", res.data.data.teacherName);
                this.$router.push('/teacher/alltopic')
              }else{
                 this.$message({
                  message: res.data.msg,
                  type: 'error',
                  offset: 160,
                  center: true
                });
              }
              console.log(res);
            });
            break;
        }
        
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

  .pleace-login{
    margin-right: 268px;
    color: #60636c;
    margin-top: 80px;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 20px;
  }
  .title{
    letter-spacing: 2px;
    margin: 30px 0 20px 0;
  }
  .title div{
    font-size: 26px;
    padding-top: 10px;
    font-weight: 900;
    color:#60636c;

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