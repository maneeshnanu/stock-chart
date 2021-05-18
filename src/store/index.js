import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    currentSymbolData: {},
    selectedSymbol: {},
    ohlcCloseArray: [],
    sma: [],
    errors: [],
    symbols: [
      {
        symbol: "TCS",
        securityName: "Tata Consultency Services",
      },
      {
        symbol: "RELIANCE",
        securityName: "Reliance Industries",
      },
      {
        symbol: "INFY",
        securityName: "Infosys",
      },
      {
        symbol: "TECHM",
        securityName: "Tech Mahindra",
      },
      {
        symbol: "LTTS",
        securityName: "L&T Infotech",
      },
      {
        symbol: "WIPRO",
        securityName: "Wipro Technologies",
      },
      {
        symbol: "ITC",
        securityName: "Indian Tobacco Company",
      },
      {
        symbol: "AXISBANK",
        securityName: "Axis Bank",
      },
      {
        symbol: "HDFCBANK",
        securityName: "HDFC Bank",
      },
      {
        symbol: "ICICIBANK",
        securityName: "ICICI Bank",
      },
    ],
    // to be removed
    symbolsOnly: [
      "TCS",
      "RELIANCE",
      "INFY",
      "TECHM",
      "WIPRO",
      "LTTS",
      "ITC",
      "AXISBANK",
      "HDFCBANK",
      "ICICIBANK",
    ],
  },
  mutations: {
    ADD(state, symbol) {
      state.symbols.push(symbol);
    },
    LOADING(state, loading) {
      state.loading = loading;
    },
    SET_SYMBOL(state, selectedSymbol) {
      state.selectedSymbol = selectedSymbol;
    },
    UPDATE_SYMBOL_DATA(state, data) {
      state.currentSymbolData = data;
    },
    UPDATE_SMA(state, sma) {
      state.sma = sma;
    },
    UPDATE_CLOSE_ARRAY(state, closeArray) {
      state.ohlcCloseArray.push(closeArray);
    },
  },
  getters: {
    symbols: (state) => {
      return state.symbols;
    },
    selectedSymbol: (state) => {
      return state.selectedSymbol;
    },
    symbolData: (state) => {
      return state.currentSymbolData;
    },
    sma: (state) => {
      return state.sma;
    },
  },
  actions: {
    addSymbol({ commit }, symbol) {
      commit("ADD", symbol);
    },
    movingAverage({ commit }, [array, count, qualifier]) {
      // calculate average for subarray
      let avg = function (array, qualifier) {
        let sum = 0,
          count = 0,
          val;
        for (let i in array) {
          val = array[i];
          if (!qualifier || qualifier(val)) {
            sum += val;
            count++;
          }
        }
        return sum / count;
      };
      let result = [],
        val;
      // pad beginning of result with null values
      for (let i = 0; i < count - 1; i++) {
        result.push(null);
      }
      // calculate average for each subarray and add to result
      for (let i = 0, len = array.length - count; i <= len; i++) {
        val = avg(array.slice(i, i + count), qualifier);
        if (isNaN(val)) result.push(null);
        else result.push(val);
      }
      commit("UPDATE_SMA", result);
      return result;
    },
    loadSymbolData({ commit }, symbol) {
      commit("LOADING", true);
      return axios
        .get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=LS5R25VM75IYJ81F`
        )
        .then((response) => {
          console.log(response.data["Time Series (1min)"]);
          const real_data = response.data["Time Series (1min)"];
          const newData = Object.keys(real_data).reduce(
            (result, currentKey) => {
              const value = real_data[currentKey];
              const tmp = [
                new Date(currentKey).getTime(),
                parseFloat(value["1. open"]),
                parseFloat(value["2. high"]),
                parseFloat(value["3. low"]),
                parseFloat(value["4. close"]),
              ];
              result.push(tmp);
              commit("UPDATE_CLOSE_ARRAY", value["4. close"]);
              return result;
            },
            []
          );

          console.log(newData.slice(0, 20));
          commit("UPDATE_SYMBOL_DATA", newData);
          commit("LOADING", false);
          return newData;
        })
        .catch((e) => {
          console.log(e);
          this.errors.push(e);
          commit("LOADING", false);
          return [];
        });
    },
  },
  modules: {},
});
