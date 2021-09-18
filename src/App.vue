<template>
  <div id="approot">
    <Header />
    <ListArticles />
  </div>
</template>

<script>
import ListArticles from "./components/ListArticles.vue"
import Header from "./components/Header.vue"


export default {
  name: 'App',
  components: {
    ListArticles,
    Header
  },
  created () {

  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: var(--primary-color);
}

#approot {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
