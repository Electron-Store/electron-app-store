<template>
  <div class="page app_page flex">
    <download-modal
      v-if="releaseInfo"
      v-on:closeModal="releaseInfo = null"
      :files="releaseInfo.files"
    />
    <div
      class="
        app_details
        pa10
        h-100
        flex_between flex-col
        pos-rel
        h-100
        scroll_y
      "
    >
      <div class="flex flex-col center-a gap20 mb10">
        <img :src="app.logo" />
        <h1>{{ app.name }}</h1>
        <p class="text-align-center">
          {{ app.description }}
        </p>
      </div>
      <div class="metas">
        <div v-for="meta in app.meta" :key="meta.title" class="app_meta ma10">
          <p>
            <strong class="mb5"> {{ meta.title }} </strong>
          </p>
          <a
            v-if="meta.data.includes('https')"
            target="_blank"
            :href="meta.data"
            >{{ meta.data }}</a
          >
          <p v-else>{{ meta.data }}</p>
        </div>
      </div>
      <div class="pos-abs left0 bottom0 w-100 flex center-a pa10 dl_container">
        <button
          v-if="app.latestRelease"
          id="instal_bt"
          @click="releaseInfo = app.latestRelease"
          class="pt10 pb10 w-80 round20"
        >
          <h3>Download</h3>
        </button>
        <p v-else>No Download Files Available</p>
      </div>
    </div>

    <div v-if="app.readme" class="app_readme h-100 scroll_y round15">
      <div v-html="app.readme"></div>
    </div>
    <webview class="w-100" v-else :src="website" />
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
    website() {
      const url = this.app.meta.filter((meta) => meta.title === "Website")[0]
        .data;
      console.log(url);
      return url;
    },
  },
  data() {
    return {
      releaseInfo: null,
    };
  },
  methods: {
    fixLinks() {
      const readMe = document.querySelector(".app_readme");
      if (readMe) {
        const linkTags = readMe.querySelectorAll("a") || [];

        linkTags.forEach((link) => {
          link.setAttribute("target", "_blank");
        });
      }
    },
  },
  mounted() {
    this.fixLinks();
  },
};
</script>

<style lang="scss">
.app_page {
  overflow: hidden;
}
.app_details {
  width: 30%;
  background: var(--primaryColor);
  padding-bottom: 80px;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.137);
  height: 91vh;

  img {
    width: 70px;
  }
  .dl_container {
    background: #dbf2ff;
  }
}
.app_readme {
  width: 69.5%;
  padding: 20px;
  margin-left: 5px;
  background: var(--primaryColor);
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
