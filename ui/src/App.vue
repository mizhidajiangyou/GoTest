<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <RunBash msg="run bash"/>
</template>

<script>
import RunBash from './view/RunBash'

export default {
  name: 'App',
  components: {
    RunBash
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
