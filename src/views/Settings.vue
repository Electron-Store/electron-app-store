<template>
  <div class="Settings page">
    <div class="grid4 align-top w-100 h-100">
      <div class="flex flex-col">
        <div class="setting_box center-v flex flex_between pa10 border_split">
          <strong>Dark Mode</strong>
          <base-toggle />
        </div>
        <div class="setting_box border_split">
          <strong>Downloads Folder</strong>
          <div class="flex center-v flex_between">
            <p class="w-60">Dir</p>
            <base-button style="width: 25%" text="Change" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/base/base-button.vue";
import baseToggle from "../components/base/base-toggle.vue";
export default {
  components: { baseToggle, BaseButton },
};
</script>

<style>
.setting_box {
  margin: 10px;
  padding: 10px;
}
</style>