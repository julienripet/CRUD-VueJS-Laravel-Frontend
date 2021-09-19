<template>
  <div
    id="headerRoot"
    class="
      p-d-flex
      p-jc-between
      p-flex-wrap
      p-my-3
      p-mx-sm-0
      p-mx-md-3
      p-mx-xl-6
    "
  >
    <div
      id="logo"
      class="      
        p-shadow-10
        p-px-3
        p-py-2
        
      "
    >
      <h1 id="company">A2<span class="text-orange">SI</span></h1>
      <h3 id="brand">RFID</h3>
      <p
        id="devise"
        class="p-py-1"
      >Intégrez la <span class="text-orange"> RFID</span> dans <span class="text-orange"> vos projets</span></p>
    </div>
    <h2 class="title p-ac-stretch p-my-2">CRUD - Articles</h2>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#headerRoot {
  min-height: 100px;
  /* background-color: lime; */
}

#logo {
  background-color: white;
  /* position: absolute;
  top: 25px; */
  border-radius: 10px;
  height: max-content;
}

#logo > * {
  font-family: var(--font-family);
  padding: 0;
  margin: 0;
  color: #5c5c5b;
}
.text-orange {
  color: var(--primary-color);
}
#company {
  font-size: 1.5em;
  text-align: end;
}

#brand {
  font-size: 0.9em;
  background-color: #5c5c5b;
  color: white;
  text-align: end;
  border-top-left-radius: 15px;
  padding: 1px 3px 1px 0px;
}

#devise {
  font-size: 0.7em;
  font-weight: 600;
}

.title {
  font-size: 3em;
}
</style>