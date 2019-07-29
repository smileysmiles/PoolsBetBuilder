<template>
  <div v-if="race">
    <!-- <raceheader v-if="race"  :raceuid="UID"></raceheader> -->
      <v-container class="about" pa-0>
            <v-tabs v-if="racepools && racepools.length > 0" dark color="secondary" slider-color="accent">
              
                <v-tab v-for="pool in racepools" :key="pool.Number" ripple>
                  {{ pool.Name=="Win" ? "Win/Place" : pool.Name }}
                </v-tab>
                <v-tab-item v-for="pool in racepools" :key="pool.Name">
                  <v-card  v-if="pool.Name == 'Win'" flat mt-5>                   
                      <v-card-text>
                        <winbetslip :Race=race :PoolID=pool.Number></winbetslip>
                      </v-card-text>
                    </v-card>
                  <!-- <v-card  v-if="pool.Name == 'Place'" flat>                   
                    <v-card-text>
                      <placebetslip :Race=race></placebetslip>
                    </v-card-text>
                  </v-card> -->
                  <!-- <v-card  v-if="pool.Name == 'Exacta'" flat>                   
                    <v-card-text>
                      <exactabetslip :Race=race :PoolID=pool.Number></exactabetslip>
                    </v-card-text>
                  </v-card>
                  <v-card  v-if="pool.Name == 'Trifecta'" flat>                   
                    <v-card-text>
                      TRIFECTA
                    </v-card-text>
                  </v-card>
                  <v-card  v-if="pool.Name == 'Swinger'" flat>                   
                    <v-card-text>
                      Swinger
                    </v-card-text>
                  </v-card>
                  <v-card  v-if="pool.Name == 'Quinella'" flat>                   
                    <v-card-text>
                      <quinellabetslip :Race=race :PoolID=pool.Number></quinellabetslip>    
                    </v-card-text>
                  </v-card>                 -->
                </v-tab-item>
              </v-tabs>
              <div v-else>
                <loading></loading>
              </div>


  
  </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Race',
  component:{


  },
  data() {
    return {
      addcolor: "grey",
      activeBtn: 1,
      showNav: true,
      hidden: false
    }
  },
  props:[
    'UID'
  ],
  computed: {
    ...mapGetters([ 'racebyuid', 'getRaceRunners', 'getRacePools' ]),
    race: function(){
      return this.racebyuid(this.UID );
    },
    racepools: function(){
      return this.getRacePools(this.UID);
    }
    
  },
  methods:{
    poolname: function(name){
      if (poolname == "Win")
        return "Win/Place";
      else
        return name;
    }
    
  },
  watch:{
    'UID' (to, from){
      this.course = this.$route.params.course
      this.$store.dispatch('getRaceData', this.UID);
    }
  },
  async created () {
    
    if(this.UID == null)
    {
      this.UID = this.$route.params.UID;
      
    }
    
    await this.$store.dispatch('getRaceData', this.UID);
    console.log("RACE - Created")
  }
}
</script>
<style>

</style>