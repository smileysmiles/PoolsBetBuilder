  <template>
    <div>
      <v-container class="mt-1" pa-0>
        <v-layout row wrap>
          <v-flex xs12 class="primary px-2">
            <v-select
              v-if="todaysMeetings"
              v-model="course"
              :items="todaysMeetings"
              item-text="Meeting.Name"
              item-value="Meeting.Name"
              label="Todays Meetings"
              @change="changeRoute"
              color="accent"
              class="mx-2 mt-4 white--text"
              dark
              ></v-select>
          </v-flex>
        
          <v-flex xs12>
            <v-tabs grow v-if="selectedMeetingRaces" color="secondary" light slider-color="accent">
              <v-tab v-for="item in pageTabs" :key="item" ripple>
                {{item}}
              </v-tab>
                <v-tab-item v-for="item in pageTabs" :key="item">
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Todays Races'" flat>
                    <todayscourseraces :selectedMeetingRaces="selectedMeetingRaces"></todayscourseraces>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Course Info'" flat  class="justify-center">
                    <v-img
                      :src="viaJs"
                      class="grey lighten-2"
                      aspect-ratio="3"
                      max-width="607"
                    >
                    </v-img>         
                    <v-card-text>
                      <v-container row wrap>
                        <v-layout>
                          <v-flex xs6 color="primary"></v-flex>
                          <v-flex xs6></v-flex>
                        </v-layout>
                      </v-container>
                      <v-btn href="https://tickets.wolverhampton-racecourse.co.uk/shop/cart.pl?myaction=choose_event" target="_blank">GET TICKETS</v-btn>
                    </v-card-text>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Placepot'" flat>
                    <placepot :meeting="selectedMeeting" :pooluid="pooluid(item)"></placepot>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Jackpot'" flat>
                    <todayscourseraces :selectedMeetingRaces="selectedMeetingRaces"></todayscourseraces>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Quadpot'" flat>
                    <todayscourseraces :selectedMeetingRaces="selectedMeetingRaces"></todayscourseraces>
                  </v-card>
                </v-tab-item>
          </v-tabs>
          </v-flex>

          <v-flex xs12>
          
          </v-flex>
<!-- 
      <v-select
                    v-if="selectedMeetingRaces"
                    v-model="race"
                    :items="selectedMeetingRaces"
                    item-text="Race.Number"
                    item-value="UID"
                    label="races"
                    hide-selected
                    light
                    ></v-select> -->
      </v-layout>
      </v-container>
    </div>
</template>
<script>
import moment from 'moment';
 import { mapGetters, mapActions } from 'vuex'
 import TodaysCourseRaces from '../components/TodaysCourseRaces.vue'

export default {
  name: 'Event',
  data() {
    return {
      viaJs: require('@/assets/haydock.jpg') ,
      course: "null",
      race: "null",
      courseTabs:["Todays Races", "Course Info"]
    }
  },
  components:{
     'todayscourseraces' : TodaysCourseRaces
  },
  computed: {
    ...mapGetters([ 'getTodaysMeetings', 'getMeetingRaces', 'getRaceRunners', 'getPoolRaces' ]),
    todaysMeetings: function () {
        return this.getTodaysMeetings;
    },
    selectedMeeting: function(){
      return this.todaysMeetings.find( meeting => meeting.Meeting.Name == this.course)
    },
    meetingPoolTabs:function(){
      let pools = this.getPoolRaces( this.selectedMeeting.UID );
      if(pools)
      {
        let tabs = pools.poolsRaces.map( pool => {
          return pool.pool
        })
        return tabs;
      }
    },
    pageTabs: function(){
      if(this.selectedMeeting)
      {
        if (this.meetingPoolTabs)
          return [...this.courseTabs, ...this.meetingPoolTabs]
        else
        return this.courseTabs;
      }
    },
    selectedMeetingRaces: function(){
      if(this.selectedMeeting)
        return this.getMeetingRaces( this.selectedMeeting.UID )
    },
    selectedRace: function(){
      return this.selectedMeetingRaces.find( race => race.UID == this.race)
    },
    selectedRaceRunners: function(){
      if(this.selectedRace)
        return this.getRaceRunners( this.selectedRace.UID )
    }
  },
  async created () {
    this.course = this.$route.params.course
    await this.$store.dispatch('getTodaysCourseData', this.course);
    console.log("Data Loaded")
  },
  methods:{
    changeRoute: function(event){
      console.log(event);
      this.$router.push('/Today/' + event)
    },
    formattime: function(time)
    {
      console.log
      return moment(time, "HHmm").format("HH:mm");
    },
    pooluid: function(poolname)
    {
      let pools = this.getPoolRaces( this.selectedMeeting.UID );
      let pooluid = pools.poolsRaces.find( pool => pool.pool == poolname );
      return pooluid.uid;
    }
  },
  watch:{
    '$route' (to, from){
      this.course = this.$route.params.course
      this.$store.dispatch('getTodaysCourseData', this.course);
    }
  }
}
</script>