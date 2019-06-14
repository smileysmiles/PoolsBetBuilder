<template>
  <div id="app">
    <v-app>
      <Navbar></Navbar>
      <v-content >
        <v-container>        
          <router-view></router-view>
        </v-container>
    </v-content>
    </v-app>
  </div>
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
  }
  }
</script>
