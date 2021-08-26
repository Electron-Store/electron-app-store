<template>
  <div class="app_bar flex flex_between center-v w-100 pos-abs top0 left0">
    <div class="flex center-a">
      <img class="logo mr5 ml5" src="@/assets/images/logo.png" alt="" />
      <p>Electron App Store</p>
    </div>
    <div class="win_controls flex">
      <button
        @click="windowAction('minimize')"
        class="control flex center-a pa5"
      >
        <img src="@/assets/images/minimize.svg" class="icon" />
      </button>
      <button
        @click="windowAction('maximize')"
        class="control flex center-a pa5"
      >
        <img src="@/assets/images/maximize.svg" class="icon" />
      </button>
      <button @click="windowAction('x')" class="control flex center-a pa5">
        <img src="@/assets/images/x.svg" class="icon" />
      </button>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
export default {
  methods: {
    windowAction(action) {
      ipcRenderer.send("windowAction", action);
    },
  },
};
</script>
<style scoped lang="scss">
.app_bar {
  height: 30px;
  z-index: 20;
  background: var(--primaryColor);
  p {
    font-size: 0.8rem;
  }
  .logo {
    width: 15px;
  }
  .win_controls {
    button {
      img {
        width: 15px;
        margin-bottom: -2px;
      }
    }
  }
}
</style>