<template>
  <div id="menu" class="scroll_y">
    <ul id="categories_list" class="scroll_y pos-rel">
      <li
        :class="[$route.name == 'explore' ? 'selected' : '', 'flex gap10 pa10']"
        @click="$router.push('/')"
      >
        <img src="@/assets/images/home.svg" alt="home icon" />
        <p>Explore</p>
      </li>
      <div id="c_title_area" class="flex pos-sticky top0 left0 w-100 pa10">
        <h4>Categories</h4>
      </div>
      <li
        :class="[
          selectedCategory === category.name && $route.name != 'explore'
            ? 'selected'
            : '',
          'flex gap10 pa10',
        ]"
        v-for="category in categories"
        :key="category.name"
        @click="fetchCategory(category.name)"
      >
        <img :src="category.icon" alt="" />
        <p>{{ category.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { createRequest } from "@/utils/utils.js";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    ...mapState({
      selectedCategory: (state) => state.selectedCategory.name,
    }),
  },
  methods: {
    ...mapMutations(["selectCategory"]),
    async fetchCategoryList() {
      this.categories = await createRequest("get-category-list");
      localStorage.setItem("category-list", JSON.stringify(this.categories));
    },
    fetchCategory(name) {
      if (localStorage.getItem("category-list")) {
        this.categories = JSON.parse(localStorage.getItem("category-list"));
      }
      this.selectCategory(name);
    },
  },
  mounted() {
    this.fetchCategoryList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#menu {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 40px;
  background: white;
  z-index: 4;
  transition: 0.2s ease-in-out;
  &:hover {
    width: 190px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.253);
    #c_title_area {
      opacity: 1;
    }
    #categories_list {
      width: 100%;
    }
  }
  ul {
    list-style-type: none;
  }
  li {
    width: 190px;
    cursor: pointer;
    &:hover:not(.selected) {
      background: rgb(233, 233, 233);
    }
    img {
      width: 20px;
    }
  }
  .selected {
    background: #22aeff9d;
  }
  ::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0);
    width: 2px;
    height: 6px;
  }
  ::-webkit-scrollbar-track-piece {
    background: #ededed;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.384);
  }
}
#categories_list {
  height: 85%;
  width: 105%;
}
#c_title_area {
  background: white;
  opacity: 0;
  // box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.089);
}
</style>
