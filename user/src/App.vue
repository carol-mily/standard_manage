<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
html,body{
  margin:0;
  padding: 0;
}
#app {
  height: 100vh;
  position: fixed;
  display: flex;
  min-width: 100%;
  background-color: #F7F8F9;
}
</style>
