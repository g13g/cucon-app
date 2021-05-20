<template>
  <div id="app">
    <div class="container">
      <AmountInput :is-source="true" />
      <CurrencySelect :is-source="true" />
    </div>

    <div class="container">
      <AmountInput :is-source="false" />
      <CurrencySelect :is-source="false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AmountInput from "./components/AmountInput.vue";
import CurrencySelect from "./components/CurrencySelect.vue";

export default Vue.extend({
  name: "App",
  components: {
    AmountInput,
    CurrencySelect,
  },
  created() {
    this.$store.dispatch("fetchRates");
  },
});
</script>

<style lang="scss">
.container {
  display: flex;
  padding: 1em;
}
</style>
