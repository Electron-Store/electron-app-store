<template>
  <div class="download_widget round20 scroll_y">
    <div class="widget_title pos-sticky top0 pa5">
      <h3 class="text-align-center">Downloads</h3>
    </div>
    <div class="dls pa10">
      <download-card
        v-for="download in downloads"
        :key="download.id"
        :download="download"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import downloadCard from "./downloadCard.vue";
export default {
  components: { downloadCard },
  props: {},
  computed: {
    ...mapState(["downloads"]),
  },
  methods: {
    ...mapMutations(["updateDownload"]),
  },
};
</script>

<style lang="scss">
.download_widget {
  position: fixed;
  top: 40px;
  right: 10px;
  height: 93vh;
  width: 300px;
  background: var(--primaryColor);
  z-index: 4;
  transition: 0.2s ease-in-out;
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.253);
  .widget_title {
    background: var(--primaryColor);
  }
}
</style>
