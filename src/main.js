import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import HighchartsVue from "highcharts-vue"; // In case Globally loading
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import dotenv from "dotenv";

dotenv.config();

// import configPlugin from "@/config";
// Vue.use(configPlugin);

Vue.use(Buefy);
// Vue.use(HighchartsVue);
Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
