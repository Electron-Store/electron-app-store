<template>
  <div class="Settings page">
    <div class="w-100 flex center-a ">
      <h2>Settings</h2>
    </div>
    <div class="grid4 align-top w-100 h-100">
      <div class="flex flex-col">
        <div class="setting_box center-v flex flex_between pa10 border_split">
          <strong>Dark Mode</strong>
          <base-toggle :checked="settings.darkMode" @change="changeTheme" />
        </div>
        <div class="setting_box border_split">
          <strong class="mb5">Downloads Folder</strong>
          <div class="flex center-v flex_between">
            <p :title="settings.saveFolder" class="text-ellipse w-70">
              {{ settings.saveFolder }}
            </p>
            <base-button
              @click="showFolderDialog"
              style="width: 25%"
              text="Change"
            />
          </div>
        </div>
        <div class="setting_box flex flex_between">
          <strong>Version</strong>
          <p>{{ appVersion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapMutations, mapState } from "vuex";
import BaseButton from "../components/base/base-button.vue";
import baseToggle from "../components/base/base-toggle.vue";
export default {
  data() {
    return {
      appVersion: "x.x.x",
    };
  },
  computed: {
    ...mapState(["settings"]),
  },
  components: { baseToggle, BaseButton },
  methods: {
    ...mapMutations(["updateSetting"]),
    changeTheme(value) {
      ipcRenderer.send("setSetting", ["darkMode", value]);
      this.updateSetting(["darkMode", value]);
    },
    showFolderDialog() {
      ipcRenderer.send("showFolderDialog");
    },
  },
  mounted() {
    ipcRenderer
      .invoke("getAppVersion")
      .then((version) => {
        this.appVersion = version;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.Settings{
  	padding-top:30px;
}
.setting_box {
  margin: 10px;
  padding: 10px;
  max-width: 100%;

}
</style>
