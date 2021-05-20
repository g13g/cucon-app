<template>
  <div>
    <input type="number" v-model="value" @keyup="push" @change="push" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AmountInput",
  props: {
    initial: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      value: this.initial,
    };
  },
  methods: {
    push() {
      this.$emit("change", this.value);
    },
  },
});
</script>

<style scoped lang="scss"></style>
