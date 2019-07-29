  <template>
    <div>
      <v-container pa-0>
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
              light
              ></v-select>
          </v-flex>

        <template v-if="races">
          <v-flex xs12 >
            <v-layout row wrap  class="pb-2 pt-3" justify-space-around>
            <v-flex xs1 v-for="(race, index) in races" :key="race.Race.Number"  class="text-xs-center mb-2">
                <v-avatar v-if="isselected(index+ 1)"  :color="avatarcolor(index+1)" size="40" @click="selected = index + 1">
                    <span  class="caption primary--text font-weight-black">{{ race.ScheduledTime }}</span>
                </v-avatar>
                <v-avatar v-else :color="avatarcolor(index+1)" size="40" @click="selected = index + 1">
                    <span  class="caption white--text">{{ race.ScheduledTime }}</span>
                </v-avatar>
            </v-flex> 
            </v-layout> 
            
          </v-flex>

          <race :UID="selectedRace.UID"></race>
          </template>
      </v-layout>
      </v-container>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Races',
  data() {
    return {
      course: null,
      selected: 1
    }
  },
  computed: {
    ...mapGetters([ 'getTodaysMeetings', 'getMeetingRaces' ]),
    todaysMeetings: function () {
        return this.getTodaysMeetings;
    },
    selectedMeeting: function(){
      return this.todaysMeetings.find( meeting => meeting.Meeting.Name == this.course)
    },
    selectedRace:function(){
      console.log("Selected Race - ", this.races[this.selected-1])
      if(this.selected > 0)
        return this.races[this.selected-1]
      return null;
    },
    races: function(){
      if(this.selectedMeeting)
        return this.getMeetingRaces(this.selectedMeeting.UID)
      
      return null;
    }
  },
  async created () {
    this.course = this.$route.params.course
    await this.$store.dispatch('getTodaysCourseData', this.course);
    console.log("Data Loaded")
  },
  methods:{
    isselected( index ){
      if( this.selected == index)
        return true;

      return false;
    },
    avatarcolor(index){
      if (this.isselected(index))
        return "accent";

      return "secondary";
    },
    changeRoute: function(event){
      console.log(event);
      this.$router.push('/Races/' + event)
    },
    formattime: function(time)
    {
      let hours = time.substring(0, 2)
      let minutes = time.substring(2,2)
      return `${hours}:${minutes}`
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