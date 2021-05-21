import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { CURRENCIES, CURRENCY_TO_CODE } from "@/utils";
import Rates from "@/models/Rates";
import { convertFromEuro, convertToEuro } from "@/utils";

Vue.use(Vuex);

interface InputPair {
  amount: number;
  currency: string;
}

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

      // Update TARGET amount based on conversation rate
      const sourceAmount = state.state.source.amount;
      const targetCurrency = state.state.target.currency;
      const currencyCode = CURRENCY_TO_CODE[targetCurrency];
      const rate = state.state.rates[currencyCode];
      const targetAmount = convertFromEuro(sourceAmount, rate);
      state.commit("setTargetAmount", targetAmount);
    },
    updateTargetAmount(state, newAmount: number) {
      state.commit("setTargetAmount", newAmount);

      // Update SOURCE amount based on conversation rate
      const targetCurrency = state.state.target.currency;
      const currencyCode = CURRENCY_TO_CODE[targetCurrency];
      const rate = state.state.rates[currencyCode];
      const newSourceAmount = convertToEuro(newAmount, rate);
      state.commit("setSourceAmount", newSourceAmount);
    },
    updateSourceCurrency(state, newCurrency: string) {
      state.commit("setSourceCurrency", newCurrency);
    },
    updateTargetCurrency(state, newCurrency: string) {
      state.commit("setTargetCurrency", newCurrency);

      // Update TARGET amount based on conversation rate
      const sourceAmount = state.state.source.amount;
      const currencyCode = CURRENCY_TO_CODE[newCurrency];
      const rate = state.state.rates[currencyCode];
      const targetAmount = convertFromEuro(sourceAmount, rate);
      state.commit("setTargetAmount", targetAmount);
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
