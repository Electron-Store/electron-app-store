<template>
  <div id="app">
    <loading v-if="loading" />
    <app-header />
    <base-menu />
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import AppHeader from "./components/app-header.vue";
import BaseMenu from "./components/base-menu.vue";
import Loading from "./components/loading.vue";
export default {
  components: { BaseMenu, Loading, AppHeader },
  computed: {
    ...mapState(["loading"]),
  },
  mounted() {
    this.$router.replace("/");
  },
};
</script>
<style lang="scss">
@import url("./assets/styles/utilityClasses.css");
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

::-webkit-scrollbar {
  background: rgba(0, 0, 0, 0);
  width: 0px;
}
::-webkit-scrollbar-track-piece {
  background: #ededed;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0);
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
#app {
  padding-left: 45px;
}
</style>
