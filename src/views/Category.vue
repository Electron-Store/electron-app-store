<template>
  <div
    :class="[
      shrinkContainer ? 'shrink_container' : '',
      'category_page page scroll_y pos-rel',
    ]"
  >
    <div class="image_sliver left0 w-100 pos-sticky">
      <img
        :src="category.illustration"
        class="pos-abs w-100 top0 left0"
        id="sliver_bg"
      />
      <div class="sliver_title pos-abs bottom0 pa10 w-100">
        <h2>{{ category.name }}</h2>
      </div>
    </div>
    <div class="page_body">
      <div class="flex_auto">
        <app-card v-for="app in category.apps" :app="app" :key="app.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppCard from "../components/app-card.vue";
export default {
  name: "Category",
  computed: {
    ...mapState({
      category: (state) => state.selectedCategory,
      shrinkContainer: (state) => state.showDownloadWidget,
    }),
  },
  components: { AppCard },
};
</script>

<style lang="scss">
.shrink_container {
  width: 73% !important;
}
.page {
  width: 94.3%;
  height: 93vh;
  position: absolute;
  left: 73px;
  background: var(--primaryColor);
  transition: 0.2s ease-in-out;
  border-radius: 15px;
  	//padding-top:30px;
  // box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.253);
}
.page_sliver {
  height: 40%;
  h2 {
    color: white;
    font-size: 2rem;
  }
}
.image_sliver {
  z-index: 1;
  top: -185px;
  height: 250px;
  overflow: hidden;
  img {
    transform: translateY(-30%);
  }
  // margin-bottom: -640px;
}
.page_body {
  // height: 53%;
}
.sliver_title {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.212));
  h2 {
    color: white;
  }
}
</style>
