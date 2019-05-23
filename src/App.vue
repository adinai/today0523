<template>
  <div id="app">
    <Activity/>
  </div>
</template>

<script>
import Activity from './components/Activity.vue'

export default {
  name: 'app',
  components: {
    Activity
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
