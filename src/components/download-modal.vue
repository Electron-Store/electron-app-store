<template>
  <div
    class="modal pos-fix top0 left0 w-100 h-100 flex center-a"
    @click="closeModal($event)"
  >
    <div class="dl pa10 round10">
      <h3 class="text-align-center mb10">Select File</h3>
      <div class="grid2 gap10">
        <button
          v-for="file in releaseFiles"
          :key="file.name"
          id="instal_bt"
          class="pt5 pb5 pl10 pr10 round5"
        >
          <h3>{{ file.name }}</h3>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    releaseFiles() {
      return this.files.filter((file) => file.name.includes(".yml"));
    },
  },
  props: {
    files: Array,
  },
  methods: {
    closeModal(e) {
      if (e.target.classList.contains("modal")) {
        this.$emit("closeModal");
      }
    },
  },
};
</script>

<style>
.modal {
  z-index: 4;
  background: rgba(0, 0, 0, 0.219);
}
.dl {
  background: white;
}
</style>