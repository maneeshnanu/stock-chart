const config = {
  AV_URL: process.env.VUE_APP_ALPHA_VANTAGE_URL,
  AV_API: process.env.VUE_APP_ALPHA_VANTAGE_API,
};

export default {
  install(Vue) {
    Vue.appConfig = config;
    Vue.prototype.$appConfig = config;
  },
};
