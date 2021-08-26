<template>
  <div class="page app_page flex">

    <div
      class="
        app_details
        pa10
        h-100
        flex_between flex-col
        pos-rel
        h-100
        scroll_y
        round20
      "
    >
      <div class="flex flex-col center-a gap20 mb10">
        <img :src="app.logo" />
        <h1>{{ app.name }}</h1>
        <p class="text-align-center">
          {{ app.description }}
        </p>
      </div>
      <div class="metas scroll_y">
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
      <transition enter-active-class="animate slideInUp fast" leave-active-class="animate slideOutDown fast">
          <download-modal
      v-if="releaseInfo"
      v-on:closeModal="releaseInfo = null"
      :files="releaseInfo.files"
    />
    </transition>
    </div>
    <div class="app_info w-100 pos-rel">
      <div class="tab_switcher pos-abs bottom0">
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
      	<transition enter-active-class="animate slideInLeft fast" leave-active-class="animate slideOutLeft fast">
      <div v-if="!showWebsite" class="app_readme scroll_y round15 w-100">
        <div v-html="app.readme"></div>
      </div>
      </transition>
	<transition enter-active-class="animate slideInLeft fast" leave-active-class="animate slideOutRight fast">
      <div v-if="showWebsite" class="app_website w-100 pa10">
        <webview
          class="w-100 round20 no_scroll h-100"
          :src="website"
        />
      </div>
      </transition>
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
      const url =
        this.app.meta.filter((meta) => meta.title === "Website")[0]?.data ||
        null;
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
  padding-bottom: 60px;
  padding-top:20px;
  height: 100%;
  img {
    width: 70px;
  }
  .dl_container {
    background: #dbf2ff;
  }
}
.app_info{
	position:relative;
	overflow:hidden;
}
.app_readme {
	position:absolute;
	top:0;
	left:0;
  padding: 20px;
  margin-left: 5px;
  background: var(--primaryColor);
  height: 93%;
  width: 99%;
}
.app_website {
	position:absolute;
	top:0;
	left:0;
	  height: 93%;
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.151);
  border-radius: 15px 15px 0px 0px;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
}
#instal_bt {
  background: #22afff;
  cursor: pointer;
  color: white;
  h3 {
    font-size: 1.1rem;
  }
}
.metas {
height:60%;
}
</style>
