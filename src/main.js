import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';

import { store } from './store/store'
import WinBetSlip from './components/WinBetSlip.vue'
import PlaceBetSlip from './components/PlaceBetSlip.vue'
import ExactaBetSlip from './components/ExactaBetSlip.vue'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.component('winbetslip', WinBetSlip )
Vue.component('placebetslip', PlaceBetSlip )
Vue.component('exactabetslip', ExactaBetSlip )

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')