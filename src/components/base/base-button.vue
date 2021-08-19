<template>
  <div class="base_button">
    <button
      v-bind="attrs"
      v-on="listeners"
      @click="emitClick"
      class="pl10 pr10 pt5 pb5 round15 w-100"
    >
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
  methods: {
    emitClick() {
      // this.$emit("click");
      //Unnecessary as the button has been wrapped in a div element which vue can register clicks without .native modifier
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