<template>
<div v-if="meeting" class="text-xs-center">
      <v-layout row wrap  class="pb-2 pt-3 secondary">
            <v-flex xs2 v-for="(race, index) in races" :key="race.Race.Number">
                <v-badge color="green" overlap v-if="selectioncount(index + 1) > 0" >
                    <template slot="badge" >
                        <span class="caption" >{{selectioncount(index+1) }}</span>
                    </template>
                    <v-avatar :color="isselected(index+ 1)" size="35" @click="selectedleg=index + 1">
                        <span class="subheading secondary--text">{{ index +1 }}</span>
                    </v-avatar>
                </v-badge>
                <div v-else>
                    <v-avatar  :color="isselected(index+ 1)" size="35" @click="selectedleg= index + 1">
                        <span  class="subheading secondary--text">{{ index +1 }}</span>
                    </v-avatar>
                </div>
            </v-flex> 
            </v-layout> 

                <template v-if="valid">
        <v-expansion-panel light>
            <v-expansion-panel-content class="accent">
                <v-layout slot="header" row wrap align-center fill-height class="body-2 fill-height">
                    <v-flex xs8>
                        <span class="secondary--text px-1">{{lines}}</span>
                        <span v-if="lines==1" class="secondary--text px-1">BET</span>
                        <span v-else class="secondary--text px-1">BETs</span>
                        <span class="secondary--text px-1">@</span>
                        <span class="secondary--text pl-1">{{currency}}</span>
                        <span class="secondary--text pr-1"> {{stake}}</span>

                        <span class="secondary--text px-1">( Total Bet:</span>
                        <span class="secondary--text pl-1">{{currency}}</span>
                        <span class="secondary--text px-1">{{total}}</span>
                        <span class="secondary--text px-1">)</span>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn flat icon color="secondary">
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn flat icon color="secondary">
                            <v-icon>favorite</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                    <v-card dark class="headline">
                        <v-card-title pb-1 >
                            <span class="cyan--text text--lighten-3">tote</span><span class="cyan--text ">PlacePot</span></v-card-title>
                        <v-card-text pb-1 >
                            <v-container fluid grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs12 md6 d-flex>
                                        <v-layout row wrap align-center justify-space-around >
                                        <v-flex xs1 md2>
                                            <span>{{lines}}</span>
                                        </v-flex>
                                        <v-flex xs1 md2>
                                            <span>X</span>
                                        </v-flex>
                                        <v-flex xs4 md4>
                                            <v-text-field dark
                                                v-model="stake"
                                                label="Stake"
                                                :rules="[rules.minstake]"
                                                prefix="£"
                                                type="number"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2 md1></v-flex>
                                        <v-flex xs4 md3>
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
                            </v-container>
                            <v-container fluid grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs12 md6 d-flex v-for="(race, index) in races" :key="race.Race.Number">
                                        <v-layout row wrap>
                                                <v-flex xs12 sm12 md12  d-flex>
                                                    <span>LEG {{ index + 1 }}</span>
                                                </v-flex>
                                                <v-flex xs12 sm12 md12  d-flex v-for="selection in placepot[`leg${index + 1}selections`]" :key="selection.UID">                          
                                                    <v-layout row wrap>
                                                        <v-flex xs1 dflex>
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
                                    
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </template>
    <template v-else>
       <v-card dark color="secondary">
            <v-card-title>
                <v-layout slot="header" row wrap align-center justify-space-between fill-height class="headline fill-height">
                    <v-flex xs6>
                        <span class="cyan--text text--lighten-3 text-sm-left">tote</span>
                        <span class="cyan--text ">Jackpot</span>       
                    </v-flex>
                    <v-flex xs2>
                    </v-flex>
                    <v-flex xs2>

                                <v-btn flat icon color="accent">
                                    <v-icon>shuffle</v-icon>
                                </v-btn>

                        
                    </v-flex>
                    <v-flex xs2>
                        <v-btn flat icon color="accent">
                            <v-icon>favorite</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>      
            </v-card-title>
        </v-card>

    </template>


 

        <v-card flat pa-0>
          <v-card-text>
              
            <jackpotheader></jackpotheader>

            <v-expansion-panel v-for="runner in runners" :key="'runner' + runner.UID">
                <v-expansion-panel-content  >
                        <v-layout slot="header" row wrap class="subheading fill-height align-center justify-space-around">
                        <v-flex xs1 md1>
                            <span>{{runner.Number}}</span>
                        </v-flex>
                        <v-flex xs2 md1>
                            <v-avatar size="25" tile>
                            
                            <img v-if="runner.racingpostdata != null" :src="runner.racingpostdata.silk_image_png" />
                            <img v-else src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                            </v-avatar>
                        </v-flex>
                        <v-flex xs6  class="font-weight-bold">{{runner.Name}}</v-flex>
                        <!-- <placepotselection :runner="runner" :leg="leg" :selector="legselections" :pooluid="pooluid" :numberoflegs="numberoflegs"></placepotselection> -->
                        <v-flex xs2 v-if="runner">                      
                            <v-checkbox multiple v-model="placepot[`leg${selectedleg}selections`]" :value="runner" :id="runner.UID" @click.native.stop />
                        </v-flex>
                        </v-layout>
                        <racingpostrunnerinfo :racingpostdata="runner.racingpostdata" ></racingpostrunnerinfo>           
                
                </v-expansion-panel-content>
            </v-expansion-panel>



          </v-card-text>
        </v-card>
      <!-- </v-tab-item>
    </v-tabs-items> -->

</div>


</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import JackpotHeader from './JackpotHeader.vue'

export default {
    components:{
        'jackpotheader' : JackpotHeader
    },
    data(){
        return{
            pooluid:null,
            color:"lightblue",
            leg1selections:[],
            leg2selections:[],
            leg3selections:[],
            leg4selections:[],
            leg5selections:[],
            leg6selections:[],
            stake: 2, //set to the default min total stake. Customer config later MVP
            rules:{
                minstake: value => value >= 0.1 || "Minimum bet is £0.10",
                mintotalstake: value => value >= 2 || "Minimum Total Stake is £2.00",
                maxtotalstake: value => value <= 100000 || "Maximum Total Stake is £100,000"
            },
            selectedleg: 1,
            betstore:[],
            currency:"£"
        }
    },
    computed:{
        ...mapGetters([ 'getJackpotRaces', 'getbetslip', 'getRaceRunnersWithFav' ]),
        jackpotraces: function(){
           return this.getJackpotRaces( this.meeting.UID )
        },
        races: function(){
            return this.jackpotraces.races;
        },
        runners: function(){
            let raceuid = this.races[this.selectedleg - 1].UID
            let runners = this.getRaceRunnersWithFav(raceuid);
            console.log(runners)
            return runners;
        },
        valid:function(){
            if( this.leg1selections.length > 0
                &&
                this.leg2selections.length > 0
                &&
                this.leg3selections.length > 0
                &&
                this.leg4selections.length > 0
                &&
                this.leg5selections.length > 0
                &&
                this.leg6selections.length > 0
            )
                return true;
            else
                return false;
        },
        lines:function(){
            return this.placepot.leg1selections.length * 
                this.placepot.leg2selections.length * 
                this.placepot.leg3selections.length * 
                this.placepot.leg4selections.length * 
                this.placepot.leg5selections.length * 
                this.placepot.leg6selections.length;
        },
        total:function(){
            return this.lines * this.stake;
        },
        btncolor:function(){
            if(this.valid)
                return "success";
            else
                return "error"
        }

    },
    props:[
        'meeting',
        'pooluid'
    ],
    methods:{
        isselected(item){
            if (item == this.selectedleg)
                return "accent"
            else
                return "primary"
        },
        log: function(){
            console.log('race tabs')
        },
        selectioncount: function(leg){

            switch (leg)
            {
                case 1:
                    return this.leg1selections.length;
                    break;
                case 2:
                    return this.leg2selections.length;
                    break;
                case 3:
                    return this.leg3selections.length;
                    break;
                case 4:
                    return this.leg4selections.length;
                    break;
                case 5:
                    return this.leg5selections.length;
                    break;
                case 6:
                    return this.leg6selections.length;
                    break;
            }
        },
       legselections:function( leg ){
            
            if(this.betslip)
            {
                console.log("BETSLIP", this.betslip);
                let leg1selections = this.betslip.legs.find( l => l.leg == leg);
                if (leg1selections)
                {
                    console.log("LEG SELECTIONS", leg1selections);
                    return leg1selections.selections;
                }

                return null;
            }
        },
        getValue(value){
            this.$nextTick(() =>{
                let elt = document.getElementById( value.UID );
                if (elt.checked)
                {
                    console.log("Checked");
                    //this.ADD_SELECTION({poolid:this.pooluid, leg: this.leg, selection: value } );
                }
                else{
                    console.log("Un Checked");
                    //this.REMOVE_SELECTION({poolid:this.pooluid, leg: this.leg, selection: value } );
                }
            })
        },
        reset(){
            this.placepot = {
                pooluid:this.pooluid,
                color:"lightblue",
                leg1selections:[],
                leg2selections:[],
                leg3selections:[],
                leg4selections:[],
                leg5selections:[],
                leg6selections:[]
            };
            this.stake = 2,
            this.selectedleg = 1
        }
    },
    watch:{
        pooluid: function(newVal, oldVal){
            console.log("pooluidchanged", newVal)
            let oldBetIndex = this.betstore.findIndex(bet => bet.pooluid == newVal)
            console.log("Old Bet Index - ", oldBetIndex)
            if(oldBetIndex == -1 )
            {
                this.betstore.push(this.placepot);
            }
            else
            {
                this.betstore.splice(oldBetIndex, 1, this.placepot)
            }


            let newBet = this.betstore.find(bet => bet.pooluid == newVal)
            if(newBet)
            {
                console.log("Exists - ", newBet)
                this.placepot = newBet;
            }

            
            this.reset();
        }
    },
    created(){
        console.log("Created")
        this.reset();
        console.log("reset betstore")
        this.betstore=[];
    }
}
</script>
<style>

</style>