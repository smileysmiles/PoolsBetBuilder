<template>
    <div>
    <v-layout row wrap class="body-2">
        <v-flex xs12 md12 >
            <v-layout row wrap class="caption fill-height align-center justify-space-around">
                <v-flex xs1 md1 >
                    <span class="grey--text text--lighten-1">Number</span>
                </v-flex>
                <v-flex xs2 md1 >
                    <span class="grey--text text--lighten-1">Silk</span>
                </v-flex>
                <v-flex xs5><span class="grey--text text--lighten-1">Name</span></v-flex>
                <v-flex xs1>
                    <span class="grey--text text--lighten-1">WIN</span>
                </v-flex>
            </v-layout>                         
            <v-divider></v-divider>
        </v-flex>                     
    </v-layout>
    {{Race}}
    <v-layout row wrap class="body-2">
        <v-flex xs12 md12 v-for="runner in Race.Race.Runners" :key="'runner' + runner.Number">
            <v-layout row wrap class="headline fill-height align-center justify-space-around">
            <v-flex xs1 md1>
                <span>{{runner.Number}}</span>
            </v-flex>
            <v-flex xs2 md1>
                <v-avatar size="35" tile>
                <img src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                </v-avatar>
            </v-flex>
            <v-flex xs5  class="font-weight-bold">{{runner.Name}}</v-flex>
            <v-flex xs1>
                <v-checkbox v-model="selectedwinners" :value="runner.RunnerUID" @change="togglebets(Race.MeetingUID, Race.UID, runner.RunnerUID)">
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
            selectedwinners:[]
        }
    },
    props: [    
            'Race'
            ],
    computed: {
    winbets: function() {
        return this.$store.getters.winbets;
      },
    },
    methods:{
    togglebets: function( meetingUID, raceUID, runnerUID )
    {     
      let arr =[];
      if (this.winbets !== undefined) 
      {
        arr = this.winbets.filter(item => item.runner !== runnerUID);
        if ( this.winbets.length == arr.length )
        {
          arr.push( { meeting : meetingUID, race : raceUID, runner : runnerUID });
        }
      }
      else
      {
        arr.push( { meeting : meetingUID, race : raceUID, runner : runnerUID });
      }
    
      this.$store.commit('SET_WINBETS', arr)
    },
  },
    created(){
    this.UID = this.$route.params.UID;   
    console.log(this.winbets);
    console.log(this.UID);
    this.selectedwinners = this.winbets.filter(item => item.race == this.UID).map(bet => bet.runner);
  }
}
</script>