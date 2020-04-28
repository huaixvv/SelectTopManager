<template>
  <div id="select-sis">
    <div class="notic-msg">
      <h3>信息提示:</h3>
      <p>1. 根据您所在学校或院系的设置，您最多可选 <span>1</span> 个题目等待导师确认，最终可确定 <span>1</span> 个双选题目</p>
      <p>2. 根据您所在学校或院系的设置，每个题目最多可供 <span>1</span> 名学生选择，并等待导师确认，最终每个题目可确定 <span>1</span> 人双选</p>
      <p>3. 开始时间：2019/10/29 9:00:00；结束时间：2019/11/1 17:30:00</p>
    </div>
    <div class="title-s el-icon-caret-right"> &nbsp;已选择题目：</div>
    
    <el-table
    :data="choosedThesis"
    style="width: 77%; margin-left:250px"
    border
    empty-text="暂未选题"
    >
    <el-table-column
      prop="thesisName"
      label="题目"
      width="350">
    </el-table-column>
    <el-table-column
      prop="thesisType"
      label="题目类型"
      width="140">
    </el-table-column>
    <el-table-column
      prop="thesisFrom"
      label="题目来源"
      width="140">
    </el-table-column>
    <el-table-column
      prop="teacher"
      label="指导教师"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="确认状态"
      width="120">
      <template>
         <p :class="{pending:isPending, sucess:isSucess, reject: isReject}">{{choosedThesis[0].status}}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="Edit"
      label="操作"
      >
      <template>
         <p style="color: #409EFF">查看详情</p>
      </template>
    </el-table-column>
  </el-table>

  <div class="title-s el-icon-caret-right"> &nbsp;题目列表：</div>
  <div class="sel-condition">
    <el-form :inline="true" :model="selectCondition" class="demo-form-inline" size="mini">
      <el-form-item label="题目">
        <el-input v-model="selectCondition.sisName" placeholder="题目" clearable></el-input>
      </el-form-item>
      <el-form-item label="指导教师" class="el-item">
        <el-input v-model="selectCondition.sisTeacher" placeholder="指导教师" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属院系" class="el-item">
        <el-select v-model="selectCondition.sisCollege" placeholder="" clearable>
          <el-option label="计算机与电气工程学院" value="计算机与电气工程学院"></el-option>
          <el-option label="文史与法学学院" value="文史与法学学院"></el-option>
          <el-option label="外国语学院" value="外国语学院"></el-option>
          <el-option label="机械工程学院" value="机械工程学院"></el-option>
          <el-option label="经济与管理学院" value="经济与管理学院"></el-option>
          <el-option label="艺术学院" value="艺术学院"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="el-btn">
        <el-button type="primary" @click="selectByCondition">查询</el-button>
      </el-form-item>
    </el-form>
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

  <!-- 课题列表 -->
    <div class="sel-table">
      <el-table
      style="width: 95%"
      :data="thesisData"
      size="mini"
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
        label="所属学院"
        prop="thesisCollege"
       >
      </el-table-column>
      <el-table-column 
            label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="choose(scope.row)">
              选题
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>



  </div>
</template>

<script>

  import { getAllThesis, getCountThesis, getThesis, chooseThesis, chooesdThesis } from "network/stuRequest";
  export default {
    name: 'Select',
    inject: ['reload'],
    data () {
      return {
        choosedThesis: [{
          thesisName:'',
          thesisType:'',
          thesisFrom:'',
          teacher:'',
          status:''
        }],
        selectCondition: {
          sisName: '',
          sisTeacher: '',
          sisCollege:''
        },
        thesisData: null,
        pagehelper: {
          count: 0,
          total: 0,
          pageSize: 5,
          currentPage:1
        },
        isPending: false,
        isSucess: false,
        isReject: false
      }
    },
    created(){
      // getAllThesis(this.pagehelper.currentPage,this.pagehelper.pageSize).then(res=>{
      //   this.thesisData = res.data.data;
      //   // console.log(this.thesisData);
      // }),
      const studentId = window.sessionStorage.getItem("student");
      chooesdThesis(studentId).then(res=>{
        this.choosedThesis[0].thesisFrom = res.data.data.thesisFrom;
        this.choosedThesis[0].thesisType = res.data.data.thesisType;
        this.choosedThesis[0].thesisName = res.data.data.thesisName;
        this.choosedThesis[0].teacher = res.data.data.teacher;
        this.choosedThesis[0].status = res.data.data.status;
        switch (this.choosedThesis[0].status) {
          case "待审核":
            this.isPending = true;
            break;
          case "确认通过":
            this.isSucess = true;
            break;
          case "未通过":
            this.isReject = true;
            break;
        }
        console.log(this.choosedThesis);
      }),
      getThesis(this.selectCondition.sisName, this.selectCondition.sisTeacher, 
                this.selectCondition.sisCollege, this.pagehelper.currentPage)
        .then(res => {
          console.log(res);
          this.thesisData = res.data.data.list;
        }),
      getCountThesis().then(res=>{
        this.pagehelper.total = res.data.data;
        })
    },
    methods: {
      selectByCondition(){
        this.pagehelper.currentPage = 1;
        getThesis(this.selectCondition.sisName, this.selectCondition.sisTeacher, 
                  this.selectCondition.sisCollege, this.pagehelper.currentPage)
          .then(res => {
            this.thesisData = res.data.data.list;
            this.pagehelper.total = res.data.data.count;
            console.log(this.thesisData);
          })
      },
      nextpage(){
        getThesis(this.selectCondition.sisName, this.selectCondition.sisTeacher, 
                  this.selectCondition.sisCollege, ++this.pagehelper.currentPage)
          .then(res => {
            this.thesisData = res.data.data.list;
          })
      },
      prevpage(){
        getThesis(this.selectCondition.sisName, this.selectCondition.sisTeacher, 
                  this.selectCondition.sisCollege, --this.pagehelper.currentPage)
          .then(res => {
            this.thesisData = res.data.data.list;
          })
      },
      changepage(){
        getThesis(this.selectCondition.sisName, this.selectCondition.sisTeacher, 
                  this.selectCondition.sisCollege, this.pagehelper.currentPage)
          .then(res => {
            this.thesisData = res.data.data.list;
          })
      },
      choose(thesis){
        this.$confirm('您只能选择一个课题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            const studentId = window.sessionStorage.getItem("student");
            const studentName = window.sessionStorage.getItem("studentName");
            chooseThesis(thesis, studentId, studentName).then(res=>{
              // console.log(res);
                if(res.data.code == 0) {
                    this.$alert('选题成功！请等待指导教师审核！', '提示', {
                      confirmButtonText: '确定',
                      type: 'success'
                    }).then(()=>{
                       this.reload();
                    })
                  }
                if(res.data.code == 6000){
                  this.$alert('选题失败！请确认您是否已经选择过课题！', '提示', {
                      confirmButtonText: '确定',
                      type: 'error'
                    })
                  }
            })
        })
      }
    },
  
    components: {
    }
  }
</script>

<style scoped>

  .pending{
    color: #E6A23C;
  }

  .sucess{
    color: #67C23A;
  }

  .reject{
    color: #F56C6C;
  }

  .notic-msg{
    margin-top: 30px;
    margin-left: 250px;
    font-size: 13px;
    letter-spacing: 1px;
    width: 76%;
    height: 100px;
    border: 1px rgb(146, 145, 145) solid;
  }
  .notic-msg h3{
    font-size: 14px;
    font-weight: 500;
    margin: 10px 0px 6px 10px;
  }
  .notic-msg p{
    padding: 4px 30px;
  }
  .notic-msg span{
    color: #f00;
    font-weight: 600;
  }
  .title-s{
    font-size: 18px;
    margin: 30px 20px 20px 15px;
    font-weight: 500;
    color: #606266;
  }

  .sel-condition{
    margin-left: 250px;
    margin-bottom: 20px;
  }

  .el-item{
    margin-left: 50px;
  }
  .el-btn{
    margin-left: 90px;
  }

  .sel-table{
    height: 600px;
    margin-left: 250px;
  }

  .el-page{
    margin-top: -10px;
    margin-left: 240px;
    margin-bottom: 20px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
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

  .downloadUrl{
    color: #409EFF;
  }
</style>