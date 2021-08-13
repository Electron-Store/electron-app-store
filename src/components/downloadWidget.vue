<template>
  <div class="download_widget pa10">
    <h3 class="text-align-center mb10">Downloads</h3>
    <div class="dls">
      <div class="dl_card flex pos-rel round10 no_scroll">
        <div class="file_type pa10 flex center-a">
          <h5>A</h5>
        </div>
        <div class="card_body h-100 pa5 flex flex-col flex_between">
          <strong>File Name</strong>
          <p>10% of 85mb</p>
        </div>
        <div class="progress_wrapper h-100 pos-abs right0 flex center-a">
          <div class="progress"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  methods: {
    cancelDownload() {},
    retryDownload() {},
    removeFromQueue() {},
  },
  mounted() {},
};
</script>

<style lang="scss">
.download_widget {
  position: fixed;
  top: 5px;
  border-radius: 12px;
  right: 10px;
  height: 97.5vh;
  width: 300px;
  background: white;
  z-index: 4;
  transition: 0.2s ease-in-out;
  box-shadow: -4px 4px 8px rgba(0, 0, 0, 0.253);
}
.dl_card {
  height: 60px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.123);
  .file_type {
    background: black;
    margin: 5px;
    margin-right: 0px;
    border-radius: 10px;
    h5 {
      font-size: 2rem;
      color: white;
    }
  }
}
.progress_wrapper {
  width: 15px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  .progress {
    background: black;
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
}
</style>