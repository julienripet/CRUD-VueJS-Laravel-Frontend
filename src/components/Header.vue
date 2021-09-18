<template>
  <div
    id="headerRoot"
    class="
      p-d-flex
      p-jc-between
    "
  >
    <div
      id="logo"
      class="      
        p-shadow-10
        p-px-3
        p-py-1
        p-mx-sm-0
        p-mx-md-3
        p-mx-xl-6
      "
    >
      <h1>A2<span class="text-orange">SI</span></h1>
      <h3>RFID</h3>
      <p id="devise">Intégrez la <span class="text-orange"> RFID</span> dans <span class="text-orange"> vos projets</span></p>
    </div>
    <h2 class="title p-ac-stretch">CRUD - Articles</h2>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#headerRoot {
  height: 100px;
  /* background-color: lime; */
}

#logo {
  background-color: white;
  /* position: absolute;
  top: 25px; */
  border-radius: 10px;
}

#logo > * {
  font-family: var(--font-family);
  padding: 0;
  margin: 0;
}
.text-orange {
  color: var(--primary-color);
}
.title {
  font-size: 3em;
}
</style>