import Vue from "vue";
import App from "./App.vue";
import "office-ui-fabric-core/dist/css/fabric.min.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

window.Office.initialize = () => {
  new Vue({
    render: h => h(App)
  }).$mount("#app");
};
