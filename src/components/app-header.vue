<template>
  <header
    :class="[
      showDownloadWidget ? 'shrink_container' : '',
      'flex_between center-v pos-abs',
    ]"
  >
    <button id="back_bt" @click="goBack">
      <img
        v-if="$route.name != 'explore'"
        src="@/assets/images/arrow-left-circle.svg"
        alt="back icon"
        class="icon"
      />
      <img v-else src="@/assets/images/home.svg" class="icon" alt="home icon" />
    </button>
    <div class="searchBox pos-rel">
      <input
        v-model="query"
        type="text"
        class="pr5"
        v-on:keyup.enter="searchApp(query)"
        placeholder="Search"
        id="search"
      />
      <img
        class="abs-center-y left5 unclickable icon"
        src="@/assets/images/search.svg"
        alt="search icon"
      />
    </div>
    <button
      :class="[showDownloadWidget ? 'selected' : '']"
      id="dls_bt"
      @click="toggleDownloadWidget"
    >
      <img
        v-if="!showDownloadWidget"
        src="@/assets/images/download.svg"
        alt="back icon"
        class="icon"
      />
      <img v-else src="@/assets/images/x.svg" alt="back icon" />
    </button>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      query: "",
    };
  },
  computed: {
    ...mapState(["showDownloadWidget"]),
  },
  methods: {
    ...mapMutations(["searchApp", "toggleDownloadWidget"]),
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
header:is(.shrink_container){
      border-radius: 10px 10px 10px 10px;
    button:{
    border-radius:20px !important;
    opacity:0;;
    }
}
header {
  background: var(--primaryColor);
  width: 94.3%;
  overflow: hidden;
  border-radius: 10px 10px 0px 0px;
  left: 73px;
  z-index: 10;
  top: 35px;
  transition: 0.2s ease-in-out;
  button {
    background: var(--primaryColor);
    cursor: pointer;
    padding: 5px 8px;
    &:hover:not(.selected) {
      background: var(--hoverColor);
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
    background: var(--hoverColor);
    padding-top: 5px;
    padding-bottom: 5px;
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
.shrink_container{
#dls_bt{
border-radius:10px;
}
}
</style>
