<template>
  <div class="self">
    <div class="input-wrapper">
      <input type="number" :value="amount" @keyup="push" @change="push" />
    </div>
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
      this.$store.dispatch(action, target.value);
    },
  },
});
</script>

<style scoped lang="scss">
.self {
  .input-wrapper {
    border-radius: 6px;
    border: 1px solid #dfe1e5;
    margin-right: 1em;
    overflow: hidden;
  }
  input {
    background: transparent;
    border: none;
    color: white;
    font-weight: 600;
    width: 150px;
    line-height: 2rem;
    padding-left: 0.5rem;
    &:focus {
      outline: none;
    }
  }
}
</style>
