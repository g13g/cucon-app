<template>
  <div class="self">
    <div class="select-wrapper">
      <select :value="currency" @change="push">
        <option v-for="option in options" v-bind:key="option.key">
          {{ option.name }}
        </option>
      </select>
      <i class="arrow down"></i>
    </div>
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

<style scoped lang="scss">
.self {
  select {
    background: transparent;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 14px;
    padding: 0.6rem 0 0.6rem 0.6rem;
    width: 150px;
    appearance: none;
    &:focus {
      outline: none;
    }
  }
  .select-wrapper {
    border-radius: 6px;
    border: 1px solid #dfe1e5;
  }
  .arrow {
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    margin-right: 0.6em;
    position: relative;
    top: -3px;
  }
  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
}
</style>
