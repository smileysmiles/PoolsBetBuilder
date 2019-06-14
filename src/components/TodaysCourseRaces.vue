<template>
    <div>
        <v-expansion-panel light>
                  <v-expansion-panel-content>
                  <v-container slot="header"  row wrap >
                    <v-layout>
                      <v-flex xs1>
                        No.
                      </v-flex>
                      <v-flex xs2>
                        Time
                      </v-flex>
                      <v-flex xs4>
                        Desc.                      
                      </v-flex>
                      <v-flex xs2>
                        Runner Count
                      </v-flex>
                      <v-flex xs2>
                        Dist. Yds
                      </v-flex>
                      <v-flex xs1>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                  <v-expansion-panel light>
                  <v-expansion-panel-content v-for="race in selectedMeetingRaces" :key="race.UID">
                    <v-container  slot="header" row wrap>
                      <v-layout>
                        <v-flex xs1>
                          {{race.Race.Number}}
                        </v-flex>
                        <v-flex xs2>
                          {{formattime(race.Race.RaceTime)}}
                        </v-flex>
                        <v-flex xs4>
                          {{race.Race.Description}}
                        </v-flex>
                        <v-flex xs2>
                          {{race.Race.RunnerCount}}
                        </v-flex>
                        <v-flex xs2>
                          {{race.Race.DistanceYards}}
                        </v-flex>
                        <v-flex xs1>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-expansion-panel-content>
                  </v-expansion-panel>
    </div>
</template>
<script>
import moment from 'moment';


export default {
    name:"TodaysCourseRaces",
    data (){
        return{
        }
    },
    computed: {
    },
      methods:{
    formattime: function(time)
    {
      console.log
      return moment(time, "HHmm").format("HH:mm");
    }
  },
    props: [    
            'selectedMeetingRaces'
            ]
}

</script>

