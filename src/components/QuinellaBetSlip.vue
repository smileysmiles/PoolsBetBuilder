<template>
    <div pb-5>

<v-expansion-panel dark>   
    <v-expansion-panel-content>
        <v-layout slot="header" row wrap class="body-2">
            BET OPTIONS
        </v-layout>
        <v-card pa-0 dark>
            <v-card-text class="grey--text text--lighten-5">
                <v-flex xs12 md12 >
                    NO OPTIONS
                </v-flex>
            </v-card-text>
        </v-card>    
        
    </v-expansion-panel-content>
</v-expansion-panel>
    <v-expansion-panel>
    <v-expansion-panel-content>
    <v-layout slot="header" row wrap class="body-2">
        <v-flex xs12 md12 >
            <v-layout row wrap class="caption fill-height align-center justify-space-around">
                <v-flex xs1 md1 >
                    <span class="grey--text text--lighten-1">No.</span>
                </v-flex>
                <v-flex xs2 md1 >
                    <span class="grey--text text--lighten-1">Silk</span>
                </v-flex>
                <v-flex xs7><span class="grey--text text--lighten-1">Name</span></v-flex>
                <v-flex xs2>
                    <span class="grey--text text--lighten-1">ANY</span>
                </v-flex>
            </v-layout>                                     
        </v-flex>

    </v-layout>
                <v-card pa-0>
        <v-card-text class="grey lighten-5">
            <h4>What exactly is a Quinella bet in horse racing?</h4>
             <p>The definition of a Quinella bet is fairly straight forward: select two horses to finish one and two. As long as those are the first two finishers – in either order – you’re a winner!</p>

        </v-card-text>
      </v-card>    
    </v-expansion-panel-content>
  </v-expansion-panel>
  <v-divider></v-divider>
        <div >
            <v-expansion-panel>
    <v-expansion-panel-content
      v-for="runner in runners" :key="'runner' + runner.UID"
    >
            <v-layout slot="header" row wrap class="subheading fill-height align-center justify-space-around">
            <v-flex xs1 md1>
                <span>{{runner.Number}}</span>
            </v-flex>
            <v-flex xs2 md1>
                <v-avatar size="25" tile>
                
                <img v-if="runner.racingpostdata != null" :src="runner.racingpostdata.silk_image_png" onerror="this.src='https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif'" />
                <img v-else src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                </v-avatar>
            </v-flex>
            <v-flex xs7  class="font-weight-bold">{{runner.Name}}</v-flex>
            <v-flex xs2 >
                <v-checkbox v-model="perms" :value="runner.UID" @click.native.stop>
                </v-checkbox>
            </v-flex>           
            </v-layout>    
     <v-card>
        <v-card-text class="grey lighten-3"><div class="pa-2">{{runner.racingpostdata.spotlight}}</div>

        <v-layout  slot="header" row wrap class="body-2" pa-2>
            <v-flex xs12 md12 >
                <v-layout row wrap class="caption fill-height align-left ">
                    <v-flex xs3 md2 class="text-md-right" py-2>
                        <span class="grey--text text--lighten-1">Jockey :</span>
                    </v-flex>
                    <v-flex xs3  md2 class="text-md-left" py-2>
                        <span class="grey--text text--darken-3 text-md-center">{{runner.racingpostdata.jockey_name}}</span>
                    </v-flex>
                    <v-flex xs3  md2 class="text-md-right" py-2>
                        <span class="grey--text text--lighten-1">Trainer :</span>
                    </v-flex>
                    <v-flex xs3  md2 class="text-md-left" py-2>
                        <span class="grey--text text--darken-3">{{runner.racingpostdata.trainer_stylename}}</span>
                    </v-flex>
                    
                    <v-flex xs3 md2 class="text-md-right" py-2><span class="grey--text text--lighten-1">Owner :</span></v-flex>
                    <v-flex xs3 md2 class="text-md-left" py-2><span class="black--text text--darken-3">{{runner.racingpostdata.owner_name}}</span></v-flex>
                       <v-flex xs3 md2 class="text-md-right" py-2>
                        <span class="grey--text text--lighten-1">14 day form :</span>
                    </v-flex >
                    <v-flex xs3 md2 class="text-md-left" py-2>
                        <span class="grey--text text--darken-3">{{runner.racingpostdata.jockey_last_14_days.wins}} wins in {{runner.racingpostdata.jockey_last_14_days.runs}} runs</span>
                    </v-flex>
                </v-layout>              
            </v-flex>                     
        </v-layout>
        </v-card-text>
      </v-card>                            
                </v-expansion-panel-content>
  </v-expansion-panel>
        </div>
        <v-card dark class="headline">
            <v-card-title pb-1 v-if='bettype!="invalid"'><span class="cyan--text text--lighten-3">tote</span><span class="cyan--text ">Quinella</span></v-card-title>
            <v-card-title pb-1 v-else>No Valid Bet</v-card-title>
            <v-card-text pb-1 v-if='bettype!="invalid"'>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 md6 d-flex>
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12  d-flex v-for="selection in allselections" :key="selection.UID">                          
                                    <v-layout row wrap>
                                        <v-flex xs3 dflex class="cyan--text body-1">
                                            {{selection.position}}
                                        </v-flex>
                                        <v-flex xs2 dflex class="caption">
                                            ({{selection.Number}})
                                        </v-flex>
                                        <v-flex xs6 dflex class="body-1">
                                            {{selection.Name}}
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md6 d-flex>
                            <v-layout row wrap align-center justify-space-around >
                        <v-flex xs12 md12 d-flex>
                            <v-layout row wrap align-center justify-space-around >
                            <v-flex xs3 md2>
                                
                            </v-flex>
                            <v-flex xs1 md2>
                                <span>{{lines}}</span>
                            </v-flex>
                            <v-flex xs1 md2>
                                <span>X</span>
                            </v-flex>
                            <v-flex xs6 md4>
                                <v-text-field dark
                                    v-model="stake"
                                    label="Stake"
                                    :rules="[rules.minstake]"
                                    prefix="£"
                                    type="number"
                                ></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 md12 d-flex>
                            <v-layout row wrap align-center justify-space-around >                
                            <v-flex xs5 sm3>
                                <v-text-field dark
                                    v-model="total"
                                    label="Total"
                                    :rules="[rules.mintotalstake, rules.maxtotalstake]"
                                    prefix="£"
                                    type="number"
                                    readonly
                                ></v-text-field>
                            </v-flex>
                            </v-layout>
                        </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex'

export default {
    name:"Quinella_Bet_Slip",
    data (){
        return{
            perms: [],
            hidden: false,
            banker: false,
            stake: 0,
            rules:{
                minstake: value => value >= 0.1 || "Minimum bet is £0.10",
                mintotalstake: value => value >= 2 || "Minimum Total Stake is £2.00",
                maxtotalstake: value => value <= 100000 || "Maximum Total Stake is £100,000"
            }
        }
    },
    props: [    
            'Race',
            'PoolID'
            ],
    methods:{
        factorial(num){
            if (num === 0)
            { return 1; }
            else
            { return num * this.factorial( num - 1 ); }
        },
        toggleperms: function( meetingUID, raceUID, runnerUID )
        {
            this.$store.commit('SET_EXACTAPERMS', this.perms);
        }
    },
    computed: {
        ...mapGetters([ 'todaysrunners', 'getRunnersByRaceUID', 'getracesbymeetingid' ]),
        runners: function(){
            
        return  this.getRunnersByRaceUID(this.Race.UID);//this.allrunners.Items.filter( runner =>  runner.RaceUID == this.Race.UID  );
        },
        races: function(){
            return  this.getracesbymeetingid(this.Race.MeetingUID);
        },
        allselections: function(){
            var selections = [];
            selections = this.perms.map( perm => {
                return {
                    UID: perm,
                    position: "ANY"
                }
            })

            selections = selections.map( selection => {
                var runner = this.runners.find( runner => runner.UID == selection.UID )
                return {
                    ...runner,
                    position: selection.position               
                };
            });

            return selections;
        },

        bankerswitchtext: function(){
            if (this.banker)
                return { description: "Banker", header: "Banker" };
            return { description: "Straight", header: "1st" };
        },
        exactabets: function() {
            return this.$store.getters.exactabets;
        },
        exacta: function(){
            if(this.first != null && ( this.second != undefined && this.second.length > 0 ) )
            {
                return true;
            }
            return false;
        },
        combination: function(){
            if( this.perms !== undefined && this.perms.length >= 1)
                return true;
            else if( this.first !== undefined && this.first.length > 1)
                return true;
            return false;
        },
        validcombination: function(){
            if( this.combination && this.perms.length >= 2)
                return true;
            return false;
        },
        bettype:function(){
            
            if(this.banker && this.exacta)
                return "banker";
            if (this.exacta)
                return "straight";       
            else if(this.validcombination)
                return "combination";
            else
                return "invalid"
        },
        lines:function()
        {
            if ( this.perms.length <= 0)
                return 0;
            var n = this.perms.length;
            var r = 2;

            return this.factorial(n) / ( this.factorial(n - r) * this.factorial( r ) );
        },
        total: function(){
            return (this.lines * this.stake).toFixed(2);
        },

    },

    created(){
    this.UID = this.$route.params.UID;

  }
}
</script>

<style>
.v-expansion-panel__header{
    padding: 6px 6px;
}

.v-card__text{
    padding: 2px 2px;
}

#app {
    padding-bottom: 100px;
}

</style>