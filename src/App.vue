<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue'

  export default{
    components:{ Navbar },
    data (){
      return {
        items:[
          {title: 'Home', icon: 'dashboard', link:'/'},
          {title: 'Racecard', icon: 'event', link:'/Racecard'},
          {title: 'Meetings', icon: 'toc', link:'/Meeting'},
          {title: 'Race', icon: 'access_time', link:'/Race'}
        ],
        right:null
      }
    },
    created(){
      this.$store.dispatch('initRacecard');
    }
  }
</script>
