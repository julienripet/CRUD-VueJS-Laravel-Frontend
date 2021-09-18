<template>
  <div>
    <ListArticles />
  </div>
</template>

<script>
import ListArticles from "./components/ListArticles.vue"


export default {
  name: 'App',
  components: {
    ListArticles,
  },
  created () {

  }
}
</script>

<style>
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
