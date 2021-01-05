import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faTrophy,
  faCar,
  faUsers,
  faCalendar,
  faRoute,
  faStopwatch,
  faSave,
  faEdit,
  faTimes,
  faPrint,
  faClock,
  faBan,
  faPen,
  faTrashAlt,
  faWifi,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {firestorePlugin} from 'vuefire';

Vue.use(firestorePlugin);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

library.add([
  faHome,
  faTrophy,
  faCar,
  faUsers,
  faCalendar,
  faRoute,
  faStopwatch,
  faSave,
  faEdit,
  faTimes,
  faPrint,
  faClock,
  faBan,
  faPen,
  faTrashAlt,
  faWifi,
  faEye
]);

Vue.component("fa-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

import { delay, day, start, arrival, partial, penalty } from './util/vue.filter';

Vue.filter('maxDelay', function(ms){
  return delay(ms);
});

Vue.filter('day', function(date){
  return day(date);
})

Vue.filter('start', function(ms){
  return start(ms);
})

Vue.filter('arrival', function(ms){
  return arrival(ms);
})

Vue.filter('partial', function(ms){
  return partial(ms);
})

Vue.filter('penalty', function(ms){
  return penalty(ms);
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import { errorListener } from './electon/ipcRenderer';

errorListener()