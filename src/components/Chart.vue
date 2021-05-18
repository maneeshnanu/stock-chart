<template lang="html">
  <div class="">
    <div id="one-day-chart">
      <!-- <button type="button" name="button" v-on:click="showChart('SMA')">SMA</button> -->
      <div id="highchart"></div>
    </div>
  </div>
</template>

<script>
var Highcharts = require("highcharts/highstock");
var candles = [
  // Sample daily data (working sample)
  [1296432000000, 47.97, 48.58, 47.76, 48.47],
  [1296518400000, 48.76, 49.38, 48.71, 49.29],
  [1296604800000, 49.21, 49.32, 49.08, 49.19],
  [1296691200000, 49.11, 49.18, 48.36, 49.06],
  [1296777600000, 49.09, 49.53, 49.07, 49.5],
  [1297036800000, 49.7, 50.46, 49.66, 50.27],
  [1297123200000, 50.53, 50.79, 50.31, 50.74],
  [1297209600000, 50.74, 51.29, 50.7, 51.17],
  [1297296000000, 51.06, 51.43, 49.71, 50.65],
  [1297382400000, 50.68, 51.11, 50.51, 50.98],
  [1297641600000, 50.97, 51.35, 50.96, 51.31],
  [1297728000000, 51.31, 51.42, 51.08, 51.41],
  [1297814400000, 51.54, 52.13, 51.5, 51.88],
  [1297900800000, 51.04, 51.47, 50.93, 51.19],
  [1297987200000, 51.24, 51.36, 49.93, 50.08],
  [1298332800000, 48.88, 49.34, 48.25, 48.37],
  [1298419200000, 48.4, 49.23, 48.37, 48.95],
  [1298505600000, 49.15, 49.31, 48.34, 48.98],
  [1298592000000, 49.32, 49.78, 49.26, 49.74],
  [1298851200000, 50.18, 50.72, 50.16, 50.46],

  // Interaday data Actual data copy( fetched and generated from Alpha vantage API) Note Working
  // [1621249560000, 13.27, 13.27, 13.27, 13.27],
  // [1621248780000, 13.3, 13.3, 13.3, 13.3],
  // [1621247460000, 13.26, 13.26, 13.26, 13.26],
  // [1621247400000, 13.28, 13.28, 13.25, 13.25],
  // [1621247340000, 13.26, 13.29, 13.26, 13.2899],
  // [1621247280000, 13.265, 13.27, 13.26, 13.26],
  // [1621247220000, 13.27, 13.275, 13.26, 13.26],
  // [1621247160000, 13.26, 13.28, 13.255, 13.28],
  // [1621247100000, 13.255, 13.26, 13.25, 13.26],
  // [1621247040000, 13.255, 13.255, 13.25, 13.25],
  // [1621246980000, 13.26, 13.26, 13.258, 13.258],
  // [1621246920000, 13.255, 13.255, 13.25, 13.255],
  // [1621246860000, 13.245, 13.255, 13.245, 13.255],
  // [1621246800000, 13.255, 13.26, 13.25, 13.25],
  // [1621246740000, 13.25, 13.2581, 13.25, 13.25],
  // [1621246680000, 13.25, 13.25, 13.2486, 13.2486],
  // [1621246620000, 13.2599, 13.2599, 13.25, 13.255],
  // [1621246560000, 13.265, 13.2699, 13.255, 13.26],
  // [1621246500000, 13.26, 13.27, 13.25, 13.26],
  // [1621246440000, 13.25, 13.265, 13.2443, 13.26],
];

import { mapGetters } from "vuex";

export default {
  name: "Charts",
  props: ["stockChartData"],
  data() {
    return {
      loading: false,
    };
  },
  async created() {},
  computed: {
    ...mapGetters(["symbolData", "selectedSymbol", "sma"]),
  },
  methods: {},
  mounted() {
    console.log("Got some data, now lets show something in this component");
    var spec = {
      chart: {
        type: "candlestick",
        renderTo: "highchart",
        backgroundColor: "rgba(256, 256, 256, 0)",
        style: {
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          fontSize: "0.8em",
          color: "white",
          textAlign: "center",
        },
      },
      title: {
        text: "Title",
        style: {
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          fontSize: "1.8em",
          fontWeight: "bold",
          color: "grey",
          textAlign: "center",
        },
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
      rangeSelector: {
        buttons: [
          {
            type: "hour",
            count: 1,
            text: "1h",
          },
          {
            type: "day",
            count: 1,
            text: "1D",
          },
          {
            type: "all",
            count: 1,
            text: "All",
          },
        ],
        selected: 1,
        inputEnabled: false,
      },
      series: [
        {
          type: "candlestick",
          name: "candles",
          data: candles,
          dataGrouping: {
            units: [
              [
                "day", // unit name
                [1], // allowed multiples
              ],
              ["week", [1, 2, 3, 4, 6]],
            ],
          },
        },
      ],
    };
    console.log("<<<<<<<<<<<<<<<<<<<", candles);
    console.log(this.symbolData);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    this.chart = new Highcharts.chart(spec);
  },
};
</script>

<style lang="css" scoped></style>
