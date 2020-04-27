<template>
  <div>
    <StudentNav></StudentNav>
    <SMenu></SMenu>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import StudentNav from './StudentNav'
  import SMenu from './SMenu'

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
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick( () => {
          this.isRouterAlive = true;
        })
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