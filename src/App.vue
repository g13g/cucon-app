<template>
  <div id="app">
    <!-- SOURCE -->
    <AmountInput :initial="1" />
    <CurrencySelect />

    <!-- TARGET -->
    <AmountInput :initial="1" />
    <CurrencySelect :initial="initialTarget"></CurrencySelect>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CURRENCIES } from "@/utils";
import AmountInput from "./components/AmountInput.vue";
import CurrencySelect from "./components/CurrencySelect.vue";

export default Vue.extend({
  name: "App",
  components: {
    AmountInput,
    CurrencySelect,
  },
  data() {
    return {
      initialTarget: CURRENCIES.USD,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
