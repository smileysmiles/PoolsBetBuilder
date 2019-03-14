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
                <v-expansion-panel-content>
                <v-layout slot="header" row wrap class="body-2">
                    <v-flex xs12 md12 >
                        <v-layout row wrap class="caption fill-height align-center justify-space-around">
                            <v-flex xs1 md1 >
                                <span class="grey--text text--lighten-1">No.</span>
                            </v-flex>
                            <v-flex xs1 md1 >
                                <span class="grey--text text--lighten-1">Silk</span>
                            </v-flex>
                            <v-flex xs4><span class="grey--text text--lighten-1">Name</span></v-flex>
                            <v-flex xs1 class="grey--text text--lighten-1">Place</v-flex>
                        </v-layout>                                     
                    </v-flex>

                </v-layout>
                            <v-card pa-0>
                    <v-card-text class="grey lighten-5">
                        <p>Pick at least one horse in each race.</p>

                    </v-card-text>
                </v-card>    
                </v-expansion-panel-content>
            </v-expansion-panel>
 <v-expansion-panel>
    <v-expansion-panel-content v-for="runner in race.Runners" :key="'runner' + runner.UID" >
            <v-layout slot="header" row wrap class="subheading fill-height align-center justify-space-around">
            <v-flex xs1 md1>
                <span>{{runner.Number}}</span><!--<span v-if="runner.racingpostdata != undefined">({{runner.racingpostdata.start_number}})</span>-->
            </v-flex>
            <v-flex xs1 md1>
                <v-avatar size="25" tile>
                
                <img v-if="runner.racingpostdata != null" :src="runner.racingpostdata.silk_image_png" />
                <img v-else src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                </v-avatar>
            </v-flex>
            <v-flex xs4  class="font-weight-bold">{{runner.Name}}</v-flex>
            <v-flex xs1>
                <v-checkbox v-model="selections" :value="runner.UID" @click.native.stop>
                </v-checkbox>
            </v-flex>                   
            </v-layout>    
            <v-card pa-0>
        <v-card-text v-if="runner.racingpostdata != null" class="grey lighten-3">{{runner.racingpostdata.spotlight}}</v-card-text>
        <v-card-text v-else class="grey lighten-3">No Racing Post Data Available</v-card-text>
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
        ...mapGetters([ 'selectedMeeting' ]),
    },
}
</script>