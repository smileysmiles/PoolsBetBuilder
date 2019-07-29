<template>
    <div  class="text-xs-center">

    <div v-if="runners">
    <v-expansion-panel light >   
    <v-expansion-panel-content class="secondary">
        <v-layout slot="header" row wrap class="body-2 primary--text">
            BET OPTIONS
        </v-layout>
        <v-card pa-0 light>
            <v-card-text class="grey--text text--lighten-5">
                <v-flex xs12 md12 >
                    <v-switch @click.native.stop  v-model="eachway" color="red" label="Each Way"></v-switch>                              
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
                    <span class="grey--text">No.</span>
                </v-flex>
                <v-flex xs2 md1 >
                    <span class="grey--text">Silk</span>
                </v-flex>
                
                <v-flex xs6 md5><span class="grey--text">Name</span></v-flex>

                <v-flex md1 class="hidden-sm-and-down">
                    <span class="grey--text">Forecast</span>
                </v-flex>
                <v-flex xs3 md4>
                    <div class="text-xs-center">
                        <span class="grey--text">{{eachway == true ? "E/W" : "Win" }}</span>
                    </div>
                </v-flex>
            </v-layout>              
        </v-flex>                     
    </v-layout>
                   <v-card pa-0>
        <v-card-text class="grey lighten-5">
            <p>Selected winners.</p>
             
        </v-card-text>
      </v-card>    
    </v-expansion-panel-content>
  </v-expansion-panel >
    <v-expansion-panel light focusable v-if="runners">
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
                    
                    
                    <v-flex xs6 md5 class="font-weight-bold">{{runner.Name}}</v-flex>
                    
                    <v-flex v-if="runner.racingpostdata" md1 class="hidden-sm-and-down">
                        <span class="font-weight-bold blue--text">{{runner.racingpostdata.forecast_odds_desc}}</span>
                    </v-flex>
                    <v-flex v-else  md1 class="hidden-sm-and-down">

                    </v-flex>
                    <v-flex xs3 md4>
                        <v-checkbox multiple class="justify-center" v-model="selections"  @click.native.stop  :value="runner.UID">
                        </v-checkbox>
                    </v-flex>
                    <v-flex xs1></v-flex>       
                    </v-layout>              
                </v-flex>         
            </v-layout>
            <racingpostrunnerinfo :racingpostdata="runner.racingpostdata" ></racingpostrunnerinfo>           
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
                    
                <v-flex>
                    <v-btn @click="addtobetslip()">
                        Click me
                    </v-btn>
                </v-flex>            
                </v-layout>
            </v-container>
        </v-card-text>
        </template>
    </v-card>

    </div>
    <div v-else>
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
        </div>

    </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import moment from "moment"

export default {
    name:"WinBetslip",
    data (){
        return{
            selections:[],
            stake: 0,
            rules:{
                minstake: value => value >= 0.1 || "Minimum bet is £0.10",
                mintotalstake: value => value >= 2 || "Minimum Total Stake is £2.00",
                maxtotalstake: value => value <= 100000 || "Maximum Total Stake is £100,000"
            },
            eachway:false,
        }
    },
    props: [    
            'Race'
            ],
    computed: {
        ...mapGetters([ 'getRaceRunners' ]),
    runners: function(){
        return  this.getRaceRunners(this.Race.UID);
    },
    validbet: function(){
        return this.selections.length >=1 ? true : false;
    },
    lines: function(){
        if ( this.eachway )
            return this.selections.length * 2;
        return this.selections.length;
    },
    winbets: function() {
        return this.$store.getters.winbets;
      },
    selectedrunners: function(){
        let selections = this.selections.map( selection => {
            console.log("selectedrunners - ", selections)
            var runner = this.runners.find( runner => runner.UID == selection )
            return {
                ...runner,
                position: selection.position               
            };
        });
        return selections;
    },
    total: function(){
        return (this.lines * this.stake).toFixed(2);
    }
    },
    methods:{
        addtobetslip(){
            let targetwindow = window.parent;

            targetwindow.postMessage( { event:"ADD-TO-BETSLIP", data:"Hi There"}, "*" )
        }
    
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