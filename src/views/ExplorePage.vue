<template>
  <div class="category_page page">
    <div class="page_sliver no_scroll pos-rel">
      <img
        src="https://pxfnmafyqvdhzxosxcqw.supabase.in/storage/v1/object/public/images/illustrations/productivity.png"
        class="pos-abs top0 left0 w-100"
        id="sliver_bg"
      />
      <div class="sliver_title pos-abs bottom0 pa10 w-100">
        <h2>Explore</h2>
      </div>
    </div>
    <div class="page_body scroll_y">
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
      feeds: (state) => state.exploreFeed,
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