<template>
  <div>
    <input type="number" :value="amount" @keyup="push" @change="push" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AmountInput",
  props: {
    isSource: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    amount() {
      const getterName = this.isSource ? "getSourceAmount" : "getTargetAmount";
      return this.$store.getters[getterName];
    },
  },
  methods: {
    push(event: Event) {
      const target = event.target as HTMLInputElement;
      const action = this.isSource
        ? "updateSourceAmount"
        : "updateTargetAmount";
      this.$store.commit(action, target.value);
    },
  },
});
</script>

<style scoped lang="scss"></style>
