<template>
  <div>
    <p class="el-icon-caret-right">&nbsp;已发布题目列表：</p>
      <el-table
      style="width: 80%"
      :data="thesisData"
      :highlight-current-row ='true'>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item label="课题名称:">
              <span>{{props.row.thesisName}}</span>
            </el-form-item>
            <el-form-item label="题目所属学院:">
              <span>{{ props.row.thesisCollege }}</span>
            </el-form-item>
            <el-form-item label="题目类型:">
              <span>{{ props.row.thesisType }}</span>
            </el-form-item>
            <el-form-item label="题目来源:">
              <span>{{ props.row.thesisFrom }}</span>
            </el-form-item>
            <el-form-item label="指导教师:">
              <span>{{ props.row.teacher }}</span>
            </el-form-item>
            <el-form-item label="教研室:">
              <span>{{ props.row.classroom }}</span>
            </el-form-item>
            <el-form-item label="申报日期:">
              <span>{{ props.row.thesisDate }}</span>
            </el-form-item>
            <el-form-item label="选择模式:">
              <span>{{ props.row.model }}</span>
            </el-form-item>
            <el-form-item label="可选专业:">
              <span>{{ props.row.allowSpecial }}</span>
            </el-form-item>
            <el-form-item label="课题附件:">
              <span><a :href="props.row.thesisDoc" class="el-icon-document downloadUrl">&nbsp;点击查看</a></span>
            </el-form-item>
            <el-form-item label="课题说明:">
              <span>{{ props.row.thesisDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="编号"
        prop="thesisId"
        width = 130
       >
      </el-table-column>
      <el-table-column
        label="课题名称"
        prop="thesisName"
        width = 330
        >
      </el-table-column>
      <el-table-column
        label="指导教师"
        prop="teacher"
        width = 140
        >
      </el-table-column>
      <el-table-column
        label="申报时间"
        prop="thesisDate"
       >
      </el-table-column>
      <el-table-column 
            label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editThesis(scope.row.thesisId)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delThesis(scope.row.thesisId, scope.row.thesisName)">
              删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
 import { getThesisByTeacherName, delThesisById, getTeacher } from "network/teaRequest";

  export default {
    data() {
      return {
        thesisData: null,
        teacher: null
      }
    },
    created(){
      let teacherId = window.sessionStorage.getItem('teacher');
      getTeacher(teacherId).then(res => {
        this.teacher = res.data.data
        console.log(this.teacher);
        getThesisByTeacherName(this.teacher.teacherName).then(res=>{
                        this.thesisData = res.data.data;
                        console.log(this.thesisData);
                      })
      })      
    },
    computed:{
      // teacher(){
      //   return JSON.parse(window.sessionStorage.getItem("teacher"))
      // }
    },
    methods:{
      //删除课题
      delThesis(thesisId, thesisName){
        this.$confirm('此操作将永久删除该课题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delThesisById(thesisId, thesisName).then(res=>{  
              if (res.data.code==5000) {
                this.$alert('此课题已经被学生选择！不能进行删除！', '提示', {
                  confirmButtonText: '确定',
                  type: 'error'
                });
              }else{
                getThesisByTeacherName(this.teacher.teacherName).then(res=>{
                  this.thesisData = res.data.data;
                })
                this.$alert('删除课题成功！', '提示', {
                  confirmButtonText: '确定',
                  type: 'success'
                });
              }
              }) 
        }).catch(() => {});
      },
      
      editThesis(thesisId){
        this.$router.push(`/teacher/edit/${thesisId}`);
      }
    }
  }
</script>

<style scoped>
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
  p {
    font-size: 18px;
    margin: 20px 20px 20px 15px;
    font-weight: 500;
    color: #606266;
  }

  .downloadUrl{
    color: #409EFF;
  }
</style>