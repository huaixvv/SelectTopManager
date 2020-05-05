<template>
  <div>
    <p class="el-icon-caret-right">&nbsp;教师列表：</p>
    <div class="add-btn">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addteacher">添加教师</el-button>
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
      :data="teacherList"
      style="width: 80%">a
      <el-table-column
        prop="loginName"
        label="登录账户"
        width="100">
      </el-table-column>
      <el-table-column
        prop="teacherPwd"
        label="登录密码"
        width="100">
      </el-table-column>
      <el-table-column
        prop="teacherName"
        width="80"
        label="教师姓名">
      </el-table-column>
      <el-table-column
        prop="college"
        width="140"
        label="学院">
      </el-table-column>
      <el-table-column
        prop="sex"
        width="80"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="phone"
        width="120"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="email"
        width="130"
        label="联系邮箱">
      </el-table-column>
      <el-table-column
        prop="teacherPost"
        width="100"
        label="职务">
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

    <el-dialog title="请输入教师信息" :visible.sync="dialogFormVisible" width="40%">
      <div class="form-data">
        <el-form :model="teacherInfo" 
                status-icon 
                ref="teacherInfo"
                label-width="100px" 
                class="demo-teacherInfo" 
                label-position=left
                :rules="rules">
        <el-form-item label="登录账户" prop="loginName" >
          <el-input  v-model="teacherInfo.loginName" size="small"></el-input>
        </el-form-item>
          <el-form-item label="教师姓名" prop="teacherName" >
          <el-input  v-model="teacherInfo.teacherName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="教师职务" prop="teacherPost">
          <el-input v-model="teacherInfo.teacherPost" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="teacherInfo.sex" placeholder="请选择性别" size="small">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属学院" prop="college">
          <el-select v-model="teacherInfo.college" placeholder="请选择所属学院" size="small">
            <el-option label="计算机与电气工程学院" value="计算机与电气工程学院"></el-option>
            <el-option label="文史与法学学院" value="文史与法学学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="机械工程学院" value="机械工程学院"></el-option>
            <el-option label="经济与管理学院" value="经济与管理学院"></el-option>
            <el-option label="艺术学院" value="艺术学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="teacherInfo.phone" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="teacherInfo.email" type="email" size="small"></el-input>
        </el-form-item>
        
        <el-form-item label="登录密码" prop="teacherPwd">
          <el-input v-model="teacherInfo.teacherPwd"  size="small"></el-input>
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
  import { getAllTeachers, delTeacher } from "network/manRequest";
  import { editinfo } from "network/teaRequest";

  export default {
    name: 'TeacherInfo',
    inject: ['reload'],
    data() {
        return {
          teacherList: null,
          dialogFormVisible: false,
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
          teacherPwd: [
            { required: true, message: '登录密码不能为空', trigger: 'change' }
          ],
          teacherName: [
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
      getAllTeachers(this.pagehelper.currentPage).then(res=>{
        console.log(res);
        this.teacherList = res.data.data.list
        this.pagehelper.total = res.data.data.count;
      })
    },
    methods:{
      edit(teacher){
        this.dialogFormVisible = true;
        this.teacherInfo.loginName = teacher.loginName;
        this.teacherInfo.teacherId = teacher.teacherId;
        this.teacherInfo.teacherName = teacher.teacherName;
        this.teacherInfo.college = teacher.college;
        this.teacherInfo.teacherPost = teacher.teacherPost;
        this.teacherInfo.email = teacher.email;
        this.teacherInfo.phone = teacher.phone;
        this.teacherInfo.sex = teacher.sex;
        this.teacherInfo.teacherPwd = teacher.teacherPwd;
        console.log(this.teacherInfo);
      },
      addteacher(){
        this.dialogFormVisible = true;
        for (const key in this.teacherInfo) {
          if (this.teacherInfo.hasOwnProperty(key)) {
            this.teacherInfo[key] = '';
          }
        }
      },
      del(teacher){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          delTeacher(teacher).then(res => {
            console.log(res);
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
            editinfo(this.teacherInfo).then(res => {
              console.log(res);
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
        this.teacherInfo.loginName = '';
        this.teacherInfo.teacherName = '';
        this.teacherInfo.college = '';
        this.teacherInfo.teacherPost = '';
        this.teacherInfo.email = '';
        this.teacherInfo.phone = '';
        this.teacherInfo.sex = '';
        this.teacherInfo.teacherPwd = '';
      },

      nextpage(){
        getAllTeachers(++this.pagehelper.currentPage).then(res=>{
          console.log(res);
          this.teacherList = res.data.data.list
        })
      },
      prevpage(){
        getAllTeachers(--this.pagehelper.currentPage).then(res=>{
          console.log(res);
          this.teacherList = res.data.data.list
        })
      },
      changepage(){
        getAllTeachers(this.pagehelper.currentPage).then(res=>{
          console.log(res);
          this.teacherList = res.data.data.list
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

  .el-page{
    margin-top: 10px;
    margin-left: 200px;
    margin-bottom: 20px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
  }
</style>