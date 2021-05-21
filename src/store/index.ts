import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { CURRENCIES } from "@/utils";
import { Rates, InputPair } from "@/models";
import { convertFromInputs } from "@/utils";

Vue.use(Vuex);

interface InitialState {
  source: InputPair;
  target: InputPair;
  rates: Rates;
}

// This is a relay API call via Runkit in order to hide my API key
// Runkit Notebook: https://runkit.com/g13g/60a73eb28e5c9b001a740520
const API_URI = `https://untitled-wzgxxrggfyya.runkit.sh/`;

// Function, so it's easy to reset the state
const initialState = (): InitialState => ({
  source: {
    amount: 1,
    currency: CURRENCIES.EUR,
  },
  target: {
    amount: 1,
    currency: CURRENCIES.USD,
  },
  rates: {},
});

export default new Vuex.Store({
  state: initialState(),
  mutations: {
    setSourceAmount(state, newAmount: number) {
      state.source.amount = newAmount;
    },
    setTargetAmount(state, newAmount: number) {
      state.target.amount = newAmount;
    },
    setSourceCurrency(state, newCurrency: string) {
      state.source.currency = newCurrency;
    },
    setTargetCurrency(state, newCurrency: string) {
      state.target.currency = newCurrency;
    },
    setRates(state, newRates: Rates) {
      state.rates = newRates;
    },
  },
  actions: {
    updateSourceAmount(state, newAmount: number) {
      state.commit("setSourceAmount", newAmount);

      // Update TARGET amount accordingly
      const newTargetAmount = convertFromInputs(
        state.state.source,
        state.state.target.currency,
        state.state.rates
      );
      state.commit("setTargetAmount", newTargetAmount);
    },
    updateSourceCurrency(state, newCurrency: string) {
      state.commit("setSourceCurrency", newCurrency);

      // Update TARGET amount accordingly
      const newTargetAmount = convertFromInputs(
        state.state.source,
        state.state.target.currency,
        state.state.rates
      );
      state.commit("setTargetAmount", newTargetAmount);
    },
    updateTargetAmount(state, newAmount: number) {
      state.commit("setTargetAmount", newAmount);

      // Update SOURCE amount accordingly
      const newSourceAmount = convertFromInputs(
        state.state.target,
        state.state.source.currency,
        state.state.rates
      );
      state.commit("setSourceAmount", newSourceAmount);
    },
    updateTargetCurrency(state, newCurrency: string) {
      state.commit("setTargetCurrency", newCurrency);

      // Update TARGET amount accordingly
      const newTargetAmount = convertFromInputs(
        state.state.source,
        state.state.target.currency,
        state.state.rates
      );
      state.commit("setTargetAmount", newTargetAmount);
    },
    async fetchRates(state) {
      const res = await axios.get(API_URI);
      const rates: Rates = res.data.rates;
      state.commit("setRates", rates);

      // Initial conversion
      const sourceAmount = state.state.source.amount;
      state.dispatch("updateSourceAmount", sourceAmount);
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
