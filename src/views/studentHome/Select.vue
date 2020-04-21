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
    :data="tableData"
    style="width: 77%; margin-left:250px"
    border
    empty-text="暂未选题"
    >
    <el-table-column
      prop="name"
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
      prop="Status"
      label="确认状态"
      width="120">
      <template>
         <p style="color: #0b8902">状态通过</p>
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
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="题目">
        <el-input v-model="formInline.user" placeholder="题目"></el-input>
      </el-form-item>
      <el-form-item label="指导教师" class="el-item">
        <el-input v-model="formInline.user" placeholder="指导教师"></el-input>
      </el-form-item>
      <el-form-item label="所属院系" class="el-item">
        <el-select v-model="formInline.region" placeholder="">
          <el-option label="计算机与电气工程学院" value="计算机与电气工程学院"></el-option>
          <el-option label="文史与法学学院" value="文史与法学学院"></el-option>
          <el-option label="外国语学院" value="外国语学院"></el-option>
          <el-option label="机械工程学院" value="机械工程学院"></el-option>
          <el-option label="经济与管理学院" value="经济与管理学院"></el-option>
          <el-option label="艺术学院" value="艺术学院"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="el-btn">
        <el-button type="primary" >查询</el-button>
      </el-form-item>
    </el-form>
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
        prop="thesisDate"
       >
      </el-table-column>
      <el-table-column 
            label="操作">
          <template slot-scope="scope">
            <el-button size="mini"  @click="editThesis(scope.row.thesisId)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delThesis(scope.row.thesisId)">
              删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

<!-- 分页 -->
  <div class="block el-page">
    <el-pagination
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
  </div>

  </div>
</template>

<script>
  export default {
    name: 'Select',
    data () {
      return {
        tableData: [{
          name: '基于微信小程序的学习打卡系统的设计与实现',
          thesisType: '工程工业设计',
          thesisFrom: '生产/社会实践',
          teacher: '李建',
          // Status: '确认通过',
          // Edit: '查看详情'
        }],
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
     
    },
 
    components: {
    }
  }
</script>

<style scoped>
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
    margin-left: 250px;
  }

  .el-page{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>