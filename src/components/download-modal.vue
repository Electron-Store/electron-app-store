<template>
  <div
    class="modal pos-fix top0 left0 w-100 h-100 flex center-a"
    @click="closeModal($event)"
  >
    <div class="dl pa10 round10 w-40 animate fadeInUp fast">
      <h3 class="text-align-center mb10">Select File</h3>
      <div class="flex flex-col">
        <button
          v-for="file in releaseFiles"
          :key="file.name"
          id="instal_bt"
          class="pt5 pb5 pl10 pr10 mb5"
          @click="addToDownloadField(file)"
        >
          <h3>{{ file.name }}</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["showDownloadWidget"]),
    releaseFiles() {
      const regex = /\.exe|\.appimage|\.dmg|\.deb|\.rpm|\.zip|\.snap/i;
      return this.files.filter(
        (file) => regex.test(file.name) && !file.name.includes("blockmap")
      );
    },
  },
  props: {
    files: Array,
  },
  methods: {
    ...mapMutations(["addToDownloads", "toggleDownloadWidget"]),
    closeModal(e) {
      if (e.target.classList.contains("modal")) {
        this.$emit("closeModal");
      }
    },
    addToDownloadField(file) {
      const newDownload = {
        id: Date(),
        url: file.src,
        name: file.name,
        percent: 0,
        fileSize: "0mb",
        state: "Starting",
      };
      this.addToDownloads(newDownload);
      ipcRenderer.send("downloadFile", newDownload);
      this.$emit("closeModal");
      if (!this.showDownloadWidget) {
        this.toggleDownloadWidget();
      }
    },
  },
};
</script>

<style>
.modal {
  z-index: 4;
  background: rgba(17, 17, 17, 0.664);
}
.dl {
  background: var(--primaryColor);
}
</style>