import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css'

import { store } from './store/store'
import WinBetSlip from './components/WinBetSlip.vue'
import PlaceBetSlip from './components/PlaceBetSlip.vue'
import ExactaBetSlip from './components/ExactaBetSlip.vue'
import QuinellaBetSlip from './components/QuinellaBetSlip.vue'
import MeetingHeader from './components/MeetingHeader.vue'
import PlacePotHeader from './components/PlacePotHeader.vue'
import RaceHeader from './components/RaceHeader.vue'
import Chat from './views/chat.vue'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.component('winbetslip', WinBetSlip )
Vue.component('placebetslip', PlaceBetSlip )
Vue.component('exactabetslip', ExactaBetSlip )
Vue.component('quinellabetslip', QuinellaBetSlip )
Vue.component('meetingheader', MeetingHeader )

Vue.component('raceheader', RaceHeader )
Vue.component('placepotheader', PlacePotHeader )
Vue.component('chat', Chat )

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')