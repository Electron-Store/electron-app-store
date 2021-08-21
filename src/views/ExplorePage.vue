<template>
  <div
    :class="[
      shrinkContainer ? 'shrink_container' : '',
      'category_page page scroll_y pos-rel',
    ]"
  >
    <div class="image_sliver left0 w-100 pos-sticky">
      <img
        src="https://pxfnmafyqvdhzxosxcqw.supabase.in/storage/v1/object/public/images/illustrations/explore-min.jpg"
        class="pos-abs w-100 top0 left0"
        id="sliver_bg"
      />
      <div class="sliver_title pos-abs bottom0 pa10 w-100">
        <h2>Explore</h2>
      </div>
    </div>
    <div class="page_body">
      <div class="feed_box mt10" v-for="feed in feeds" :key="feed.title">
        <h2 class="ml10">{{ feed.title }}</h2>
        <div class="flex_auto">
          <app-card v-for="app in feed.apps" :app="app" :key="app.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppCard from "../components/app-card.vue";
export default {
  name: "Category",
  computed: {
    ...mapState({
      feeds: (state) =>
        state.exploreFeed.sort((a, b) =>
          a.apps.length < b.apps.length ? 1 : -1
        ),
      shrinkContainer: (state) => state.showDownloadWidget,
    }),
  },
  methods: {
    ...mapMutations(["getExploreFeed"]),
  },
  components: { AppCard },
  mounted() {
    this.getExploreFeed();
    console.log("exploring");
  },
};
</script>

<style lang="scss">
.feed_box {
  h2 {
    font-size: 1.6rem;
  }
}
</style>