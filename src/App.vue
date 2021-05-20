<template>
  <div id="app">
    <div class="container">
      <AmountInput :initial="1" @change="handleSourceAmountChange" />
      <CurrencySelect
        :initial="source.currency"
        @change="handleSourceCurrencyChange"
      />
    </div>

    <div class="container">
      <AmountInput :initial="1" />
      <CurrencySelect :initial="target.currency" />
    </div>
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
      source: {
        amount: 1,
        currency: CURRENCIES.EUR,
      },
      target: {
        amount: 1, // TODO: Set initial amount based on conversion
        currency: CURRENCIES.USD,
      },
    };
  },
  methods: {
    handleSourceAmountChange(value: number) {
      console.log(value);
    },
    handleSourceCurrencyChange(currencyCode: string) {
      console.log(currencyCode);
    },
  },
});
</script>

<style lang="scss">
.container {
  display: flex;
  padding: 1em;
}
</style>
