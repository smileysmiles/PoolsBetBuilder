<template>
    <div>
      <v-container class="mt-5" grid-list-md pa-0>
      <v-layout row wrap>
        <v-flex xs12 md12>
          <v-card flat class="" ma-1>
            <v-card-title title>
                <h5 class="headline mb-0 Grey--text text--lighten-2">Today's Racing</h5>
            </v-card-title>
          </v-card>
         <v-divider></v-divider>
        </v-flex>
      </v-layout> 
      <v-layout row wrap>
        <v-flex xs12 md12  v-for="meeting in racecard.Meetings" :key="meeting.number" flat>
            <v-layout row wrap  align-center justify-space-around v-if="meetingvisible(meeting)" mx-2 my-1>
                <v-flex xs12 md3 mt-2 mb-1>
                  <div class="title mb-0 grey--text text--darken-2">
                    {{meeting.Name}}
                  </div>
                </v-flex>               
                <v-spacer></v-spacer>
                <div v-for="pool in meeting.MeetingPools" :key="meeting.Number + '_' + pool.Number">
                <v-flex xs6 md2  class="text-xs-right" v-if="poolactive(pool, meeting)">
                  <v-btn 
                    :color="getpoolscolor(pool.Name)" 
                    class="text-none" 
                    flat small 
                    :to="getlink(pool.Name)"
                    >
                    <b>tote</b>{{pool.Name.toLowerCase()}}
                  </v-btn>
                </v-flex>
                </div>
              </v-layout>

              <v-layout row wrap align-center justify-space-left>
                <div v-for="myrace in meeting.Races" :key="myrace.Number">
                  <v-flex xs3 md1 v-if="myrace.RacePoolsCount != 0">
                      <v-btn :color="getcolor(myrace.ScheduledStart)" class="body2" fab flat small v-ripple :to="getlink(myrace.RaceUID)">{{myrace.ScheduledStart}}
                      </v-btn>
                  </v-flex>
                </div>
              </v-layout>
          
          <v-divider></v-divider>
        </v-flex>
        
      </v-layout>
      </v-container>
    </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'home',
  computed: {
    racecard: function () {
        return this.$store.getters.racecard;
      }
  },
  methods:{
    racestatus(time)
    {
      var racetime = moment(time,"HH:mm");
      var nowtime = moment();

      if ( nowtime.isSameOrAfter( racetime ))
        return false;
      else
        return true;
    },
    getpoolscolor(name)
    {
      switch (name.toLowerCase()){
        case "placepot":
          return "blue";
        case "quadpot":
          return "cyan";
        case "treble":
          return "purple";
        case "double":
          return "pink";
        case "jackpot":
          return "red";


            }
    },
    getcolor(time)
    {     
      if (!this.racestatus(time))
        return "red";
      else
        // console.log (time + " ----- " + racetime.format("HH:MM") + "is not before " + nowtime.format("HH:MM") )
        return "green";
    },
    meetingvisible(meeting)
    {
      if(meeting.Name.toLowerCase() == "scoop6")
        return false;
      else return true;
    },
    poolactive(pool, meeting)
    {
        let firstleg = pool.FirstLeg;
        let race = meeting.Races.find( race => race.number == firstleg);
        console.log(meeting.Name + "_" + pool.Name + "_"+ firstleg + "_" + race.ScheduledStart )
        return this.racestatus(race.ScheduledStart);
    },
    getlink(raceUID)
    {
      return "/race/" + raceUID;
    },
    getstatus(statusid)
    {
      switch (statusid){
        case 3:
          return "ON"
        case 4:
          return "ABANDONED"
        case 5:
          return "CANCELLED"
        case 6:
          return "DELAYED"
        case 7:
          return "RESCHEDULED"
       }

    }

  }

}
</script>
<style>
li a {
    text-decoration: none;
    }
</style>