<template>
  <div>
    <div class="fromcontain">
    <div class="fromtitle el-icon-caret-right"> &nbsp;请填写课题信息：</div>
    <div class="editfrom">
      <el-form :model="thesisData" :rules="rules" ref="thesisData" label-width="100px" class="demo-ruleForm">
       <el-form-item label="课题名称" prop="thesisName">
        <el-input v-model="thesisData.thesisName" placeholder="请输入课题名称"></el-input>
      </el-form-item>
       <el-form-item label="指导教师" prop="teacher">
        <el-input v-model="thesisData.teacher" placeholder="请输入指导教师名称"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="thesisCollege">
        <el-select v-model="thesisData.thesisCollege" placeholder="请选择所属学院">
          <el-option label="计算机与电气工程学院" value="计算机与电气工程学院"></el-option>
          <el-option label="文史与法学学院" value="文史与法学学院"></el-option>
          <el-option label="外国语学院" value="外国语学院"></el-option>
          <el-option label="机械工程学院" value="机械工程学院"></el-option>
          <el-option label="经济与管理学院" value="经济与管理学院"></el-option>
          <el-option label="艺术学院" value="艺术学院"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="题目类型" prop="thesisType">
        <el-radio-group v-model="thesisData.thesisType">
          <el-radio label="艺美设计"></el-radio>
          <el-radio label="工程工业设计"></el-radio>
          <el-radio label="应用研究"></el-radio>
          <el-radio label="理论研究"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题目来源" prop="thesisFrom">
        <el-radio-group v-model="thesisData.thesisFrom">
          <el-radio label="生产/社会实践"></el-radio>
          <el-radio label="教学科研课题"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="选题模式" prop="model">
        <el-radio-group v-model="thesisData.model">
          <el-radio label="师生双选" disabled=""></el-radio>
          <el-radio label="学生自拟"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="课题简述" prop="thesisDesc">
        <el-input type="textarea" v-model="thesisData.thesisDesc"></el-input>
      </el-form-item>

      <!-- 上传附件 -->
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:10086/file/upload"
        :on-remove="handleRemove"       
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-success="onSuccess"
        :auto-upload="true"
         ref="upload"
        >
        <el-button size="small" type="info" class="el-icon-upload el-icon--right"> 上传附件</el-button>
      </el-upload>
      <div class="subtn">
        <el-form-item >
          <el-button type="primary" @click="submitForm('thesisData')">立即申报</el-button>
          <el-button @click="resetForm('thesisData')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    </div>
  </div>
  </div>
</template>

<script>
  import { delFile } from "network/fileRequest";
  import { applyThesis } from "network/stuRequest";
  export default {
    name: 'ApplySis',
    data() {
      return {
        fileList:[],
        thesisData: {
          thesisName: '',
          thesisCollege: '',
          teacher: '',
          thesisType: '',
          thesisFrom: '',
          classroom: '',
          allowSpecial: '',
          model: '',
          thesisDesc: '',
          filePath: '',
          student: ''
        },
        rules: {
          thesisName: [
            { required: true, message: '请输入课题名称', trigger: 'blur' },
          ],
          teacher: [
            { required: true, message: '请输入指导教师姓名', trigger: 'blur' },
          ],
          thesisCollege: [
            { required: true, message: '请选择所属学院', trigger: 'change' }
          ],
          allowSpecial: [
            { required: true, message: '请选择可选专业', trigger: 'change' }
          ],
          thesisType: [
            { required: true, message: '请选择题目类型', trigger: 'change' }
          ],
          thesisFrom: [
            { required: true, message: '请选择题目来源', trigger: 'change' }
          ],
          model: [
            { required: true, message: '请选择选题模式', trigger: 'change' }
          ],
          thesisDesc: [
            { required: true, message: '课题简述不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    created(){

    },
    methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.thesisData);
            this.thesisData.student = window.sessionStorage.getItem("studentName");
            const studentId = window.sessionStorage.getItem("student")
            applyThesis(JSON.stringify(this.thesisData), studentId).then(res => {
              console.log(res);
              if(res.data.code == 0) {
                this.$confirm('申报课题成功！', '提示', {
                  confirmButtonText: '确定',
                  type: 'success'
                })
              }
              if(res.data.code == 5000){
                this.$alert('申报失败！您已经选择过课题，请耐心等待教师审核！', '提示', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              }
            });

          } else {
            return false;
          }
        });
      },

      onSuccess(response, file, fileList){
        this.thesisData.filePath = response.data;
        console.log(this.thesisData.filePath);
      },
      
      handleRemove(file, fileList) {
        delFile(this.thesisData.filePath)
        .then(res => {
                    console.log(res);
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                     });
                  })
                  
      },
      handleExceed(files, fileList) {        //s数量超出的
        this.$message({
          message: '只允许上传一个课题相关附件，请先删除前一个文件',
          center: true,
          type: 'error'
        });
      },
      beforeRemove(file, fileList) {       //列表移除文件前时的钩子
        return this.$confirm(`此操作将永久删除 ${ file.name }？, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })   
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
  
 .editfrom{
   margin: 20px 0 0 140px;
 }

 .upload-demo{
   margin: 40px 0px 50px 40px;
 }

 .uptips{
   font-size: 12px;
   
 }
  .subtn{
    float: right;

  }
</style>