<template>
  <v-app>
    <div id="app">
      <Navbar></Navbar>     
        <v-content >
           <v-container fluid pa-2>
            <router-view></router-view>
           </v-container>
        </v-content>
        
         
      <Footer></Footer>
    </div>
  </v-app>
</template>
<script>
  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'

  export default{
    components:{ Navbar, Footer },
    data (){
      return {
        loaded: false,
        items:[
          {title: 'Home', icon: 'dashboard', link:'/'},
          {title: 'Racecard', icon: 'event', link:'/Racecard'},
          {title: 'Meetings', icon: 'toc', link:'/Meeting'},
          {title: 'Race', icon: 'access_time', link:'/Race'}
        ],
        right:null
      }
    },
  async created () {
    this.$store.dispatch('getTodaysRacecard');
    this.$store.dispatch('getTodaysRaces');
    this.$store.dispatch('getTodaysRunners');     
  }
  }
</script>
