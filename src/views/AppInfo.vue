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
        <p v-else>Download from Website</p>
      </div>
    </div>
    <div class="app_info w-100 pos-rel">
      <div class="tab_switcher pos-abs bottom10 left10">
        <button
          v-if="app.readme"
          @click="loadReadMe"
          :class="[!showWebsite ? 'selected' : '', 'pa10']"
        >
          <p>ReadMe</p>
        </button>
        <button
          v-if="website"
          @click="loadWebsite"
          :class="[showWebsite ? 'selected' : '', 'pa10']"
        >
          <p>Website</p>
        </button>
      </div>
      <div v-if="!showWebsite" class="app_readme h-100 scroll_y round15 w-100">
        <div v-html="app.readme"></div>
      </div>
      <div v-if="showWebsite" class="app_website w-100 h-100 pa10">
        <div class="flex center-a">
          <!-- <button @click="goBack" title="Go back" class="website_navigator">
            <img
              src="@/assets/images/arrow-left.svg"
              alt="back icon"
              class="icon"
            />
          </button> -->
          <h3 class="text-align-center mb5">Website</h3>
          <!-- <button
            @click="goForward"
            title="Go Forward"
            class="pa5 website_navigator"
          >
            <img
              src="@/assets/images/arrow-right.svg"
              alt="forward icon"
              class="icon"
            />
          </button> -->
        </div>
        <webview class="w-100 h-100 round20 no_scroll" :src="website" />
        <p v-if="webviewIsLoading" class="pa10">Loading App Website...</p>
      </div>
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
    website() {
      const url = this.app.meta.filter((meta) => meta.title === "Website")[0]
        ?.data || null;
      console.log(url);
      return url;
    },
  },
  data() {
    return {
      releaseInfo: null,
      webviewIsLoading: true,
      showWebsite: false,
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
    goBack() {
      const webview = document.querySelector("webview");
      webview.goBack();
    },
    goForward() {
      const webview = document.querySelector("webview");
      webview.goForward();
    },
    setupWebview() {
      const webview = document.querySelector("webview");
      webview.addEventListener("did-finish-load", () => {
        this.webviewIsLoading = false;
      });
    },
    loadWebsite() {
      this.showWebsite = true;
      setTimeout(() => {
        this.setupWebview();
      }, 0);
    },
    loadReadMe() {
      this.showWebsite = false;
      this.fixLinks();
    },
  },
  mounted() {
    if (this.app.readme) {
      this.loadReadMe();
    } else {
      this.loadWebsite();
    }
  },
};
</script>

<style lang="scss">
.app_page {
  overflow: hidden;
}
.app_details {
  min-width: 30%;
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
  padding: 20px;
  margin-left: 5px;
  background: var(--primaryColor);
}
.app_website {
  .website_navigator {
    padding: 2px;
    border-radius: 10px;
    img {
      width: 18px;
    }
  }
}
.tab_switcher {
  background: var(--primaryColor);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.425);
  border-radius: 10px;
  overflow: hidden;
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
