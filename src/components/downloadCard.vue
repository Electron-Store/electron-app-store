<template>
  <div
    :class="[
      download.state == 'Canceled' ? 'dl_canceled' : '',
      'dl_card flex flex-col pos-rel round20 center-v',
    ]"
  >
    <div class="progress pos-abs bottom0 left10"></div>
    <div class="flex w-100 pl5 pt5">
      <div class="file_type pa10 flex center-a">
        <h5>{{ download.name.charAt(0) }}</h5>
      </div>
      <div class="card_body h-100 pa5 flex flex-col flex_between">
        <strong class="text-ellipse w-90">{{ download.name }}</strong>
        <p>{{ download.percent }}% of {{ download.fileSize }}mb</p>
      </div>
    </div>
    <div class="card_actions round10 flex center-a">
      <button v-if="download.state === 'Downloading'" @click="pause">
        <img src="@/assets/images/pause.svg" alt="" />
      </button>
      <button @click="resume" v-if="download.state === 'Paused'">
        <img src="@/assets/images/play.svg" alt="" />
      </button>
      <button @click="cancel" v-if="download.state === 'Downloading'">
        <img src="@/assets/images/x.svg" alt="" />
      </button>
      <button @click="retry" v-if="download.state === 'Canceled'">
        <img src="@/assets/images/retry.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  methods: {
    pause() {
      ipcRenderer.send("pause", this.download.id);
    },
    cancel() {
      ipcRenderer.send("cancel", this.download.id);
    },
    resume() {
      ipcRenderer.send("resume", this.download.id);
    },
    retry() {
      ipcRenderer.send("retry", this.download.id);
    },
  },
  props: {
    download: Object,
  },
};
</script>

<style lang="scss">
.dl_canceled {
  strong,
  p {
    text-decoration: line-through;
    opacity: 0.5;
  }
}
.dl_card {
  height: 80px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.123);
  gap: 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    .card_actions {
      transform: translate(0%, 70%);
      opacity: 1;
    }
  }
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
.progress {
  background: black;
  border-radius: 10px;
  width: 0%;
  height: 10px;
  transform: translateY(50%);
}

.card_actions {
  background: white;
  box-shadow: 2px -2px 10px rgba(0, 0, 0, 0.123);
  position: absolute;
  bottom: 0%;
  right: 10px;
  overflow: hidden;
  transform: translate(0%, 100%);
  opacity: 0;
  transition: 0.3s ease-in-out;
  button {
    background: none;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background: gainsboro;
    }
    img {
      width: 20px;
    }
  }
}
</style>