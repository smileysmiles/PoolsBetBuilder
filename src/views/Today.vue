<template>
    <div>
      <v-container class="my-5" grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 offset-sm3>
          <v-card flat class="grey lighten-3" pa-3>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0 Grey--text text--lighten-2">Today's Racing</h3>
              </div>
            </v-card-title>

      <v-layout row wrap justify-center>
        <v-flex xs11 v-for="meeting in racecard.Meetings" :key="meeting.number">
          <v-card class="grey lighten-5 grey--text text--darken-2">
            <v-card-title primary-title>
              <div>
                <div class="mb-0 Grey--text text--lighten-2 d-inline">{{meeting.Name}}</div><div class="d-inline"> ( {{getstatus(meeting.MeetingStatus)}} )</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-layout row wrap >
                <v-flex xs4 md2 v-for="myrace in meeting.Races" :key="myrace.Number">
                    <v-btn flat small color="green" :to="getlink(myrace.Off)">{{myrace.Off}}</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
        
      </v-layout>
                </v-card>
        </v-flex>

      </v-layout> 

      </v-container>
    </div>
</template>
<script>
export default {
  name: 'home',
  computed: {
    racecard: function () {
        return this.$store.getters.racecard;
      }
  },
  methods:{
    getlink(date)
    {
      return "/race/" + date;
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
        case 6:
          return "POSTPONED"
        case 6:
          return "RESCHEDULED"
      }

    }

  }

}
</script>