<template>
  <div>
      <v-container class="about" mt-5 pa-0>
        HELLO
            <v-tabs v-if="race != undefined"  dark slider-color="white">
                <v-tab v-for="pool in race.Race.RacePools" :key="pool.Number" ripple dark>
                  {{ pool.Name }}
                </v-tab>
                <v-tab-item v-for="pool in race.Race.RacePools" :key="'pool' + pool.Number">
                  
                  <v-card  v-if="pool.Name == 'Win'" flat mt-5>                   
                    <v-card-text>
                      <winbetslip :Race=race :PoolID=pool.Number></winbetslip>
                    </v-card-text>
                  </v-card>
                <v-card  v-if="pool.Name == 'Place'" flat>                   
                  <v-card-text>
                    <placebetslip :Race=race></placebetslip>
                  </v-card-text>
                </v-card>
                <v-card  v-if="pool.Name == 'Exacta'" flat>                   
                  <v-card-text>
                    <exactabetslip :Race=race :PoolID=pool.Number></exactabetslip>
                  </v-card-text>
                </v-card>
                </v-tab-item>
              </v-tabs>
              <div>
                Loading
              </div>


   
  </v-container>
  </div>
</template>
<script>
export default {
  name: 'Race',
  component:{


  },
  data() {
    return {
      UID: null,
      addcolor: "grey",
      activeBtn: 1,
      showNav: true,
      hidden: false
    }
  },
  computed: {
    todaysraces: function () {
        return this.$store.getters.todaysraces;
      },
    racerunners: function () {
        return this.$store.getters.getRunnersByRaceUID(this.UID);
      },  
    race: function(){
      return this.todaysraces.find( item => item.UID == this.$route.params.UID );
    },
    
  },
  methods:{
    
  },
    created(){
    this.UID = this.$route.params.UID;   
  }
}
</script>
<style>

</style>