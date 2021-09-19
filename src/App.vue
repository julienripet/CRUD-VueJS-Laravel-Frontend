<template>
  <div id="approot">
    <Header />
    <ListArticles
      :toggleUpsert="toggleUpsert"
      :setArticle="setArticle"
      ref="listArticles"
    />
    <UpsertArticle
      @reload-articles="sendReload"
      :open="openUpsert"
      :toggleOpen="toggleUpsert"
      :editingArticle="article"
      :newArticle="newArticle"
    />
  </div>
</template>

<script>
import ListArticles from "./components/ListArticles.vue"
import Header from "./components/Header.vue"
import UpsertArticle from "./components/UpsertArticle.vue"


export default {
  name: 'App',
  components: {
    ListArticles,
    Header,
    UpsertArticle
  },
  data () {
    return {
      openUpsert: false,
      article: null,
      newArticle: false,

    }
  },
  created () {

  },
  methods: {
    sendReload () {
      this.$refs.listArticles.getAllArticles()
    },
    toggleUpsert (state = null) { // Fonction pour activer/désactiver la popup Upsert
      this.openUpsert = state === null ? !this.openUpsert : state // Si on lui passe un state, force ce state, sinon, passe à l'état inverse
    },
    setArticle (article) { // Fonction pour set l'article à modifier
      if (article?.id) {
        this.article = article // Si on a u article, on update le state
        this.newArticle = false
      } else {
        this.article = null // Si il n'y en a pas, set a null
        this.newArticle = true // Et set le flag de création à vrai
      }
    }

  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: var(--primary-color);
  background-image: url("https://www.a2si.net/wp-content/uploads/2020/03/25098bis-1.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

#approot {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
