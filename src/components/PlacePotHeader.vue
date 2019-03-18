<template>
<div>
    <v-tabs dark show-arrows>
    <v-tabs-slider color="white"></v-tabs-slider>   
    <v-tab v-for="race in selectedMeeting.Races" :key="race.number" :href="'#tab-' + race.number">
      Leg {{ race.number }}
    </v-tab>

    <v-tabs-items>
      <v-tab-item v-for="race in selectedMeeting.Races" :key="race.number" :value="'tab-' +  race.number">
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
 <v-expansion-panel>
    <v-expansion-panel-content v-for="runner in runners(race.RaceUID)" :key="'runner' + runner.UID" >
            <v-layout slot="header" row wrap class="subheading fill-height align-center justify-space-around">
            <v-flex xs1 md1>
                <span>{{runner.Number}}</span><!--<span v-if="runner.racingpostdata != undefined">({{runner.racingpostdata.start_number}})</span>-->
            </v-flex>
            <v-flex xs2 md1>
                <v-avatar size="25" tile>
                
                <img v-if="runner.racingpostdata != null" :src="runner.racingpostdata.silk_image_png" />
                <img v-else src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                </v-avatar>
            </v-flex>
            <v-flex xs6  class="font-weight-bold">{{runner.Name}}</v-flex>
            <v-flex xs2>
                <v-checkbox v-model="selections" :value="runner" @click.native.stop>
                </v-checkbox>
            </v-flex>                   
            </v-layout>    
     <v-card>
        <v-card-text class="grey lighten-3"><div class="pa-2">{{runner.racingpostdata.spotlight}}</div>

        <v-layout  slot="header" row wrap class="body-2" pa-2>
            <v-flex xs12 md12 >
                <v-layout row wrap class="caption fill-height align-left ">
                    <v-flex xs3 md2 class="text-md-right" py-2>
                        <span class="grey--text text--lighten-1">Jockey :</span>
                    </v-flex>
                    <v-flex xs3  md2 class="text-md-left" py-2>
                        <span class="grey--text text--darken-3 text-md-center">{{runner.racingpostdata.jockey_name}}</span>
                    </v-flex>
                    <v-flex xs3  md2 class="text-md-right" py-2>
                        <span class="grey--text text--lighten-1">Trainer :</span>
                    </v-flex>
                    <v-flex xs3  md2 class="text-md-left" py-2>
                        <span class="grey--text text--darken-3">{{runner.racingpostdata.trainer_stylename}}</span>
                    </v-flex>
                    
                    <v-flex xs3 md2 class="text-md-right" py-2><span class="grey--text text--lighten-1">Owner :</span></v-flex>
                    <v-flex xs3 md2 class="text-md-left" py-2><span class="black--text text--darken-3">{{runner.racingpostdata.owner_name}}</span></v-flex>
                       <v-flex xs3 md2 class="text-md-right" py-2>
                        <span class="grey--text text--lighten-1">14 day form :</span>
                    </v-flex >
                    <v-flex xs3 md2 class="text-md-left" py-2>
                        <span class="grey--text text--darken-3">{{runner.racingpostdata.jockey_last_14_days.wins}} wins in {{runner.racingpostdata.jockey_last_14_days.runs}} runs</span>
                    </v-flex>
                </v-layout>              
            </v-flex>                     
        </v-layout>
        </v-card-text>
      </v-card>                              
                </v-expansion-panel-content>
  </v-expansion-panel>

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
            selections:[]
        }
    },
    computed: {
        ...mapGetters([ 'selectedMeeting', 'getRunnersByRaceUID' ]),
    
    },
    methods:{
runners: function(uid){
        
    return  this.getRunnersByRaceUID(uid);
    },
    }
}
</script>