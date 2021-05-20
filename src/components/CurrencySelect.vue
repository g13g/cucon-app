<template>
  <div>
    <select :value="currency" @change="push">
      <option v-for="option in options" v-bind:key="option.key">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CURRENCIES } from "@/utils";

interface SelectOption {
  key: string;
  name: string;
}

export default Vue.extend({
  name: "CurrencySelect",
  props: {
    isSource: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    options(): SelectOption[] {
      const toSelectOption = (entry: string[]): SelectOption => {
        return { key: entry[0], name: entry[1] };
      };
      return Object.entries(CURRENCIES).map(toSelectOption);
    },
    currency() {
      const getterName = this.isSource
        ? "getSourceCurrency"
        : "getTargetCurrency";
      return this.$store.getters[getterName];
    },
  },
  methods: {
    push(event: Event) {
      const target = event.target as HTMLInputElement;
      const action = this.isSource
        ? "updateSourceCurrency"
        : "updateTargetCurrency";
      this.$store.dispatch(action, target.value);
    },
  },
});
</script>

<style scoped lang="scss"></style>
