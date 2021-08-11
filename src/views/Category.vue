<template>
  <div class="category_page page">
    <div class="page_sliver no_scroll pos-rel">
      <img
        src="https://pxfnmafyqvdhzxosxcqw.supabase.in/storage/v1/object/public/images/illustrations/productivity.png"
        class="pos-abs top0 left0 w-100"
        id="sliver_bg"
      />
      <div class="sliver_title pos-abs bottom0 pa10 w-100">
        <h2>{{ category.name }}</h2>
      </div>
    </div>
    <div class="page_body scroll_y">
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
    }),
  },
  components: { AppCard },
};
</script>

<style lang="scss">
.page {
  width: 96.5%;
  margin-left: 45px;
  height: 100vh;
}
.category_page {
  height: 100vh;
}
.page_sliver {
  height: 30%;
  #sliver_bg {
    z-index: -1;
  }
  h2 {
    color: white;
    font-size: 2rem;
  }
}
.page_body {
  height: 70%;
  background: white;
}
.sliver_title {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.479));
}
</style>