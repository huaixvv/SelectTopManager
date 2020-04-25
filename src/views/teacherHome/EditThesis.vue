<template>
  <div class="fromcontain">
    <div class="fromtitle el-icon-caret-right"> &nbsp;请填写/更改课题信息：</div>
    <div class="editfrom">
      <el-form :model="thesisData" :rules="rules" ref="thesisData" label-width="100px" class="demo-ruleForm">
       <el-form-item label="课题编号" prop="thesisId">
        <el-input v-model="thesisData.thesisId" disabled></el-input>
      </el-form-item>
       <el-form-item label="课题名称" prop="thesisName">
        <el-input v-model="thesisData.thesisName" placeholder="请输入课题名称"></el-input>
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
      <el-form-item label="可选专业" prop="allowSpecial">
        <el-select v-model="thesisData.allowSpecial" placeholder="请选择可以选择的专业">
          <el-option label="计算机与电气工程学院(全部专业)" value="计算机与电气工程学院(全部专业)"></el-option>
          <el-option label="文史与法学学院(全部专业)" value="文史与法学学院(全部专业)"></el-option>
          <el-option label="外国语学院(全部专业)" value="外国语学院(全部专业)"></el-option>
          <el-option label="机械工程学院(全部专业)" value="机械工程学院(全部专业)"></el-option>
          <el-option label="经济与管理学院(全部专业)" value="经济与管理学院(全部专业)"></el-option>
          <el-option label="艺术学院(全部专业)" value="艺术学院(全部专业)"></el-option>
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
          <el-radio label="教师科研课题"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="师生双选" prop="model">
        <el-radio-group v-model="thesisData.model">
          <el-radio disabled label="师生互选课题"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="教研室：" prop="classroom">
        <el-input v-model="thesisData.classroom" placeholder="请输入教研室名称"></el-input>
      </el-form-item>
      <el-form-item label="课题简述" prop="thesisDesc">
        <el-input type="textarea" v-model="thesisData.thesisDesc"></el-input>
      </el-form-item>

      <div class="filepath" v-show="isfilepathShow">
        课题附件： <a :href="thesisData.filePath">{{fileNamePath}}</a>，如需修改请点击上传附件
      </div>

      <!-- 上传附件 -->
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1:10086/file/upload"
        :on-preview="handlePreview"
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
          <el-button type="primary" @click="editThesis('thesisData')">立即修改</el-button>
          <el-button @click="resetForm('thesisData')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    </div>
  </div>

</template>

<script>
  import { delFile } from "network/fileRequest";
  import { addThesis, getThesisById, editThesis } from "network/teaRequest";
  export default {
    name: 'EditThesis',
    data() {
      return {
        fileList:[],
        isfilepathShow: true,
        thesisData: {
          thesisId:'',
          thesisName: '',
          thesisCollege: '',
          teacher: '',
          thesisType: '',
          thesisFrom: '',
          classroom: '',
          allowSpecial: '',
          model: '师生互选课题',
          thesisDesc: '',
          filePath: '',
          student: null
        },
        rules: {
          thesisName: [
            { required: true, message: '请输入课题名称', trigger: 'blur' },
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
          thesisDesc: [
            { required: true, message: '课题简述不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
      fileNamePath(){
        return this.thesisData.thesisName +'.' + this.thesisData.filePath.split('.').pop()
      }
    },
    created(){
      this.thesisData.thesisId = this.$route.params.thesisId;
      getThesisById(this.thesisData.thesisId).then(res => {
         console.log(res);
         this.thesisData.thesisName = res.data.data.thesisName;
         this.thesisData.allowSpecial = res.data.data.allowSpecial;
         this.thesisData.model = res.data.data.model;
         this.thesisData.teacher = res.data.data.teacher;
         this.thesisData.thesisCollege = res.data.data.thesisCollege;
         this.thesisData.thesisDate = res.data.data.thesisDate;
         this.thesisData.thesisDesc = res.data.data.thesisDesc;
         this.thesisData.filePath = res.data.data.thesisDoc;
         this.thesisData.thesisFrom = res.data.data.thesisFrom;
         this.thesisData.thesisType = res.data.data.thesisType;
      })
    },
    methods: {
       editThesis(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editThesis(JSON.stringify(this.thesisData), this.thesisData.thesisId).then(res => {
              if(res.data.data.code == 2000) {
                this.$message({
                  message: '课题修改成功！',
                  type: 'success'
                });
                setTimeout(() => {
                 this.$router.replace('/teacher/alltopic');
                }, 1000);
              }else{
                this.$message({
                  message: '课题修改失败，请重试！',
                  type: 'error'
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // onChange(file){
      //   this.thesisData.fileList.push(file)
      // },

      onSuccess(response, file, fileList){
        this.thesisData.filePath = response.data;
        this.isfilepathShow = false;
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

      handlePreview(file) {                 //点击文件列表中已上传的文件时的钩子
        console.log(2);
        console.log(file);
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
      }
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

  .filepath{
    font-size: 14px;
    margin: 30px;
  }

  .filepath a{
    color: #409EFF;
    text-decoration: underline #409EFF
;
  }
</style>