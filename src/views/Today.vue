<template>
    <div>
      <template v-if="racecard">
        <v-container class="mt-1">
          <v-layout row wrap justify-space-around>
            <v-flex xs12 md5 v-for="meeting in racecard.Meetings" :key="meeting.number" class="mb-3">
              <template v-if="meeting.MeetingStatus == actioncodes.on ">
                  <v-card height="100%" flat class="rounded-card" outline>
                    <v-card-title class="secondary pa-1">
                      <v-btn round color="primary" class="text-none" flat :to="MeetingURI(meeting.Name)">
                        <h3>{{meeting.Name}}</h3> 
                      </v-btn>  
                    </v-card-title>
                    <v-card-text class="grow">
                    <v-layout row wrap align-space-around justify-space-around fill-height="true">
                      <div v-for="pool in meeting.MeetingPools" :key="meeting.number + '_pool_' + pool.Number">
                        <v-flex xs3 md2  class="text-xs-right" >
                          <v-btn :color="getpoolscolor(pool.Name)" :disabled="poolactive(pool, meeting)" class="text-none" outline flat :to="MultiLegPoolLink(meeting.Name, pool.Name)" round>
                            <b>tote</b>{{pool.Name.toLowerCase()}}
                          </v-btn>
                        </v-flex>
                      </div>
                    </v-layout>
                    </v-card-text>
                      <v-layout row wrap align-end justify-space-around>
                          <v-flex xs4 md3 align-content-center v-for="myrace in meeting.Races" :key="myrace.number" class="text-xs-center">
                              <v-btn :color="getcolor(myrace.Status)" class="body2" fab flat small v-ripple :to="getlink(myrace.RaceUID)">{{myrace.ScheduledTime}}
                              </v-btn>
                          </v-flex>
                      </v-layout>

                      </v-card>
                      </template>
                    </v-flex>               
                    
                  </v-layout>
              

        </v-container>
      </template>
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
import { mapGetters, mapActions } from 'vuex'
import { ActionCodes } from '../store/constants'

export default {
  name: 'Today',
  computed: {
    ...mapGetters([ 'gettodaysracecard' ]),
    racecard: function () {
        return this.gettodaysracecard;
      },
    actioncodes: function(){
      return ActionCodes;
    }
  },
  methods:{
    racestatus(status)
    {
      if (status == this.actioncodes.on)
        return true;

      return false;
    },
    MeetingURI(meeting)
    {
      return `Meeting/${meeting}`;
    },
    MultiLegPoolLink(meeting, pool)
    {
      return `Meeting/${meeting}`;
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
    getcolor(status)
    {     
      if (!this.racestatus(status))
        return "red";
      else
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
      //1 Check pool status

      if (pool.status != this.actioncodes.on)
        return false;
      
      //2 Lets also lock out based on race status.
        let firstleg = pool.FirstLeg;
        let race = meeting.Races.find( race => race.Number == firstleg);
        
        console.log(race.status)
        if (race.status != this.actioncodes.on)
          return false;

      //3

        return true
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

  },
    async created () {
      this.course = this.$route.params.course
      await this.$store.dispatch('getTodaysRacecard');
      console.log("Data Loaded")
  }

}
</script>
<style scoped>
li a {
    text-decoration: none;
}

.rounded-card{
    border-radius:5px;
}
</style>