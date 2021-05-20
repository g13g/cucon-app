import Vue from "vue";
import Vuex from "vuex";
import { CURRENCIES } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    source: {
      amount: 1,
      currency: CURRENCIES.EUR,
    },
    target: {
      amount: 2, // TODO: compute based on rate
      currency: CURRENCIES.USD,
    },
  },
  mutations: {
    updateSourceAmount(state, newAmount: number) {
      state.source.amount = newAmount;
    },
    updateTargetAmount(state, newAmount: number) {
      state.target.amount = newAmount;
    },
    updateSourceCurrency(state, newCurrency: string) {
      state.source.currency = newCurrency;
    },
    updateTargetCurrency(state, newCurrency: string) {
      state.target.currency = newCurrency;
    },
  },
  actions: {
    updateSourceAmount(state, newAmount: number) {
      state.commit("updateSourceAmount", newAmount);
      // TODO: Update TARGET amount based on conversation rate
    },
    updateTargetAmount(state, newAmount: number) {
      state.commit("updateTargetAmount", newAmount);
      // TODO: Update SOURCE amount based on conversation rate
    },
    updateSourceCurrency(state, newCurrency: string) {
      state.commit("updateSourceCurrency", newCurrency);
      // TODO: Update TARGET amount based on conversation rate
    },
    updateTargetCurrency(state, newCurrency: string) {
      state.commit("updateTargetCurrency", newCurrency);
      // TODO: Update SOURCE amount based on conversation rate
    },
  },
  modules: {},
  getters: {
    getSourceAmount: (state) => state.source.amount,
    getSourceCurrency: (state) => state.source.currency,
    getTargetAmount: (state) => state.target.amount,
    getTargetCurrency: (state) => state.target.currency,
  },
});
