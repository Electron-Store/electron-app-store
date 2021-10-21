<template>
  <div
    :class="[
      download.state == 'Canceled' ? 'dl_canceled' : '',
      'dl_card flex flex-col pos-rel round20 center-v mb10',
    ]"
  >
    <div class="progress pos-abs bottom0 left10"></div>
    <div class="flex w-100 pl5 pt5">
      <div class="file_type pa10 flex center-a">
        <h5>{{ download.name.charAt(0) }}</h5>
      </div>
      <div class="card_body h-100 pa5 flex flex-col flex_between">
        <p style="width: 200px" class="text-ellipse">
          {{ download.name }}
        </p>
        <p v-if="download.percent < 100 && download.state === 'Downloading'">
          {{ download.percent }}% of {{ download.fileSize }}mb
        </p>
        <p v-else>{{ download.state }}</p>
      </div>
    </div>
    <div
      v-if="download.percent < 100"
      class="card_actions round10 flex center-a"
    >
      <button
        v-if="download.state === 'Downloading'"
        title="Pause"
        @click="pause"
      >
        <img class="icon" src="@/assets/images/pause.svg" alt="" />
      </button>
      <button @click="resume" title="Resume" v-if="download.state === 'Paused'">
        <img class="icon" src="@/assets/images/play.svg" alt="" />
      </button>
      <button
        @click="cancel"
        title="Cancel"
        v-if="download.state === 'Downloading'"
      >
        <img class="icon" src="@/assets/images/x.svg" alt="" />
      </button>
      <button title="Retry" @click="retry" v-if="download.state === 'Canceled'">
        <img class="icon" src="@/assets/images/retry.svg" alt="" />
      </button>
      <button
        title="Remove"
        @click="remove"
        v-if="download.state === 'Canceled'"
      >
        <img class="icon" src="@/assets/images/trash.svg" alt="" />
      </button>
    </div>
    <div
      class="card_actions round10 flex center-a"
      v-if="download.state === 'Completed' || download.state === 'Installed'"
    >
      <!-- <button><p>Open</p></button> -->
      <button @click="openFileLocation"><p>Open File Location</p></button>
      <!-- <button><p>Launch</p></button> -->
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["removeDownload"]),
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
    remove() {
      this.removeDownload(this.download.id);
    },
    openFileLocation() {
      ipcRenderer.send("openFileLocation", this.download.filePath);
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
    .file_type {
      filter: invert(1);
    }
    .card_actions {
      background: var(--primaryColor);
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
  background: var(--primaryColor);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.123);
  position: absolute;
  bottom: 0%;
  right: 10px;
  overflow: hidden;
  transform: translate(0%, 100%);
  opacity: 0;
  transition: 0.3s ease-in-out;
  z-index: 3;
  button {
    background: none;
    padding: 10px;
    cursor: pointer;
    background: var(--primaryColor);
    &:hover {
      background: var(--hoverColor);
    }
    img {
      width: 20px;
    }
  }
}
</style>
