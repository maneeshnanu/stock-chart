<template>
  <div class="home">
    <Header />
    <section class="sidebar-layout">
      <div class="p-1">
        <div class="columns">
          <div class="column is-2">
            <Sidebar />
          </div>
          <div class="column is-10">
            <Chart :chartData="stockChartData"></Chart>
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
      loading: false,
      selectedSymbol: "",
      stockChartData: {},
    };
  },
  components: {
    Chart,
    Sidebar,
    Footer,
    Header,
  },
  methods: {
    toggleLoading() {
      this.loading != this.loading;
    },
  },
  mounted() {
    this.$store.dispatch("loadSymbolData", "TCS").then(
      (response) => {
        console.log("||||||||||", response);
        this.stockChartData = response;
        return response;
      },
      (error) => {
        console.error(
          "Got nothing from server. Prompt user to check internet connection and try again",
          error
        );
      }
    );
  },
};
</script>
