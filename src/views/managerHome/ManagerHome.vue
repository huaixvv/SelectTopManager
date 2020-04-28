<template>
  <div>
    <!-- <top-nav :userInfo="teacherInfo" ></top-nav> -->
    <manager-nav></manager-nav>
    <Menu></Menu>
    <router-view v-if="isRouterAlive"/> 
  </div>
</template>

<script>
  import { getTeacher } from "network/teaRequest";
  import ManagerNav from './ManagerNav';
  import Menu from './Menu';

  export default {
    name: 'ManagerHome',
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
      Menu,
      ManagerNav
    }
  }
  
</script>

<style scoped>
 /* .topic-table{
   float: right;
 }  */
</style>