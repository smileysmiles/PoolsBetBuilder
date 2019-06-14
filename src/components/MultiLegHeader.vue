<template>
<div v-if="meeting">
    <v-tabs dark color="primary" slider-color="accent">
    <v-tab v-for="(race, index) in races" :key="race.Race.Number" :href="'#tab-' + race.Race.Number">
      Leg {{ index +1 }}
    </v-tab>


    <v-tabs-items>
            
      <v-tab-item v-for="(race, index) in races" :key="race.Race.Number" :value="'tab-' +  race.Race.Number">
        <v-card flat>
          <v-card-text>
            <v-expansion-panel>
                <v-expansion-panel-content >
                    <v-layout slot="header" row wrap class="body-2">
                        <v-flex xs12 md12 >
                            <v-layout row wrap class="caption fill-height align-center justify-space-around">
                                <v-flex xs1 md1 >
                                    <span class="grey--text text--lighten-1">No.</span>
                                </v-flex>
                                <v-flex xs2 md1 >
                                    <span class="grey--text text--lighten-1">Silk</span>
                                </v-flex>
                                <v-flex xs6><span class="grey--text text--lighten-1">Name</span></v-flex>
                                <v-flex xs2 class="grey--text text--lighten-1">Place</v-flex>
                            </v-layout>                                     
                        </v-flex>
                    </v-layout>
                    <v-card pa-0>
                        <v-card-text class="grey lighten-5">
                            <h4>What is toteplacepot</h4>
                            <p>One of the most popular horse racing bets, where you can potentially win without backing a winner. Pick a horse to be placed in each of the six toteplacepot races(legs).</p>
                            <h4>Pick more horses to increase your chances</h4>
                            <p>You can choose just one horse in each race, although selecting two or more horses offers a greater chance of winning.</p>
                            <p>Total stake will be calculated by multiplying the number of selections in each leg as below.</p>
                            <h4>2 x 1 x 2 x 3 x 1 x 1 = 12 selections</h4>
                            <p>then multiply this by your chosen stake unit which must be more than 10 pence with a Total stake of at least £2</p>
                            <h4>12 x 50p = £6.00</h4>
                        </v-card-text>
                    </v-card>    
                </v-expansion-panel-content>
            </v-expansion-panel>

            <placepotrunners :raceuid="race.UID" :leg="index + 1"></placepotrunners>

          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
        
  </v-tabs>
</div>


</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return{
        }
    },
    computed:{
       ...mapGetters([ 'getPlacePotRaces' ]),
       races: function(){
           return this.getPlacePotRaces( this.meeting.UID )
       }       
    },
    props:[
        'meeting'
    ],
    methods:{
       
    }
}
</script>