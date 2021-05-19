<template>
  <div id="app">
    <CurrencySelect></CurrencySelect>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CurrencySelect from "./components/CurrencySelect.vue";

export default Vue.extend({
  name: "App",
  components: {
    CurrencySelect,
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
