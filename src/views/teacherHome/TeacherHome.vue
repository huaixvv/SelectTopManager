<template>
  <div>
    <!-- <top-nav :userInfo="teacherInfo" ></top-nav> -->
    <teacher-nav></teacher-nav>
    <Menu></Menu>
    <router-view/> 
  </div>
</template>

<script>
  import { getTeacher } from "network/teaRequest";
  import TopNav from 'components/topNav/TopNav';
  import TeacherNav from './TeacherNav';
  import Menu from './Menu';
  import TopicTable from './TopicTable'

  export default {
    name: 'TeacherHome',
    data () {
      return {
        // teacherId: '',
        // teacherInfo: {},
      }
    },
    created(){
      // this.teacherId = window.sessionStorage.getItem('teacher');
      // getTeacher(this.teacherId).then(res => {
      //   this.teacherInfo.name = res.data.data.teacherName;
      //   this.teacherInfo.number = res.data.data.loginName;
      //   this.teacherInfo.role = '教师';
      //   this.teacherInfo.college = res.data.data.college;
      //   console.log(this.teacherInfo);
      // })  
    },
    components: {
      TopNav,
      Menu,
      TopicTable,
      TeacherNav
    }
  }
  
</script>

<style scoped>
 /* .topic-table{
   float: right;
 }  */
</style>