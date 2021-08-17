<template>
  <div class="page app_page flex">
    <download-modal
      v-if="releaseInfo"
      v-on:closeModal="releaseInfo = null"
      :files="releaseInfo.files"
    />
    <div class="app_details pa10 h-100 round15 flex_between flex-col">
      <div class="flex flex-col center-a gap20 mb10">
        <img :src="app.icon" />
        <h1>{{ app.name }}</h1>
        <p class="text-align-center">
          {{ app.description }}
        </p>
      </div>
      <div class="flex center-a">
        <button
          v-if="app.latestRelease"
          id="instal_bt"
          @click="releaseInfo = app.latestRelease"
          class="pt10 pb10 w-90 round20"
        >
          <h3>Download</h3>
        </button>
      </div>
      <div class="metas">
        <div v-for="meta in app.meta" :key="meta.title" class="app_meta ma10">
          <strong class="mb5"> {{ meta.title }} </strong>
          <p>{{ meta.data }}</p>
        </div>
      </div>
    </div>

    <div class="app_readme h-100 scroll_y round15">
      <div v-html="app.readme"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import downloadModal from "../components/download-modal.vue";
export default {
  components: { downloadModal },
  computed: {
    ...mapState({
      app: (state) => state.selectedApp,
    }),
  },
  data() {
    return {
      releaseInfo: null,
    };
  },
};
</script>

<style lang="scss">
.app_details {
  width: 30%;
  background: white;
  img {
    width: 70px;
  }
}
.app_readme {
  width: 69.5%;
  padding: 20px;
  margin-left: 5px;
  background: white;
}
#instal_bt {
  background: #22afff;
  cursor: pointer;
  color: white;
  h3 {
    font-size: 1.1rem;
  }
}
</style>
