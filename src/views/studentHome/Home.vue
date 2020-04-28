<template>
  <div class="box">
    <div class="left">
      <div class="userimg">
        <img src="~assets/img/info.jpg" alt="">
        <p>欢迎您，{{studentName}}</p>
      </div>
      <div class="msgbox">

      </div>
    </div>
    <div class="right">
      <div class="sisbox">
        <div class="sis-title">毕设题目：{{info.thesisName}}</div>
        <div class="sis-state">
          当前状态：
          <span :class="{pending:info.status=='待审核' || info.status=='待选', 
                         sucess:info.status=='确认通过', 
                         reject:info.status=='未通过' }">
            {{info.status}}
          </span>
        </div>
        <div class="sis-word">任务书：<a :href="info.thesisDoc" class="downloadUrl">点击下载任务书</a></div>
        <hr>
        <div class="sis-tea">指导教师：{{info.teacher}} </div>
        <div class="phone">教师联系电话：{{teacher.phone}}</div>
        <div class="email">教师联系邮箱：{{teacher.email}}</div>
        <div class="downloadUrl" @click="dialogTableVisible = true">查看课题详情</div>
      </div>
    </div>
    <el-dialog
               :visible.sync="dialogTableVisible"
               width=50%>
      <div class="info-title">课题详情</div>
      <div class="thesis-info">
        <div class="">毕设题目：{{info.thesisName}}</div>
        <div class="">所属学院：{{info.thesisCollege}}</div>
        <div class="">题目类型：{{info.thesisType}}</div>
        <div class="">题目来源：{{info.thesisFrom}}</div>
        <div class="">指导教师：{{info.teacher}}</div>
        <div class="">教研室：{{info.classroom}}</div>
        <div class="">申报日期：{{info.thesisDate}}</div>
        <div class="">选题时间：{{info.createTime}}</div>
        <div class="">选择模式：{{info.model}}</div>
        <div class="">课题说明：{{info.thesisDesc}}</div>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
  import { chooesdThesis } from "network/stuRequest";
  import { teacherByName } from "network/teaRequest";
  export default {
    name: 'Home',
    data () {
      return {
        info:{},
        studentName:'',
        dialogTableVisible: false,
        teacher:{}
      }
    },
    created(){
      const studentId = window.sessionStorage.getItem("student");
      this.studentName = window.sessionStorage.getItem("studentName")
      chooesdThesis(studentId).then(res=>{
        console.log(res);
        if (res.data.data==null) {
          this.info.thesisName = "暂未选题"
          this.info.status = "待选"
          this.info.teacher = ""
          this.info.thesisDoc = ""
        }else{
          this.info = res.data.data
          teacherByName(this.info.teacher).then(res=>{
            console.log(res);
            this.teacher = res.data.data
          })
        }
      });
    },
    components: {
    }
  }
</script>

<style scoped>
  .box{
    display: flex;
  }
 .left{
   width: 250px;
   height: 600px;
 }
 .right{
   flex: 1;
   height: 600px;
   display: flex;
   justify-content: center;
   /* background-color: blue; */
 }
  .userimg{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 80px;
    margin-left: 40px;
    width: 200px;
    height: 320px;
    background-color: rgba(216, 218, 216, 0.671);
    border-radius: 10px;
  }
  .left p{
    font-size: 16px;
    font-weight: 500;
    width: 120px;
    margin-top: -120px;
    margin-left: 12px;
  }
 .userimg img{
   margin-top: 30px;
   width: 110px;
   height: 110px;
   border-radius: 50%;
 }

 .sisbox{
   border-radius: 10px;
   margin-top: 80px;
   width: 90%;
   height: 320px;
   background-color: rgba(216, 218, 216, 0.671);
   
 }

 .sisbox div{
   font-size: 16px;
   font-weight: 500;
   padding: 12px 40px;
 }

 hr{
   border: none;
   height: 1px;
   width: 88%;
   background-color: rgba(160, 159, 157, 0.514);
 }
 .sis-title{
  margin-top: 10px;
 }

  .downloadUrl{
    color: #409EFF;
    cursor: pointer;
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
  .look{
    margin-left: 80px;
  }
 
  .thesis-info div{
    color: #606266;
    margin-left: 130px;
    letter-spacing: 1px;
    margin-top: 10px;
    font-weight: 500;
    font-size: 16px;
  }
  .info-title{
    color: #606266;
    margin-left: 130px;
    margin-bottom: 26px;
    letter-spacing: 1px;
    font-weight: 500;
    font-size: 18px;
  }
 
</style>