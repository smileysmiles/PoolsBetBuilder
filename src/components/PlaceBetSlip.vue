<template>
    <div>
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
            <v-layout  slot="header" row wrap class="body-2">
                <v-flex xs12 md12 >
                    <v-layout row wrap class="caption fill-height align-center justify-space-around">
                        <v-flex xs1 md1>
                            <span class="grey--text text--lighten-1">No.</span>
                        </v-flex>
                        <v-flex xs2 md1 >
                            <span class="grey--text text--lighten-1">Silk</span>
                        </v-flex>
                        <v-flex xs6><span class="grey--text text--lighten-1">Name</span></v-flex>
                        <v-flex xs3 pl-3>
                            <span class="grey--text text--lighten-1">Place</span>
                        </v-flex>
                    </v-layout>              
                </v-flex>                     
            </v-layout>
            <v-card pa-0>       
                <v-card-text class="grey lighten-5">
                    <p>Selected place.</p>
                </v-card-text>
            </v-card>    
        </v-expansion-panel-content>
  </v-expansion-panel>
      <v-expansion-panel>
    <v-expansion-panel-content v-for="runner in runners" :key="'runner' + runner.Number">
    <v-layout slot="header"  row wrap class="body-2">
        <v-flex xs12 md12 >
            <v-layout row wrap class="subheading fill-height align-center justify-space-around">
            <v-flex xs1  md1>
                <span>{{runner.Number}}</span>
            </v-flex>
            <v-flex xs2 md1>
                <v-avatar size="25" tile>
                
                <img v-if="runner.racingpostdata != null" :src="runner.racingpostdata.silk_image_png" />
                <img v-else src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                </v-avatar>
            </v-flex>
            <v-flex xs6  class="font-weight-bold">{{runner.Name}}</v-flex>
            <v-flex xs2 pl-3>
                <v-checkbox v-model="selections"  @click.native.stop  :value="runner.UID">
                </v-checkbox>
            </v-flex>
            <v-flex xs1></v-flex>       
            </v-layout>              
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



            <v-card dark class="headline" flat>
            <v-card-title pb-1 v-if='!validbet'>No Valid Bet</v-card-title>
            <template v-else >
            <v-card-title pb-1 ><span class="cyan--text text--lighten-3">tote</span><span class="cyan--text ">Win</span></v-card-title>  
            <v-card-text pb-1>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 md6 d-flex>
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12  d-flex v-for="selection in selectedrunners" :key="selection.UID">                          
                                    <v-layout row wrap>
                                        <v-flex xs3 dflex class="cyan--text body-1">
                                            WIN
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
            </template>
        </v-card>


    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name:"PlaceBetslip",
    data (){
        return{
            selections:[],
            stake: 0,
            rules:{
                minstake: value => value >= 0.1 || "Minimum bet is £0.10",
                mintotalstake: value => value >= 2 || "Minimum Total Stake is £2.00",
                maxtotalstake: value => value <= 100000 || "Maximum Total Stake is £100,000"
            },
        }
    },
    props: [    
            'Race'
            ],
    computed: {
    ...mapGetters([ 'todaysrunners', 'getRunnersByRaceUID', 'getracesbymeetingid' ]),
    runners: function(){
        return  this.getRunnersByRaceUID(this.Race.UID);
    },
    placebets: function() {
        return this.$store.getters.placebets;
    },
    lines: function(){
        return this.selections.length;
    },
    total: function(){
        return (this.lines * this.stake).toFixed(2);
    },
    validbet: function(){
        return this.selections.length >=1 ? true : false;
    },
    selectedrunners: function(){
        let selections = this.selections.map( selection => {
            var runner = this.runners.find( runner => runner.UID == selection )
            return {
                ...runner,
                position: selection.position               
            };
        });
        return selections;
    },
    },
    created(){
    this.UID = this.$route.params.UID;   
    //this.selectedplaced = this.placebets.filter(item => item.race == this.UID).map(bet => bet.runner);
  }
}
</script>