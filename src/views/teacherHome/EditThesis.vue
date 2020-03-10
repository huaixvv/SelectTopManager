<template>
  <div class="fromcontain">
    <div class="fromtitle el-icon-caret-right"> &nbsp;请填写/更改课题信息：</div>
    <div class="editfrom">
      <el-form :model="thesisData" :rules="rules" ref="thesisData" label-width="100px" class="demo-ruleForm">
       <el-form-item label="课题名称" prop="thesisName">
        <el-input v-model="thesisData.thesisName" placeholder="请输入课题名称"></el-input>
      </el-form-item>
      <el-form-item label="所属学院" prop="thesisCollege">
        <el-select v-model="thesisData.thesisCollege" placeholder="请选择所属学院">
          <el-option label="计算机与电气工程学院" value="computer"></el-option>
          <el-option label="文史与法学学院" value="lawhistory"></el-option>
          <el-option label="外国语学院" value="foreign"></el-option>
          <el-option label="机械工程学院" value="machinery"></el-option>
          <el-option label="经济与管理学院" value="economymanage"></el-option>
          <el-option label="艺术学院" value="art"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可选专业" prop="allowSpecial">
        <el-select v-model="thesisData.allowSpecial" placeholder="请选择可以选择的专业">
          <el-option label="计算机与电气工程学院(全部专业)" value="computer"></el-option>
          <el-option label="文史与法学学院(全部专业)" value="lawhistory"></el-option>
          <el-option label="外国语学院(全部专业)" value="foreign"></el-option>
          <el-option label="机械工程学院(全部专业)" value="machinery"></el-option>
          <el-option label="经济与管理学院(全部专业)" value="economymanage"></el-option>
          <el-option label="艺术学院(全部专业)" value="art"></el-option>
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

      <!-- 上传附件 -->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-change="onChange"
        :on-success="onSuccess"
        :auto-upload="false"
         ref="upload"
        >
        <el-button size="small" type="info" class="el-icon-upload el-icon--right"> 上传附件</el-button>
      </el-upload>
      <el-form-item>
        <el-button type="primary" @click="submitForm('thesisData')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        fileList:[],

        thesisData: {
          thesisName: '',
          thesisCollege: '',
          thesisType: '',
          thesisFrom: '',
          classroom: '',
          allowSpecial: '',
          model: '师生互选课题',
          thesisDesc: ''
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
    methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.upload.submit();
            console.log(this.thesisData);
          } else {
            
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      onChange(file){
        this.fileList.push(file)
      },

      onSuccess(){
        console.log("sucess");
      },

      handleRemove(file, fileList) {
        console.log(1);
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(2);
        console.log(file);
      },
      handleExceed(files, fileList) {
        console.log(3);
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        console.log(4);
        return this.$confirm(`确定移除 ${ file.name }？`);
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
   margin: 30px 0px 50px 30px;
 }

 .uptips{
   font-size: 12px;
   
 }
</style>