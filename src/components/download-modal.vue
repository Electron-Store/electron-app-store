<template>
  <div
    class="modal dl_modal pos-abs bottom0 left0 w-100 h-100"
    @click="closeModal($event)"
  >
<!--   <div class="blurred_bg blur20 pos-fix top0 left0 w-100 h-100 unclickable"></div> -->
    <div class="dl w-40 animate fadeInUp fast w-100">
      <h3 class="text-align-center pos-sticky top0 pa10">Select File</h3>
      <div class="flex flex-col w-100 pa10">
        <button
          v-for="file in releaseFiles"
          :key="file.name"
          id="instal_bt"
          class="pt5 pb5 pl10 pr10 mb5 round5"
          @click="addToDownloadField(file)"
        >
          <h4>{{ file.name }}</h4>
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

<style lang="scss">
.dl_modal {
  z-index: 4;
display:flex;
flex-direction:column;
 justify-content:flex-end;
 align-items:flex-end;
background:rgba(0, 0, 0, 0.253);
	border-radius:20px;

}
.dl {
  background: var(--primaryColor);
    box-shadow:0px 0px 8px rgba(0, 0, 0, 0.253);
	overflow:hidden;
	overflow-y:scroll;
	border-radius:20px;
	max-height:80%;
	h3{
	   	background: var(--primaryColor);
		box-shadow:0px 0px 8px rgba(0, 0, 0, 0.253);
	}
}
</style>
