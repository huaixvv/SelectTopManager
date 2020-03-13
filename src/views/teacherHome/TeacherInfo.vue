<template>
  <div class="fromcontain">
  <div class="fromtitle el-icon-caret-right"> &nbsp;请填写/更改个人信息：</div>
    <div class="editfrom">
      <!-- <el-form 
        :model="teacherInfo" 
        status-icon :rules="rules" 
        ref="teacherInfo" 
        label-width="100px" 
        class="demo-teacherInfo"
        label-position=left>
         <el-form-item label="登录账户" prop="loginName" >
            <el-input  v-model="teacherInfo.loginName" ></el-input>
          </el-form-item>
           <el-form-item label="教师姓名" prop="teacherName" >
            <el-input  v-model="teacherInfo.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="所属学院" prop="college">
            <el-input v-model="teacherInfo.college"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="teacherInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="teacherInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="教师职务" prop="teacherPost">
            <el-input v-model="teacherInfo.teacherPost"></el-input>
          </el-form-item>

           <el-form-item label="密码" prop="teacherPwd" >
            <el-input type="password" v-model="teacherInfo.teacherPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="password" v-model="teacherInfo.checkPwd" autocomplete="off"></el-input>
          </el-form-item>
        
          <el-form-item>
            <el-button type="primary" @click="submitForm('teacherInfo')">提交</el-button>
            <el-button @click="resetForm('teacherInfo')">重置</el-button>
          </el-form-item>
      </el-form> -->

      <el-form :model="teacherInfo" 
                status-icon 
                ref="teacherInfo"
                label-width="100px" 
                class="demo-teacherInfo" 
                label-position=left
                :rules="rules">
        <el-form-item label="登录账户" prop="loginName" >
          <el-input  v-model="teacherInfo.loginName" disabled></el-input>
        </el-form-item>
          <el-form-item label="教师姓名" prop="teacherName" >
          <el-input  v-model="teacherInfo.teacherName" disabled></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="teacherInfo.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属学院" prop="college">
          <el-select v-model="teacherInfo.college" placeholder="请选择所属学院">
            <el-option label="计算机与电气工程学院" value="计算机与电气工程学院"></el-option>
            <el-option label="文史与法学学院" value="文史与法学学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="机械工程学院" value="机械工程学院"></el-option>
            <el-option label="经济与管理学院" value="经济与管理学院"></el-option>
            <el-option label="艺术学院" value="艺术学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="teacherInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="teacherInfo.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="教师职务" prop="teacherPost">
          <el-input v-model="teacherInfo.teacherPost"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="teacherPwd">
          <el-input v-model="teacherInfo.teacherPwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('teacherInfo')">提交</el-button>
          <el-button @click="resetForm('teacherInfo')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import { editinfo, getTeacher } from "network/teaRequest";

  export default {
    name: 'TeacherInfo',
      data() {
      return {
        teacherInfo: {
          teacherId: '',
          loginName:'',
          teacherName: '',
          college: '',
          teacherPost: '',
          email: '',
          phone: '',
          sex: '',
          teacherPwd:''
        },
        rules: {
          college: [
            { required: true, message: '请选择所属学院', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '联系电话不能为空', trigger: 'change' }
          ],
          teacherPwd: [
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
      let teacherId = window.sessionStorage.getItem('teacher')
      getTeacher(teacherId).then(res => {
        let info = res.data.data;
        this.teacherInfo.loginName = info.loginName;
        this.teacherInfo.teacherId = teacherId;
        this.teacherInfo.teacherName = info.teacherName;
        this.teacherInfo.college = info.college;
        this.teacherInfo.teacherPost = info.teacherPost;
        this.teacherInfo.email = info.email;
        this.teacherInfo.phone = info.phone;
        this.teacherInfo.sex = info.sex;
        this.teacherInfo.teacherPwd = info.teacherPwd;
      })
      
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.teacherInfo);
            editinfo(this.teacherInfo).then(res => {
              console.log(res);
              if (res.data.data.code == 2000) {
                this.$message({
                  message: '个人信息修改成功！',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '个人信息修改失败，请重试！',
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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