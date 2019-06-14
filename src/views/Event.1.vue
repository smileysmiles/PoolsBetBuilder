  <template>
    <div>
      <v-container class="mt-1" pa-0>
        <v-layout row wrap>
          <v-flex xs12 class="secondary px-2">
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
              light
              ></v-select>
          </v-flex>
        
          <v-flex xs12 v-if="selectedMeeting">
            <template v-if="meetingPoolTabs.length == 1">
                <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="meetingPoolTabs[0]=='Placepot'" flat>

                    <placepot :meeting="selectedMeeting" :pooluid="pooluid(meetingPoolTabs[0])"></placepot>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="meetingPoolTabs[0]=='Jackpot'" flat>
                    
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="meetingPoolTabs[0]=='Quadpot'" flat>
                    
                  </v-card>
            </template>
            <template v-else>
              
            <v-tabs grow  color="secondary" light slider-color="accent">
              
              <v-tab v-for="item in meetingPoolTabs" :key="item" ripple>
                {{item}}
              </v-tab>
                <v-tab-item v-for="item in meetingPoolTabs" :key="item">
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Placepot'" flat>
                    <placepot :meeting="selectedMeeting" :pooluid="pooluid(item)"></placepot>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Jackpot'" flat>
                    
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="item=='Quadpot'" flat>
                    
                  </v-card>
                </v-tab-item>
          </v-tabs>
            </template>
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
      race: "null"
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
        let tabs = pools.map( pool => {
          return pool.pool
        })
        return tabs;
      }
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
      this.$router.push('/Meeting/' + event)
    },
    formattime: function(time)
    {
      console.log
      return moment(time, "HHmm").format("HH:mm");
    },
    pooluid: function(poolname)
    {
      let pools = this.getPoolRaces( this.selectedMeeting.UID );
      let pooluid = pools.find( pool => pool.pool == poolname );
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
<style>
.container{
  padding:0
}
</style>