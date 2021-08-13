<template>
  <div class="search_page page round20">
    <div class="flex center-a w-100 pt5">
      <h3>{{ query }}: Search Results</h3>
    </div>
    <div class="page_body scroll_y w-100">
      <div class="flex_auto">
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
  },
  components: { AppCard },
  mounted() {
    this.query = document.querySelector("#search").value;
    document.querySelector("#search").value = "";
  },
};
</script>

<style lang="scss">
.search_page {
  background: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.253);
}
</style>