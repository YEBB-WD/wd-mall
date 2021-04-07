import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.accessToken

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  let errorStatus = error.response.status
  console.log("errorStatus : "+errorStatus)
  if (errorStatus == '401' || errorStatus == '422') {
    //alert("Your session has been expired. please login again");
    router.push('/login')
  }
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
