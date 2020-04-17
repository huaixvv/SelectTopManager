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
        }]
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

</style>