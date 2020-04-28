<template>
  <div>
    <p class="el-icon-caret-right">&nbsp;当前学生信息列表：</p>
      <el-table
      style="width: 80%"
      :data="studentInfo"
      :highlight-current-row ='true'>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item label="学生姓名:">
              <span>{{ props.row.studentName }}</span>
            </el-form-item>
            <el-form-item label="性别:">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="学生所属学院:">
              <span>{{ props.row.college }}</span>
            </el-form-item>
            <el-form-item label="学生专业:">
              <span>{{ props.row.speciality }}</span>
            </el-form-item>
            <el-form-item label="学生班级:">
              <span>{{ props.row.classNumber }}</span>
            </el-form-item>
            <el-form-item label="联系电话:">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="联系邮箱:">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="所选课题:">
              <span>{{ props.row.thesisName}}</span>
            </el-form-item>
            <el-form-item label="课题状态:">
              <span 
                :class="{pending:props.row.status=='待审核', 
                         sucess:props.row.status=='确认通过', 
                         reject:props.row.status=='未通过' }">
                {{ props.row.status}}</span>
            </el-form-item>
            <el-form-item label="选题时间:">
              <span>{{ props.row.createTime}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="编号"
        type="index"
        width = 80
       >
      </el-table-column>
      <el-table-column
        label="学生姓名"
        prop="studentName"
        width = 130
        >
      </el-table-column>
      <el-table-column
        label="学生专业"
        prop="speciality"
        width = 200
        >
      </el-table-column>
      <el-table-column
        label="学生班级"
        prop="classNumber"
        width = 150
        >
      </el-table-column>
      <el-table-column
        label="所选课题"
        prop="thesisName"
        width = 250
        >
      </el-table-column>
            <el-table-column
        label="申请状态"
       >
       <template slot-scope="st">
         <span 
          :class="{pending:st.row.status=='待审核', 
                   sucess:st.row.status=='确认通过', 
                   reject:st.row.status=='未通过' }">
         {{st.row.status}}
         </span>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
import { getStudentOfTeacher } from "network/teaRequest";
  export default {
    name: 'MyStudent',
    data () {
      return {
        studentInfo: null,
      }
    },
    created(){
      const teacherName = window.sessionStorage.getItem("teacherName")
      getStudentOfTeacher(teacherName).then(res => {
        this.studentInfo = res.data.data;
        // console.log(res);
      })

    },
    components: {
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
  .pending{
    color: #E6A23C;
  }

  .sucess{
    color: #67C23A;
  }

  .reject{
    color: #F56C6C;
  }
</style>