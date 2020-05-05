<template>
  <div>
    <p class="el-icon-caret-right">&nbsp;导入教师信息：</p>
    <div class="tea-import">
      <el-upload
        class="upload-demo"
        ref="upload"
        accept=".xls, .xlsx"
        :on-change="uploadteacher"
        :auto-upload="false"
        drag
        action=""
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>

    <p class="el-icon-caret-right">&nbsp;导入学生信息：</p>
    <div class="tea-import">
      <el-upload
        class="upload-demo"
        ref="upload"
        accept=".xls, .xlsx"
        :on-change="uploadstudent"
        :auto-upload="false"
        drag
        action=""
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  import XLSX from 'xlsx';
  import { ipmortTeachers, ipmortStudents} from "network/manRequest";
  export default {
    name: 'BatchImport',
    data () {
      return {

      }
    },
    methods: {
      uploadteacher(file,fileList){
        let files = {0:file.raw}
        this.readExcel(files, ipmortTeachers);
      },

      uploadstudent(file,fileList){
        let files = {0:file.raw}
        this.readExcel(files, ipmortStudents);
      },

      readExcel(files, uploadFn) {//表格导入
            var that = this;
            // console.log(files);
            if(files.length<=0){//如果没有文件名
                return false;
            }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                return false;
            }
            const fileReader = new FileReader();
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    const wsname = workbook.SheetNames[0];//取第一张表
                    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                    uploadFn(JSON.stringify(ws)).then(res=>{
                      if (res.data.code == 0) {
                        this.$alert('导入信息成功！', '提示', {
                          confirmButtonText: '确定',
                          type: 'success',
                          callback: () => {
                            // this.reload();
                          }
                        });
                      }
                    })
                    this.$refs.upload.value = '';
                } catch (e) {
                    return false;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        },
    },
    components: {
    }
  }
</script>

<style scoped>
 

 .tea-import{
   margin: 20px 0px 30px 350px;
 }

    p {
    font-size: 18px;
    margin: 20px 20px 20px 15px;
    font-weight: 500;
    color: #606266;
  }
</style>