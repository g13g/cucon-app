<template>
  <div id="app">
    <div class="container">
      <h2>Currency Converter</h2>
      <div class="input-block">
        <AmountInput :is-source="true" />
        <CurrencySelect :is-source="true" />
      </div>

      <div class="input-block">
        <AmountInput :is-source="false" />
        <CurrencySelect :is-source="false" />
      </div>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  display: flex;
  background: #f4f6f9;
}

.container {
  display: block;
  background-image: linear-gradient(
    109.6deg,
    rgba(0, 191, 166, 0.521) 11.2%,
    rgba(0, 140, 122, 1) 100.2%
  );
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: white;
  border-radius: 6px;
  margin: 5em auto 0;
  padding: 1.5em 2em 1em;
  max-height: 200px;
  h2 {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 1.8em;
  }
}
.input-block {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
}
</style>
