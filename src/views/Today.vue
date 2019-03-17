<template>
    <div>
      <div v-if="racecards != undefined">
      <v-container class="mt-1" grid-list-md pa-0>
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
      <v-layout row wrap v-if="racecard != undefined">
        <v-flex xs12 md12  v-for="meeting in racecard.Meetings" :key="meeting.number" flat >
          <div v-if="meetingvisible(meeting)">
            <v-layout row wrap  align-center justify-space-around  mx-2 my-1>
                <v-flex xs12 md3 mt-2 mb-1>
                  <div class="title mb-0 grey--text text--darken-2">
                    {{meeting.Name}}
                  </div>
                </v-flex>               
                <v-spacer></v-spacer>
                <div v-for="pool in meeting.MeetingPools" :key="pool.Number + '_' + pool.Number">
                <v-flex xs6 md2  class="text-xs-right" v-if="poolactive(pool, meeting)">
                  <v-btn 
                    :color="getpoolscolor(pool.Name)" 
                    class="text-none" 
                    flat small 
                    :to="getmeetingpoolslink(pool.Name, meeting.MeetingUID)"
                    >
                    <b>tote</b>{{pool.Name.toLowerCase()}}
                  </v-btn>
                </v-flex>
                </div>
              </v-layout>

              <v-layout row wrap align-center justify-space-left>
                <div v-for="myrace in meeting.Races" :key="myrace.number">
                  <v-flex xs3 md1 v-if="myrace.RacePoolsCount != 0">
                      <v-btn :color="getcolor(myrace.ScheduledStart)" class="body2" fab flat small v-ripple :to="getlink(myrace.RaceUID)">{{myrace.ScheduledStart}}
                      </v-btn>
                  </v-flex>
                </div>
              </v-layout>
          
          <v-divider></v-divider>
          </div>
        </v-flex>
        
      </v-layout>
      </v-container>
      </div>
      <v-content v-else>
          <div class="text-xs-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :width="3"
              color="red"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :width="3"
              color="green"
              indeterminate
            ></v-progress-circular>

            <v-progress-circular
              :size="50"
              color="amber"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-content>
    </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'home',
  computed: {
    racecards: function () {
      return this.$store.getters.getracecards;
    },
    racecard: function () {
        var date ='12-03-2019'
        if (this.racecards != undefined)
          return this.racecards.find( racecard => racecard.DataID == date);
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
        console.log(meeting)
        console.log(pool)
        let race = meeting.Races.find( race => race.number == firstleg);
        
        if (race != undefined)
          return this.racestatus(race.ScheduledStart);
        else
          {
            console.log("Race NOT FOUND!")
            return false;
          }
    },
    getlink(raceUID)
    {
      return "/race/" + raceUID;
    },
    getmeetingpoolslink(pool, meetingUID)
    {
      return "/" + pool + "/" + meetingUID;
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
<style scoped>
li a {
    text-decoration: none;
    }
</style>