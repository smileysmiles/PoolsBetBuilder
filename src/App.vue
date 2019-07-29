<template>
  <div id="app">
    <v-app>
      <!-- <Navbar :drawer="drawer"></Navbar> -->

      <v-speed-dial v-model="fab" bottom right >
      <template  v-slot:activator>
        <v-btn v-model="fab" color="accent" fab>
          <v-icon color="secondary">menu</v-icon>
          <v-icon color="secondary">close</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark color="green" @click="navhome()">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn fab dark color="red" @click="navhome()">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-speed-dial>

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
        fab:false,
        loaded: false,
        items:[
          {title: 'Home', icon: 'dashboard', link:'/'},
          {title: 'Racecard', icon: 'event', link:'/Racecard'},
          {title: 'Meetings', icon: 'toc', link:'/Meeting'},
          {title: 'Race', icon: 'access_time', link:'/Race'}
        ],
        right:null,
        timeout:0,
        showsnack:true,
        snackclass:"hiddensnack",
        swipeDirection: 'None',
        drawer: false,
        tabs: null
      }
    },
    computed:{
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'class': 'purple', icon: 'account_circle' }
          case 'two': return { 'class': 'red', icon: 'edit' }
          case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    },
    methods: {
      swipe (direction) {
        this.swipeDirection = direction
      },
      navhome(){
        console.log("NAV HOME")
        this.$router.push('/')
      }
    },
  async created () {
  }
  }
</script>
<style>
.hiddensnack{
  bottom: 200px;
  width:2px;
  height:100px;
}

.hiddensnack .v-snack__wrapper{
  height:100px;
}

.element::-webkit-scrollbar { width: 0 !important }


  .v-speed-dial.v-speed-dial{
  z-index:999;
  position:fixed;
  bottom:5px;
  right:5px;
}
</style>

