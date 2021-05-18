<template lang="html">
  <div class="">
    <div id="one-day-chart">
      <!-- <button type="button" name="button" v-on:click="showChart('SMA')">SMA</button> -->
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
// import Highcharts from "highcharts";
// import stockInit from "highcharts/modules/stock";

import { mapGetters } from "vuex";

// stockInit(Highcharts);

export default {
  name: "Charts",
  props: ["chartData", "result"],
  data() {
    return {
      chartOptions: {
        chart: {
          backgroundColor: "rgba(256, 256, 256, 0)",
          style: {
            fontFamily: "Avenir, Helvetica, Arial, sans-serif",
            fontSize: "0.8em",
            color: "white",
            textAlign: "center",
          },
        },
        title: {
          // text: `${this.selectedSymbol.symbol}`,
          style: {
            fontFamily: "Avenir, Helvetica, Arial, sans-serif",
            fontSize: "1.8em",
            fontWeight: "bold",
            color: "grey",
            textAlign: "center",
          },
        },
        tooltip: {
          valueDecimals: 2,
        },
        series: [
          {
            name: "",
            // data: [10, 0, 8, 2, 6, 4, 5, 5],
            data: [],
          },
        ],
        rangeSelector: {
          buttons: [
            {
              type: "day",
              count: 8,
              text: "Week",
            },
            {
              type: "month",
              count: 1,
              text: "1M",
            },
            {
              type: "month",
              count: 3,
              text: "3M",
            },
            {
              type: "all",
              text: "All",
            },
          ],
          selected: 4,
        },
        yAxis: {
          title: {
            // text: "Price $",
            style: {
              fontFamily: "Avenir, Helvetica, Arial, sans-serif",
              fontSize: "1.8em",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            },
          },
        },
        xAxis: {
          type: "datetime",
          title: {
            // text: 'Date',
            style: {
              fontFamily: "Avenir, Helvetica, Arial, sans-serif",
              fontSize: "1.8em",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            },
          },
        },
      },
      loading: false,
    };
  },
  async created() {
    // Default Symbol data loading
    this.$store.commit("SET_SYMBOL", {
      symbol: "TCS",
      securityName: "Tata Consultency Services",
    });
    await this.$store.dispatch("loadSymbolData", "TCS");
  },
  computed: {
    ...mapGetters(["symbolData", "selectedSymbol", "sma"]),
  },
  watch: {
    symbolData(newValue) {
      console.log(newValue);
      this.chartOptions.title.text = this.selectedSymbol.symbol;
      this.chartOptions.series = [{ data: this.symbolData }];
    },
  },
  components: {
    highcharts: Chart,
  },
  methods: {
    toggleLoading() {
      this.loading != this.loading;
    },
    async showSMA() {
      await this.$store.dispatch("movingAverage", [this.symbolData, 7]);
      let newSeries = {
        name: "SMA",
        data: this.sma,
      };
      this.chartOptions.series.push(newSeries);
    },
  },
  mounted() {
    // Object.entries(this.chartData).forEach(([key, prices]) => {
    //   let newSeries = {
    //     name: key,
    //     data: Object.entries(prices).reverse(),
    //     pointStart: Date.UTC(2020),
    //     pointEnd: Date.UTC(2020),
    //     pointInterval: 24 * 3600 * 1500,
    //   };
    //   this.chart2.series.push(newSeries);
    // });
    // this.highcharts.redraw();
  },
};
</script>

<style lang="css" scoped>
html {
  background-color: rgb(17, 52, 78);
  height: 100vh;
  padding: 0;
  margin: 0;
}

.layout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.searchColumn {
  width: -500px;
  display: flex;
  justify-content: center;
  align-self: stretch;
  align-content: center;
  width: 30%;
  border-left: 1px solid white;
}

.maintContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: center;
  padding: 0;
  margin: 0;
}

button {
  width: 150px;
  height: 30px;
  background: rgb(7, 37, 62);
  padding: 5px;
  border: 1px solid white;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  transition: 0.2s;
}

button:hover {
  font-style: italic;
  cursor: pointer;
}

a {
  display: inline-flex;

  height: 100%;
  background: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  position: relative;
  margin: 0px 10px 10px 10px;
  padding: 10px;
  transition: 0.2s;
}

a:hover {
  background: lightblue;
}

a > img {
  height: 30px;
  width: 30px;
}
</style>
