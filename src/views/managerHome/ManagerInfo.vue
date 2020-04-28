<template>
   <div class="fromcontain">
    <div class="fromtitle el-icon-caret-right"> &nbsp;请填写/更改个人信息：</div>
    <div class="editfrom">

      <el-form :model="managerInfo" 
                status-icon 
                ref="managerInfo"
                label-width="100px" 
                class="demo-teacherInfo" 
                label-position=left
                :rules="rules" >
        <el-form-item label="登录账户" prop="loginName" >
          <el-input  v-model="managerInfo.loginName" ></el-input>
        </el-form-item>
          <el-form-item label="管理员姓名" prop="managerName" >
          <el-input  v-model="managerInfo.managerName" ></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="managerPwd">  
          <el-input v-model="managerInfo.managerPwd" ></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submitForm('managerInfo')">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import { editManager, getManagerInfo } from "network/manRequest";
  export default {
    name: 'ManagerInfo',
    data () {
      return {
        managerInfo: {
          loginName:'',
          managerPwd:'',
          managerName: '',
          managerId: ''
        },
        rules: {
          loginName: [
            { required: true, message: '登录账户不能为空', trigger: 'change' }
          ],
          managerPwd: [
            { required: true, message: '登录密码不能为空', trigger: 'change' }
          ],
          managerName: [
            { required: true, message: '姓名不能为空', trigger: 'change' },
          ],
        }
      }
    },
    created(){
      const managerId = window.sessionStorage.getItem('manager');
      getManagerInfo(managerId).then(res => {
        this.managerInfo.loginName = res.data.data.loginName
        this.managerInfo.managerPwd = res.data.data.managerPwd
        this.managerInfo.managerName = res.data.data.managerName
        this.managerInfo.managerId = managerId
      })
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.teacherInfo);
            editManager(this.managerInfo).then(res => {
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
        for (const key in this.managerInfo) {
          if (this.managerInfo.hasOwnProperty(key)) {
            this.managerInfo[key] = '';
          }
        }
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