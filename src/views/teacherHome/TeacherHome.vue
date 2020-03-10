<template>
  <div>
    <top-nav></top-nav>
    <Menu></Menu>
    <router-view/> 
  </div>
</template>

<script>
  import TopNav from 'components/topNav/TopNav';
  import Menu from './Menu';
  import TopicTable from './TopicTable'
  export default {
    name: 'TeacherHome',
    data () {
      return {
      }
    },
    components: {
      TopNav,
      Menu,
      TopicTable
    }
  }
</script>

<style scoped>
 /* .topic-table{
   float: right;
 } */
</style>