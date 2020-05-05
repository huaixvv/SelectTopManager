<template>
  <div>
    <p class="el-icon-caret-right">&nbsp;学生列表：</p>
    <div class="add-btn">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addstudent">添加学生</el-button>
      <!-- <el-button type="primary" size="small" icon="el-icon-folder-add">批量导入</el-button> -->
    </div>


 <!-- 分页 -->
    <div class="block el-page">
      <el-pagination
        background
        small
        @prev-click="prevpage"
        @next-click="nextpage"
        @current-change="changepage"
        layout="prev, pager, next"
        :total="pagehelper.total"
        :page-size="pagehelper.pageSize"
        :current-page.sync="pagehelper.currentPage"
        >
      </el-pagination>
    </div>

    <el-table
      size="small"
      :data="studentList"
      style="width: 80%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item label="学院:">
              <span>{{props.row.college}}</span>
            </el-form-item>
            <el-form-item label="电话:">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ props.row.email }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录账户"
        width="110">
      </el-table-column>
      <el-table-column
        prop="studentPwd"
        label="登录密码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="studentName"
        width="110"
        label="学生姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        width="100"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="speciality"
        width="180"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="classNumber"
        width="180"
        label="班级">
      </el-table-column>
            <el-table-column 
            label="操作">
            <template slot-scope="scope">
            <el-button 
              size="mini" 
              type="primary" 
              @click="edit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del(scope.row)">
              删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>

<!-- -------------------------- -->
    <el-dialog title="请输入学生信息" :visible.sync="dialogFormVisible" width="40%">
      <div class="form-data">
        <el-form :model="studentInfo" 
                status-icon 
                ref="teacherInfo"
                label-width="100px" 
                class="demo-teacherInfo" 
                label-position=left
                :rules="rules">
        <el-form-item label="登录账户" prop="loginName" >
          <el-input  v-model="studentInfo.loginName" size="small"></el-input>
        </el-form-item>
          <el-form-item label="学生姓名" prop="studentName" >
          <el-input  v-model="studentInfo.studentName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="studentInfo.sex" placeholder="请选择性别" size="small">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属学院" prop="college">
          <el-select v-model="studentInfo.college" placeholder="请选择所属学院" size="small">
            <el-option label="计算机与电气工程学院" value="计算机与电气工程学院"></el-option>
            <el-option label="文史与法学学院" value="文史与法学学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="机械工程学院" value="机械工程学院"></el-option>
            <el-option label="经济与管理学院" value="经济与管理学院"></el-option>
            <el-option label="艺术学院" value="艺术学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="speciality">
          <el-input v-model="studentInfo.speciality" size="small"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classNumber">
          <el-input v-model="studentInfo.classNumber" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="studentInfo.phone" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="studentInfo.email" type="email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="studentPwd">
          <el-input v-model="studentInfo.studentPwd"  size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('teacherInfo')" size="small">提交</el-button>
          <el-button @click="resetForm()" size="small" type="danger">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getAllStudents, delStudent } from "network/manRequest";
  import { editInfo } from "network/stuRequest";

  export default {
    name: 'TeacherInfo',
    inject: ['reload'],
    data() {
        return {
          studentList: null,
          dialogFormVisible: false,
          studentInfo: {
          classNumber:'',
          college:'',
          email:'',
          loginName:'',
          phone:'',
          sex:'',
          speciality:'',
          studentId:'',
          studentName:'',
          studentPwd:'',
        },
        pagehelper: {
          count: 0,
          total: 0,
          pageSize: 5,
          currentPage:1
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
          speciality: [
            { required: true, message: '专业信息不能为空', trigger: 'change' }
          ],
          loginName: [
            { required: true, message: '登录账户不能为空', trigger: 'change' }
          ],
          classNumber: [
            { required: true, message: '班级信息不能为空', trigger: 'change' }
          ],
          studentPwd: [
            { required: true, message: '登录密码不能为空', trigger: 'change' }
          ],
          studentName: [
            { required: true, message: '姓名不能为空', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
        }
      }
    },
    created(){
      getAllStudents(this.pagehelper.currentPage).then(res=>{
        this.studentList = res.data.data.list
        this.pagehelper.total = res.data.data.count;
      })
    },
    methods:{
      edit(student){
        this.dialogFormVisible = true;
        this.studentInfo.classNumber = student.classNumber
        this.studentInfo.college = student.college
        this.studentInfo.email = student.email
        this.studentInfo.loginName = student.loginName
        this.studentInfo.phone = student.phone
        this.studentInfo.sex = student.sex
        this.studentInfo.speciality = student.speciality
        this.studentInfo.studentId = student.studentId
        this.studentInfo.studentName = student.studentName
        this.studentInfo.studentPwd = student.studentPwd
        console.log(this.studentInfo);
      },

      addstudent(){
        this.dialogFormVisible = true;
        for (const key in this.studentInfo) {
          if (this.studentInfo.hasOwnProperty(key)) {
            this.studentInfo[key] = '';
          }
        }
      },
      del(student){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          delStudent(student).then(res => {
            if(res.data.code == 0){
              this.$alert('删除成功！', '提示', {
                  confirmButtonText: '确定',
                  type: 'success',
                  callback: () => {
                    this.reload();
                  }
                });
            }
          })
        }).catch(()=>{})
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.teacherInfo);
            editInfo(this.studentInfo).then(res => {
              if (res.data.data.code == 2000) {
                this.$alert('个人信息修改成功！', '提示', {
                  confirmButtonText: '确定',
                  type: 'success',
                  callback: () => {
                    this.dialogFormVisible = false;
                    this.reload();
                  }
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
        this.studentInfo.classNumber = ""
        this.studentInfo.college = ""
        this.studentInfo.email = ""
        this.studentInfo.loginName = ""
        this.studentInfo.phone = ""
        this.studentInfo.sex = ""
        this.studentInfo.speciality = ""
        this.studentInfo.studentName = ""
        this.studentInfo.studentPwd = ""
      },

      nextpage(){
        getAllStudents(++this.pagehelper.currentPage).then(res=>{
          this.studentList = res.data.data.list
        })
      },
      prevpage(){
        getAllStudents(--this.pagehelper.currentPage).then(res=>{
          this.studentList = res.data.data.list
        })
      },
      changepage(){
        getAllStudents(this.pagehelper.currentPage).then(res=>{
          this.studentList = res.data.data.list
        })
      },
    },
    components: {
    }
  }
</script>

<style scoped>
   p {
    font-size: 18px;
    margin: 20px 20px 20px 15px;
    font-weight: 500;
    color: #606266;
  }
  .form-data{
    display: flex;
    justify-content: center;
    /* width: 70%; */
  }
  .add-btn{
    float: right;
    margin: 60px 72px 30px 0px;
  }

   .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-page{
    margin-top: 10px;
    margin-left: 200px;
    margin-bottom: 20px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
  }
</style>