<template>
  <div class="home">
    <Header />
    <section class="sidebar-layout">
      <div class="p-1">
        <div class="columns">
          <div class="column is-3">
            <Sidebar />
          </div>
          <div class="column is-9">
            <Chart
              :chartData="stockChartData"
              :result="result"
              :key="stockChartComponent"
              :constructorType="'stockChart'"
            ></Chart>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from "@/components/Chart.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  data() {
    return {
      result: 0,
      stockChartData: {},
      stockChartComponent: 0,
      selectedSymbol: "",
    };
  },
  components: {
    Chart,
    Sidebar,
    Footer,
    Header,
  },
  methods: {},
};
</script>
