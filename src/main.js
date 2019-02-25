import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';

import { store } from './store/store'
import WinBetSlip from './components/WinBetSlip.vue'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.component('winbetslip', WinBetSlip )

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')