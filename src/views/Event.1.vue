  <template>
    <div>
      
      <v-container pa-0>
        <v-layout row wrap>
          <v-flex xs7 class="white px-2">
            <v-select
              v-if="todaysMeetings"
              v-model="course"
              :items="todaysMeetings"
              item-text="Meeting.Name"
              item-value="Meeting.Name"
              label="Todays Meetings"
              @change="changeRoute"
              color="accent"
              class="mx-1 mt-2 white--text body-2"
              light
              ></v-select>
          </v-flex>

          <v-flex xs5 class="white px-2">
            <v-select
              v-if="meetingPoolTabs"
              v-model="selectedpool"
              :items="meetingPoolTabs"
              item-text="item"
              item-value="item"
              label="Meeting Pools"
              color="accent"
              class="mx-1 mt-2 white--text body-2"
              light
              ></v-select>
          </v-flex>

          <v-flex xs12 v-if="selectedMeeting && !loading">
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="selectedpool=='Placepot'" flat>
                    <placepot :meeting="selectedMeeting" :pooluid="pooluid(selectedpool)"></placepot>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="selectedpool=='Jackpot'" flat>
                    <jackpot :meeting="selectedMeeting" :pooluid="pooluid(selectedpool)"></jackpot>
                  </v-card>
                  <!-- ****************************** START TAB ***************************************** -->
                  <v-card v-if="selectedpool=='Quadpot'" flat>
                    <quadpot :meeting="selectedMeeting" :pooluid="pooluid(selectedpool)"></quadpot>
                  </v-card>
          </v-flex>
          <v-flex xs12 v-if="loading">
            <loading></loading>
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
import Jackpot from '../components/Jackpot.vue'
import Quadpot from '../components/Quadpot.vue'

export default {
  name: 'Event',
  data() {
    return {
      viaJs: require('@/assets/haydock.jpg') ,
      course: "null",
      race: "null",
      selectedpool:"Placepot",
      loading:false
    }
  },
  components:{
     'todayscourseraces' : TodaysCourseRaces,
     'jackpot' : Jackpot,
     'quadpot' : Quadpot,
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
    this.loading = true
    this.course = this.$route.params.course
    await this.$store.dispatch('getTodaysCourseData', this.course);
    console.log("Data Loaded")
    this.loading = false
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
      this.loading = true;
      console.log("TO", to)
      console.log("from", from)
      if(from.params.course != to.params.course )
      {
        this.selectedpool = "Placepot"
        this.course = to.params.course;
        this.$store.dispatch('getTodaysCourseData', to.params.course).then(() => {
          this.loading = false;
        })        
      }
      
    }

  }
}
</script>
<style>
.container{
  padding:0
}
</style>
