<template>
     <v-expansion-panel>
    <v-expansion-panel-content v-for="runner in runners(race.RaceUID)" :key="'runner' + runner.UID" >
            <v-layout slot="header" row wrap class="subheading fill-height align-center justify-space-around">
            <v-flex xs1 md1>
                <span>{{runner.Number}}</span>
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
            <racingpostrunnerinfo :runneruid="runner.UID" ></racingpostrunnerinfo>           
     
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name:"RacingPostRunnerInfo",
    data (){
        return{
        }
    },
    computed: {
        ...mapGetters([ 'todaysrunners', 'getRunnersByRaceUID' ]),
        runners: function(){
            return  this.getRunnersByRaceUID(this.race.UID);
        }
    },
    props: [    
            'race'
            ]
}

</script>

