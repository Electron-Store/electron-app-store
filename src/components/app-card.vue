<template>
  <div
    @click="selectApp(app.id)"
    class="app-card pa10 flex gap10 center-v ma10 round20 animate fadeInUp"
  >
    <img :src="app.logo" class="app_logo" />
    <div class="card_content flex_between flex-col">
      <h5>{{ app.name }}</h5>
      <p>{{ app.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["selectApp"]),
  },
  props: {
    app: Object,
  },
};
</script>

<style lang="scss">
.app-card {
  cursor: pointer;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  &:hover {
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.137);
    img {
      transform: scale(1.1);
      border-radius: 10px;
    }
  }
  img {
    height: 50px;
    margin: 5px;
    transition: 0.2s ease-in-out;
  }
  h5 {
    font-size: 1.3rem;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>