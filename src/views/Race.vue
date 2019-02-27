<template>
      <v-container class="about" mt-5 pa-0>
        
            <v-tabs dark slider-color="white">
                <v-tab v-for="pool in race.Race.RacePools" :key="pool.Number" ripple dark>
                  {{ pool.Name }}
                </v-tab>
                <v-tab-item v-for="pool in race.Race.RacePools" :key="'pool' + pool.Number">
                  
                  <v-card  v-if="pool.Name == 'Win'" flat mt-5>                   
                    <v-card-text>
                      <winbetslip :Race=race></winbetslip>
                    </v-card-text>
                  </v-card>
                <v-card  v-if="pool.Name == 'Place'" flat>                   
                  <v-card-text>
                    <placebetslip :Race=race></placebetslip>
                  </v-card-text>
                </v-card>
                <v-card  v-if="pool.Name == 'Exacta'" flat>                   
                  <v-card-text>
                    <exactabetslip :Race=race></exactabetslip>
                  </v-card-text>
                </v-card>
                </v-tab-item>
              </v-tabs>


   
  </v-container>
  
</template>
<script>
export default {
  name: 'home',
  component:{

  },
  data() {
    return {
      UID: 0,
      addcolor: "grey",
      activeBtn: 1,
      showNav: true,
      hidden: false
    }
  },
  computed: {
    races: function () {
        return this.$store.getters.races;
      },   
    race: function(){
      return this.races.Items.find( item => item.UID == this.$route.params.UID );
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