import './plugins/vuetify'

import App from './App.vue'
import router from './router'
//import VueResource from 'vue-resource';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { store } from './store/store'
import WinBetSlip from './components/WinBetSlip.vue'
import PlaceBetSlip from './components/PlaceBetSlip.vue'
import ExactaBetSlip from './components/ExactaBetSlip.vue'
import QuinellaBetSlip from './components/QuinellaBetSlip.vue'
import MeetingHeader from './components/MeetingHeader.vue'
import PlacePotHeader from './components/PlacePotHeader.vue'
import PlacePotRunners from './components/PlacePotRunners.vue'

import RaceHeader from './components/RaceHeader.vue'
import RacingPostRunnerInfo from './components/RacingPostRunnerInfo.vue'
import RunnerSilksInfo from './components/RunnerSilksInfo.vue'
import PlacePotRace from './components/PlacePotRace.vue'
import PlacePotSelection from './components/PlacePotSelection.vue'
import PlacePot from './components/PlacePot.vue'

import Chat from './views/chat.vue'
import Vue from 'vue'



Vue.config.productionTip = false


//import 'vuetify/src/stylus/app.styl'



Vue.component('winbetslip', WinBetSlip )
Vue.component('placebetslip', PlaceBetSlip )
Vue.component('exactabetslip', ExactaBetSlip )
Vue.component('quinellabetslip', QuinellaBetSlip )
Vue.component('meetingheader', MeetingHeader )
Vue.component('racingpostrunnerinfo', RacingPostRunnerInfo )
Vue.component('runnersilksinfo', RunnerSilksInfo )
Vue.component('raceheader', RaceHeader )

Vue.component('chat', Chat )
Vue.component('placepotrace', PlacePotRace)

Vue.component('placepot', PlacePot )
Vue.component('placepotheader', PlacePotHeader )
Vue.component('placepotrunners', PlacePotRunners )
Vue.component('placepotselection', PlacePotSelection )


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
