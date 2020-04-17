<template>
  <div>
    <StudentNav></StudentNav>
    <SMenu></SMenu>
    <router-view></router-view>
  </div>
</template>

<script>
  import StudentNav from './StudentNav'
  import SMenu from './SMenu'

  export default {
    name: 'TeacherHome',
    data () {
      return {
        
      }
    },
    created(){
      
    },
    components: {
      StudentNav,
      SMenu
    }
  }
  
</script>

<style scoped>
 /* .topic-table{
   float: right;
 }  */
</style>