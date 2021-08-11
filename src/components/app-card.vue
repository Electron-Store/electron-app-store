<template>
  <div
    @click="selectApp(app.id)"
    class="app-card pa10 flex gap10 center-v ma10"
  >
    <img :src="app.logo" />
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
  width: 307px;
  overflow: hidden;
  &:hover {
    background: rgb(233, 233, 233);
  }
  img {
    height: 50px;
  }
  h5 {
    font-size: 1.3rem;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>