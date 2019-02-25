<template>
      <v-container class="about" mt-5 pa-0>
            <v-tabs dark slider-color="white">
                <v-tab v-for="pool in race.Race.RacePools" :key="pool.Number" ripple dark>
                  {{ pool.Name }}
                </v-tab>
                <v-tab-item v-for="pool in race.Race.RacePools" :key="'pool' + pool.Number">
                  <v-card  v-if="pool.Name == 'Win'" flat>                   
                    <v-card-text>


                    <!-- <v-layout row wrap class="body-2">
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
                    <v-layout row wrap class="body-2">
                      <v-flex xs12 md12 v-for="runner in race.Race.Runners" :key="'runner' + runner.Number">
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
                              <v-checkbox v-model="selectedwinners" :value="runner.RunnerUID" @change="togglebets(race.MeetingUID, race.UID, runner.RunnerUID)">
                              </v-checkbox>
                            </v-flex>
                            
                          </v-layout>                         
                          <v-divider></v-divider>
                      </v-flex>                     
                    </v-layout> -->
                      <winbetslip :Race=race></winbetslip>

                    </v-card-text>
                  </v-card>
                  <!-- Create components -->
                  <!-- <div  v-if="pool.Name == 'Place'" >
                    <v-layout row wrap>
                      <v-flex xs12 md12 v-for="runner in race.Race.Runners" :key="'runner' + runner.Number">
                        <v-card flat text-xs-center class="white ma-1 pa-3">
                          <v-layout row wrap class="title">
                            <v-flex xs2><div class="py1">{{runner.Number}}</div></v-flex>
                            <v-flex xs2 md1>
                              <v-avatar size="30" tile>
                                <img src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                              </v-avatar>
                            </v-flex>
                            <v-flex xs4 md2 my5>{{runner.Name}}</v-flex>
                            <v-flex xs4 md8></v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </div> -->
                  <!-- Create components -->
                  <!-- <div  v-if="pool.Name == 'Exacta'" class="grey lighten-3">
                    <v-layout row wrap>
                      <v-flex xs12 md12 v-for="runner in race.Race.Runners" :key="'runner' + runner.Number">
                        <v-card flat text-xs-center class="white ma-3 pa-2">
                          <v-layout row wrap class="title">
                            <v-flex xs2><div class="py1">{{runner.Number}}</div></v-flex>
                            <v-flex xs2 md1>
                              <v-avatar size="30" tile>
                                <img src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                              </v-avatar>
                            </v-flex>
                            <v-flex xs4 md2 my5>{{runner.Name}}</v-flex>
                            <v-flex xs4 md8></v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </div> -->
                  <!-- Create components -->
    <!--               <div  v-if="pool.Name == 'Trifecta'" class="grey lighten-3">
                  <v-layout row wrap>
                    <v-flex xs12 md12 v-for="runner in race.Race.Runners" :key="'runner' + runner.Number">
                      <v-card flat text-xs-center class="white ma-3 pa-2">
                        <v-layout row wrap class="title">
                          <v-flex xs2><div class="py1">{{runner.Number}}</div></v-flex>
                          <v-flex xs2 md1>
                            <v-avatar size="30" tile>
                              <img src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                            </v-avatar>
                          </v-flex>
                          <v-flex xs4 md2 my5>{{runner.Name}}</v-flex>
                          <v-flex xs4 md8></v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </div> -->
                  <!-- Create components -->
    <!--                   <div  v-if="pool.Name == 'Swinger'" class="grey lighten-3">
                        <v-layout row wrap>
                          <v-flex xs12 md12 v-for="runner in race.Race.Runners" :key="'runner' + runner.Number">
                            <v-card flat text-xs-center class="white pa-2">
                              <v-layout row wrap class="title">
                                <v-flex xs2><div class="py1">{{runner.Number}}</div></v-flex>
                                <v-flex xs2 md1>
                                  <v-avatar size="30" tile>
                                    <img src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                                  </v-avatar>
                                </v-flex>
                                <v-flex xs4 md2 my5>{{runner.Name}}</v-flex>
                                <v-flex xs4 md8></v-flex>
                              </v-layout>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </div> -->
                        <v-btn :color="addcolor" dark bottom right fab :disabled="addenabled">
                          <v-icon>add</v-icon>
                        </v-btn>
                </v-tab-item>
              </v-tabs>


   
  </v-container>
  
</template>
<script>
export default {
  name: 'home',
  component:{

  },
  data() {
    return {
      UID: 0,
      addcolor: "grey",
      activeBtn: 1,
      showNav: true,
      selectedwinners:[],
    }
  },
  computed: {
    races: function () {
        return this.$store.getters.races;
      },
    winbets: function() {
        return this.$store.getters.winbets;
      },
    race: function(){
      return this.races.Items.find( item => item.UID == this.$route.params.UID );
    },
    addenabled:function()
    {
      if ( this.chkWin === undefined || this.chkWin.length == 0 )
      {
        this.addcolor = "grey";
        return true;
      }
      this.addcolor = "green";
      return false;
    }
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
<style>

</style>