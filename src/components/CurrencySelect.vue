<template>
  <div>
    <select v-model="selected" @change="push($event)">
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
    initial: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selected: this.initial ? this.initial : CURRENCIES.EUR,
    };
  },
  computed: {
    options(): SelectOption[] {
      const toSelectOption = (entry: string[]): SelectOption => {
        return { key: entry[0], name: entry[1] };
      };
      return Object.entries(CURRENCIES).map(toSelectOption);
    },
  },
  methods: {
    push() {
      this.$emit("change", this.selected);
    },
  },
});
</script>

<style scoped lang="scss"></style>
