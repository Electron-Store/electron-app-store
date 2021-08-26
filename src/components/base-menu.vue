<template>
  <div id="menu" class="scroll_y">
    <li
      :class="[
        $route.name == 'explore' ? 'selected' : '',
        'flex gap10 pa10 pos-abs top0 left0',
      ]"
      @click="$router.push('/')"
      id="exploreBt"
    >
      <img src="@/assets/images/home.svg" alt="home icon" />
      <p>Explore</p>
    </li>
    <ul id="categories_list" class="scroll_y pos-rel">
      <!-- <div id="c_title_area" class="flex pos-sticky top0 left0 w-100 pa10">
        <h4>Categories</h4>
      </div> -->
      <li
        :class="[
          selectedCategory === category.name && $route.name != 'explore'
            ? 'selected'
            : '',
          'flex gap10 pa10 mb10',
        ]"
        v-for="category in categories"
        :key="category.name"
        @click="fetchCategory(category.name)"
      >
        <img :src="category.icon" class="icon" alt="" />
        <p>{{ category.name }}</p>
      </li>
    </ul>
    <li
      :class="[
        $route.name == 'settingsPage' ? 'selected' : '',
        'flex pos-abs bottom0 gap10 pa10',
      ]"
      @click="$router.push('/settingsPage')"
      id="settingsBt"
    >
      <img src="@/assets/images/settings.svg" alt="home icon" />
      <p>Settings</p>
    </li>
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
      const toHide = ["Lifestyle", "Sports", "Medical", "Travel"];
      this.categories = this.categories.filter(
        (category) => !toHide.includes(category.name)
      );
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

<style  lang="scss">
#menu {
  position: fixed;
  top: 35px;
  border-radius: 10px;
  left: 5px;
  height: 94vh;
  width: 60px;
  background: var(--primaryColor);
  z-index: 40;
  transition: 0.2s ease-in-out;

  &:hover {
    width: 190px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.253);
    #c_title_area {
      color: black;
    }
    ul {
      margin-top: 40px;
    }
    li {
      p {
        display: block;
      }
    }
    #exploreBt {
      margin: 0;
      width: 100%;
      box-shadow: 5px 0px 8px rgba(0, 0, 0, 0.144);
      border-radius: 0px;
    }
    #settingsBt {
      margin: 0;
      width: 100%;
      box-shadow: -5px 0px 8px rgba(0, 0, 0, 0.205);
      border-radius: 0px;
    }
  }
  ul {
    margin-top: 45px;
    list-style-type: none;
    transition: 0.2s ease-in-out;
  }
  li {
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;
    &:hover:not(.selected) {
      background: var(--hoverColor);
    }
    img {
      width: 20px;
    }
    p {
      white-space: nowrap;
      display: none;
    }
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

.selected {
  background: var(--secondaryColor) !important;
  img {
    filter: invert(1);
  }
  p {
    color: var(--primaryColor) !important;
  }
}

#categories_list {
  height: 92%;
  width: 105%;
  padding-bottom: 20px;
}
#c_title_area {
  color: white;
}
#exploreBt {
  background: var(--primaryColor);
  z-index: 2;
  transition: 0.2s ease-in-out;
}
#settingsBt {
  background: var(--primaryColor);
  transition: 0.2s ease-in-out;
}
.darkMode {
  .selected {
    img {
      filter: none;
    }
  }
}
.darkMode #exploreBt,
#settingsBt {
  background: var(--hoverColor);
}
.darkMode #exploreBt:not(.selected) img {
  filter: invert(1);
}
.darkMode #settingsBt:not(.selected) img {
  filter: invert(1);
}
</style>
