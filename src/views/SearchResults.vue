<template>
  <div
      :class="[
      shrinkContainer ? 'shrink_container' : '',
      'page search_page',
    ]"
  >
    <div class="flex center-a w-100 pt5">
      <h3>{{ query }}: Search Results</h3>
    </div>
    <div class="page_body scroll_y h-100 w-100">
      <div class="flex_auto center-a scroll_y h-90">
        <app-card v-for="app in searchResults" :app="app" :key="app.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppCard from "../components/app-card.vue";
export default {
  name: "Category",
  data() {
    return {
      query: "",
    };
  },
  computed: {
    ...mapState({
      searchResults: (state) => state.searchResults,
    }),
        ...mapState({
      category: (state) => state.selectedCategory,
      shrinkContainer: (state) => state.showDownloadWidget,
    }),
  },
  components: { AppCard },
  mounted() {
    this.query = document.querySelector("#search").value;
    document.querySelector("#search").value = "";
  },
};
</script>

<style lang="scss">
.search_page{
	padding-top:30px;
}
</style>
