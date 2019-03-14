<template>
  <v-app>
    <div id="app">
      <Navbar></Navbar>     
        <v-content v-if="loaded">
           <v-container fluid pa-2>
            <router-view></router-view>
           </v-container>
        </v-content>
        <v-content v-else>
          <div class="text-xs-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :width="3"
              color="red"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :width="3"
              color="green"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :size="50"
              color="amber"
              indeterminate
            ></v-progress-circular>
          </div>
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
    async created(){
      await this.$store.dispatch('inittodaysracing').then(() => {
        console.log("Success");
        this.loaded = true;
      });
    }
  }
</script>
