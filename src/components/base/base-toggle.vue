<template>
  <div class="base_switch flex center-a">
    <input
      v-bind="attrs"
      v-on="listeners"
      :checked="checked || false"
      @change="change($event)"
      type="checkbox"
      id="switch"
    /><label for="switch"></label>
  </div>
</template>

<script>
export default {
  props: ["checked"],
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
    change(event) {
      this.$emit("change", event.target.checked);
    },
  },
};
</script>

<style lang="scss">
.base_switch {
  height: 40px;
  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    width: 50px;
    height: 30px;
    background: rgba(128, 128, 128, 0.246);
    display: block;
    border-radius: 100px;
    position: relative;
  }

  label:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40%;
    height: 70%;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s ease-in-out;
  }

  input:checked + label {
    background: #000000;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
}
</style>

