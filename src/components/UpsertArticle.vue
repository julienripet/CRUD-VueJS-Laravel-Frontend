<template>

</template>

<script>
export default {
  name: "UpsertArticle",
  data () {
    return {

    }
  },
  props: {
    newArticle: {
      type: Boolean,
      required: true
    },
    article: {
      type: Object,
      default () {
        return {
          denomination: "",
          serial_number: "",
          archived: 0,
          repair_state: "pristine",
          type: "tooling",
        }
      }
    }

  }

}
</script>

<style>
</style>