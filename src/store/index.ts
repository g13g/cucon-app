import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { CURRENCIES } from "@/utils";
import Rates from "@/models/Rates";

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

// TODO: Use relay service for this API call
const KEY = ""; // ADD API KEY HERE
const API_URI = "http://api.exchangeratesapi.io/v1/latest?access_key=" + KEY;

// Function, so it's easy to reset the state
const initialState = (): InitialState => ({
  source: {
    amount: 1,
    currency: CURRENCIES.EUR,
  },
  target: {
    amount: 1, // TODO Compute based on rate
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
    // TODO: Consider renaming to something to reflect all steps
    updateSourceAmount(state, newAmount: number) {
      state.commit("setSourceAmount", newAmount);
      // TODO: Update TARGET amount based on conversation rate
    },
    updateTargetAmount(state, newAmount: number) {
      state.commit("setTargetAmount", newAmount);
      // TODO: Update SOURCE amount based on conversation rate
    },
    updateSourceCurrency(state, newCurrency: string) {
      state.commit("setSourceCurrency", newCurrency);
      // TODO: Update TARGET amount based on conversation rate
    },
    updateTargetCurrency(state, newCurrency: string) {
      state.commit("setTargetCurrency", newCurrency);
      // TODO: Update SOURCE amount based on conversation rate
    },
    async fetchRates(state) {
      const res = await axios.get(API_URI);
      const rates: Rates = res.data.rates;
      state.commit("setRates", rates);
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
