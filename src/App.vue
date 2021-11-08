<template>
  <div :class="[settings.darkMode ? 'darkMode' : '', 'app']" id="app">
    <loading v-if="loading" />
    <app-header />
    <base-menu />
    <splash v-if="showSplash" />
    <transition
      enter-active-class="animate slideInUp"
      leave-active-class="animate slideOutUp"
    >
      <router-view />
    </transition>
    <transition
      enter-active-class="animate slideInRight faster"
      leave-active-class="animate slideOutRight faster"
    >
      <download-widget v-if="showDownloadWidget" />
    </transition>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
import { mapMutations, mapState } from "vuex";
import AppHeader from "./components/app-header.vue";
import BaseMenu from "./components/base-menu.vue";
import DownloadWidget from "./components/downloadWidget.vue";
import Loading from "./components/loading.vue";
import Splash from "./components/splash.vue";
export default {
  data() {
    return {
      showSplash: true,
    };
  },
  components: { BaseMenu, Loading, AppHeader, Splash, DownloadWidget},
  computed: {
    ...mapState(["loading", "showDownloadWidget", "settings"]),
  },
  methods: {
    ...mapMutations([
      "updateDownload",
      "updateDownloadState",
      "setSettings",
      "updateSetting",
      "restoreDownloadsData",
      "addToDownloads",
      "toggleDownloadWidget",
    ]),
  },
  mounted() {
    setTimeout(() => {
      this.showSplash = false;
    }, 4000);
    ipcRenderer.on("updateDownload", (e, payload) => {
      this.updateDownload(payload);
    });
    ipcRenderer.on("updateDownloadState", (e, payload) => {
      this.updateDownloadState(payload);
    });
    ipcRenderer.on("updateSetting", (e, payload) => {
      this.updateSetting(payload);
    });
    ipcRenderer.invoke("sendSettings").then((settings) => {
      this.setSettings(settings);
    });
    ipcRenderer.on("newWebsiteDownload", (e, payload) => {
      this.addToDownloads(payload);
      this.toggleDownloadWidget("Open");
    });
    const downloads = localStorage.getItem("downloads")
      ? JSON.parse(localStorage.getItem("downloads"))
      : [];
    this.restoreDownloadsData(downloads);
  },
};
</script>
<style lang="scss">
@import url("./assets/styles/utilityClasses.css");
@import url("./assets/styles/animate.css");
@import url("./assets/styles/component.css");
@import url("./assets/styles/global.css");
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
  display: flex;
  flex-direction: row-reverse;
  padding-right: 10px;
  padding-top: 45px;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
