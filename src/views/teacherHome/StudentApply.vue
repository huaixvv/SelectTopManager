<template>
  <div>
    <p class="el-icon-caret-right">&nbsp;学生申报课题列表：</p>
      <el-table
      style="width: 80%"
      :data="orderInfo"
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
            <el-form-item label="课题教师:">
              <span>{{ props.row.teacher }}</span>
            </el-form-item>
            <el-form-item label="教研室:">
              <span>{{ props.row.classroom }}</span>
            </el-form-item>
            <el-form-item label="申请日期:">
              <span>{{ props.row.createTime }}</span>
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
        type="index"
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
        label="申请学生"
        prop="student"
        width = 140
        >
      </el-table-column>
      <el-table-column
        label="申请状态"
       >
       <template slot-scope="st">
         <span 
          :class="{pending:st.row.status=='待审核', 
                   sucess:st.row.status=='确认通过', 
                   reject:st.row.status=='未通过' }"
          >
         {{st.row.status}}
         </span>
       </template>
      </el-table-column>
      <el-table-column 
            label="操作">
          <template slot-scope="scope">
            <el-button 
              size="mini" 
              type="success" 
              :disabled="scope.row.status=='确认通过' || scope.row.status=='未通过'" 
              @click="confirm(scope.row)">
              通过
            </el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.status=='未通过' ||  scope.row.status=='确认通过'"
              @click="refuse(scope.row)">
              拒绝
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  import { getOrder, confirmThesis, refuseThesis } from "network/teaRequest";
  export default {
    name: 'StudentApply',
    inject: ['reload'],
    data () {
      return {
        orderInfo: null,
      }
    },
    created(){
      let teacherName = window.sessionStorage.getItem("teacherName")
      getOrder(teacherName).then(res => {
        this.orderInfo = res.data.data;
        // console.log(res);
      })
    },
    methods:{
      confirm(order){
         this.$confirm('确认学生选题后不可再次修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          confirmThesis(order).then(res=>{
            this.reload();
          })
          this.$message({
            offset:200,
            type: 'success',
            message: '已通过该生的选题!'
          });
        });
      },
      refuse(order){
        this.$confirm('拒绝学生选题后不可再次修改, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          refuseThesis(order).then(res=>{
            this.reload();
          })
          this.$message({
            offset:200,
            type: 'success',
            message: '已拒绝该生的选题!'
          });
        });
        
      }
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