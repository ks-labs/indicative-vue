import Vue from "vue";
import App from "./App.vue";
import Plugin from "../../lib/install";

Vue.config.productionTip = false;

Vue.use(Plugin, { return_error: false });

new Vue({
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
