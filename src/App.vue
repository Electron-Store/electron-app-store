<template>
  <div id="app">
    <loading v-if="loading" />
    <base-menu />
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import BaseMenu from "./components/base-menu.vue";
import Loading from "./components/loading.vue";
export default {
  components: { BaseMenu, Loading },
  computed: {
    ...mapState(["loading"]),
  },
};
</script>
<style lang="scss">
@import url("./assets/styles/utilityClasses.css");
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

::-webkit-scrollbar {
  background: rgba(0, 0, 0, 0);
  width: 0px;
  height: 6px;
}
::-webkit-scrollbar-track-piece {
  background: #ededed;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.384);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
  outline: none;
  border: none;
}
body {
  background: #ededed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
