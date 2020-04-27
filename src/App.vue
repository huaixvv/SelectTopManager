<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Login from './views/login/Login'

export default {
  name: 'App',
  
  components: {
    Login,
  }
}
</script>

<style>
  @import url("./assets/css/reset.css");
</style>
