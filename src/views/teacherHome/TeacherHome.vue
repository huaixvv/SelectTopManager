<template>
  <div>
    <!-- <top-nav :userInfo="teacherInfo" ></top-nav> -->
    <teacher-nav></teacher-nav>
    <Menu></Menu>
    <router-view v-if="isRouterAlive"/> 
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
        isRouterAlive: true
      }
    },
    provide(){
      return{
        reload: this.reload
      }
    },
    created(){
      
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick( () => {
          this.isRouterAlive = true;
        })
      }
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