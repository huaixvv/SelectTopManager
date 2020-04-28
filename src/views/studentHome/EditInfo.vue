<template>
  <div class="fromcontain">
  <div class="fromtitle el-icon-caret-right"> &nbsp;请填写/更改个人信息：</div>
    <div class="editfrom">

      <el-form :model="studentInfo" 
                status-icon 
                ref="studentInfo"
                label-width="100px" 
                class="demo-teacherInfo" 
                label-position=left
                :rules="rules">
        <el-form-item label="登录账户" prop="loginName" >
          <el-input  v-model="studentInfo.loginName" disabled></el-input>
        </el-form-item>
          <el-form-item label="学生姓名" prop="studentName" >
          <el-input  v-model="studentInfo.studentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">  
          <el-input v-model="studentInfo.college" disabled></el-input>
        </el-form-item>

        <el-form-item label="专业" prop="speciality">
          <el-input v-model="studentInfo.speciality" disabled></el-input>
        </el-form-item>

        <el-form-item label="班级" prop="classNumber">
          <el-input v-model="studentInfo.classNumber" disabled></el-input>
        </el-form-item>


        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="studentInfo.email" type="email"></el-input>
        </el-form-item>

        <el-form-item label="登录密码" prop="studentPwd">
          <el-input v-model="studentInfo.studentPwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('studentInfo')">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import { editInfo, getStudent } from "network/stuRequest";

  export default {
    name: 'EditInfo',
      data() {
      return {
        studentInfo: {
          studentId: '',
          loginName:'',
          studentPwd:'',
          studentName: '',
          college: '',
          speciality:'',  //专业
          classNumber:'', //班级
          phone: '',
          email: '',
          sex:'',
        },
        rules: {
          phone: [
            { required: true, message: '联系电话不能为空', trigger: 'change' }
          ],
          studentPwd: [
            { required: true, message: '登录密码不能为空', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
        }
      };
    },
    created(){
      let studentId = window.sessionStorage.getItem('student')
      getStudent(studentId).then(res => {
        let info = res.data.data;
        console.log(info);
        this.studentInfo.loginName = info.loginName;
        this.studentInfo.studentId = studentId;
        this.studentInfo.studentName = info.studentName;
        this.studentInfo.college = info.college;
        this.studentInfo.speciality = info.speciality;
        this.studentInfo.classNumber = info.classNumber;
        this.studentInfo.email = info.email;
        this.studentInfo.phone = info.phone;
        this.studentInfo.studentPwd = info.studentPwd;
        this.studentInfo.sex = info.sex;
      })
      
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.teacherInfo);
            editInfo(this.studentInfo).then(res => {
              console.log(res);
              if (res.data.data.code == 2000) {

                this.$alert('个人信息修改成功！', '提示', {
                  confirmButtonText: '确定',
                  type: 'success'
                })
              }else{
                this.$alert('个人信息修改失败！', '提示', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.studentInfo.email = '';
        this.studentInfo.phone = '';
        this.studentInfo.studentPwd = '';
      }
    },
    components: {
    }
  }
</script>

<style scoped>
 .fromcontain{
    float: left;
  }
  .fromtitle{
    font-size: 18px;
    margin: 20px 20px 20px 15px;
    font-weight: 500;
    color: #606266;
  }
  .el-input{
    width: 500px;
  }
  .editfrom{
   margin: 20px 0 0 140px;
 }
</style>