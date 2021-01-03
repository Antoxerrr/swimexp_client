import Vue from 'vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.VUE_APP_BACKEND_DOMAIN;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
