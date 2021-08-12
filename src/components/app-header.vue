<template>
  <header class="flex_between mb5 center-v">
    <button id="back_bt" @click="goBack">
      <img
        v-if="$route.name != 'explore'"
        src="@/assets/images/arrow-left-circle.svg"
        alt="back icon"
      />
      <img v-else src="@/assets/images/home.svg" alt="home icon" />
    </button>
    <div class="searchBox pos-rel">
      <input
        v-model="query"
        type="text"
        class="pr5 round10"
        v-on:keyup.enter="searchApp(query)"
        placeholder="Search"
        id="search"
      />
      <img
        class="abs-center-y left5 unclickable"
        src="@/assets/images/search.svg"
        alt="search icon"
      />
    </div>
    <button id="dls_bt">
      <img src="@/assets/images/download.svg" alt="back icon" />
    </button>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    ...mapMutations(["searchApp"]),
    goBack() {
      this.$router.back();
    },
  },
  mounted() {
    console.log(this.$route.name);
  },
};
</script>

<style lang="scss">
header {
  background: white;
  width: 99.5%;
  overflow: hidden;
  border-radius: 0px 0px 10px 10px;
  button {
    background: white;
    cursor: pointer;
    padding: 5px 8px;
    &:hover {
      background: rgb(240, 240, 240);
    }
    img {
      width: 20px;
    }
  }
}
.searchBox {
  width: 300px;
  input {
    width: 100%;
    background: rgb(245, 245, 245);
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 30px;
    opacity: 0.8;
    font-size: 1rem;
    &:focus {
      opacity: 1;
    }
    &:focus + img {
      opacity: 0.8;
    }
  }
  img {
    width: 19px;
    opacity: 0.5;
  }
}
</style>