<template>
  <div class="base_button">
    <button class="pl10 pr10 pt5 pb5 round15 w-100">
      <strong>{{ text }}</strong>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
  computed: {
    listeners() {
      const { change, ...listeners } = this.$listeners;
      return listeners;
    },
    attrs() {
      const { rows, ...attrs } = this.$attrs;
      return attrs;
    },
  },
};
</script>

<style lang="scss">
.base_button {
  button {
    background: rgba(0, 0, 0, 0.075);
    cursor: pointer;
  }
}
</style>