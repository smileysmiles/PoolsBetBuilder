<template>
    <div>
    <v-layout row wrap class="body-2">
        <v-flex xs12 md12 >
            <v-layout row wrap class="caption fill-height align-center justify-space-around">
                <v-flex xs1 md1>
                    <span class="grey--text text--lighten-1">No.</span>
                </v-flex>
                <v-flex xs1 md1 >
                    <span class="grey--text text--lighten-1">Silk</span>
                </v-flex>
                <v-flex xs4><span class="grey--text text--lighten-1">Name</span></v-flex>
                <v-flex xs4>
                    <span class="grey--text text--lighten-1">Place</span>
                </v-flex>
            </v-layout>                         
            <v-divider></v-divider>
        </v-flex>                     
    </v-layout>
    <v-layout row wrap class="body-2">
        <v-flex xs12 md12 v-for="runner in Race.Race.Runners" :key="'runner' + runner.Number">
            <v-layout row wrap class="subheading fill-height align-center justify-space-around">
            <v-flex xs1 md1>
                <span>{{runner.Number}}</span>
            </v-flex>
            <v-flex xs1 md1>
                <v-avatar size="30" tile>
                <img src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                </v-avatar>
            </v-flex>
            <v-flex xs4  class="font-weight-bold">{{runner.Name}}</v-flex>
            <v-flex xs4>
                <v-checkbox v-model="selectedplaced" :value="runner.RunnerUID" @change="togglebets(Race.MeetingUID, Race.UID, runner.RunnerUID)">
                </v-checkbox>
            </v-flex>           
            </v-layout>                         
            <v-divider></v-divider>
        </v-flex>                     
    </v-layout>
    </div>
</template>
<script>
export default {
    name:"WinBetslip",
    data (){
        return{
            selectedplaced:[]
        }
    },
    props: [    
            'Race'
            ],
    computed: {
    placebets: function() {
        return this.$store.getters.placebets;
      },
    },
    methods:{
    togglebets: function( meetingUID, raceUID, runnerUID )
    {     
      let arr =[];
      if (this.placebets !== undefined) 
      {
        arr = this.placebets.filter(item => item.runner !== runnerUID);
        if ( this.placebets.length == arr.length )
        {
          arr.push( { meeting : meetingUID, race : raceUID, runner : runnerUID });
        }
      }
      else
      {
        arr.push( { meeting : meetingUID, race : raceUID, runner : runnerUID });
      }
    
      this.$store.commit('SET_PLACEBETS', arr)
    },
  },
    created(){
    this.UID = this.$route.params.UID;   
    this.selectedplaced = this.placebets.filter(item => item.race == this.UID).map(bet => bet.runner);
  }
}
</script>