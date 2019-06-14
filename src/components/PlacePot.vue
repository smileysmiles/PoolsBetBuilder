<template>
<div v-if="meeting" class="text-xs-center">

    <template v-if="valid">
        <v-expansion-panel dark>
            <v-expansion-panel-content class="primary">
                <v-layout slot="header" row wrap class="subheading fill-height">
                    <!-- <v-flex xs12 md12>
                        <v-layout row wrap align-center justify-space-around >
                        <v-flex xs1 md1>
                            <span>{{lines}}</span>
                        </v-flex>
                        <v-flex xs1 md1>
                            <span>X</span>
                        </v-flex>
                        <v-flex xs4 md3>
                            <v-text-field light
                                v-model="stake"
                                label="Stake"
                                :rules="[rules.minstake]"
                                prefix="£"
                                type="number"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2 md2></v-flex>
                        <v-flex xs4 md3>
                            <v-text-field light
                                v-model="total"
                                label="Total"
                                :rules="[rules.mintotalstake, rules.maxtotalstake]"
                                prefix="£"
                                type="number"
                                readonly
                            ></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-flex> -->
                    <span class="cyan--text text--lighten-3">tote</span><span class="cyan--text ">PlacePot</span><span class="white--text "> Selections</span>
                </v-layout>
                    <v-card dark class="headline">
                        <v-card-title pb-1 ><span class="cyan--text text--lighten-3">tote</span><span class="cyan--text ">PlacePot</span></v-card-title>
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
<!-- 
                                            <v-flex xs12 sm12 md12  d-flex>
                                                <span>LEG 2</span>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12  d-flex v-for="selection in placepot.leg2selections" :key="selection.UID">                          
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
                                            <v-flex xs12 sm12 md12  d-flex>
                                                <span>LEG 3</span>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12  d-flex v-for="selection in placepot.leg3selections" :key="selection.UID">                          
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
                                            <v-flex xs12 sm12 md12  d-flex>
                                                <span>LEG 4</span>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12  d-flex v-for="selection in placepot.leg4selections" :key="selection.UID">                          
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
                                            <v-flex xs12 sm12 md12  d-flex>
                                                <span>LEG 5</span>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12  d-flex v-for="selection in placepot.leg5selections" :key="selection.UID">                          
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
                                            <v-flex xs12 sm12 md12  d-flex>
                                                <span>LEG 6</span>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12  d-flex v-for="selection in placepot.leg6selections" :key="selection.UID">                          
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
                                            </v-flex> -->
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
        <v-card dark color="primary">
            <v-card-title>
                <span class="cyan--text text--lighten-3">tote</span><span class="cyan--text ">PlacePot:</span>
                <span class="white--text pl-2"> No selections</span>                
            </v-card-title>
        </v-card>
    </template>

    
        
            <v-layout row wrap  class="pb-2 pt-3 secondary">
            <v-flex xs2 v-for="(race, index) in races" :key="race.Race.Number">
                <v-badge color="green" overlap v-if="selectioncount(index + 1) > 0" >
                    <template slot="badge" >
                        <span class="caption" >{{selectioncount(index+1) }}</span>
                    </template>
                    <v-avatar :color="isselected(index+ 1)" size="35" @click="selectedleg=index + 1">
                        <span class="subheading white--text">{{ index +1 }}</span>
                    </v-avatar>
                </v-badge>
                <div v-else>
                    <v-avatar  :color="isselected(index+ 1)" size="35" @click="selectedleg= index + 1">
                        <span  class="subheading white--text">{{ index +1 }}</span>
                    </v-avatar>
                </div>
            </v-flex> 
            </v-layout> 


 
    <!-- <v-tabs show-arrows dark color="primary" slider-color="accent" @change="log()" >
    
    <v-tab  v-for="(race, index) in races" :key="race.Race.Number" :href="'#tab-' + race.Race.Number"  class="pb-2 mt-2" >
      
            <v-badge right color="green" v-if="selectioncount(index + 1) > 0" >
                <template slot="badge" >
                    <span class="caption" >{{selectioncount(index+1) }}</span>
                </template>
                <span class=" subheading">Leg {{ index +1 }}</span>
            </v-badge>
                <span v-else class="subheading">Leg {{ index +1 }}</span>

    </v-tab> -->

    <!-- <v-tabs-items light  @change="log()">
      <v-tab-item v-for="(race, index) in races" :key="race.Race.Number" :value="'tab-' +  race.Race.Number" > -->
        <v-card flat>
          <v-card-text>
            <placepotheader></placepotheader>
            <!-- <placepotrunners :raceuid="race.UID" :pooluid="placepot.uid" :numberoflegs="placepot.numberoflegs" :leg="index + 1" :legselections="legselections(index + 1)"></placepotrunners> -->

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

export default {
    data(){
        return{
            placepot:{
                pooluid:null,
                color:"lightblue",
                leg1selections:[],
                leg2selections:[],
                leg3selections:[],
                leg4selections:[],
                leg5selections:[],
                leg6selections:[]
            },
            stake: 0,
            rules:{
                minstake: value => value >= 0.1 || "Minimum bet is £0.10",
                mintotalstake: value => value >= 2 || "Minimum Total Stake is £2.00",
                maxtotalstake: value => value <= 100000 || "Maximum Total Stake is £100,000"
            },
            selectedleg: 1,
            betstore:[]
        }
    },
    computed:{
        ...mapGetters([ 'getPlacePotRaces', 'getbetslip', 'getRaceRunnersWithFav' ]),
        placepotraces: function(){
           return this.getPlacePotRaces( this.meeting.UID )
        },
        races: function(){
            return this.placepotraces.races;
        },
        runners: function(){
            let raceuid = this.races[this.selectedleg - 1].UID
            let runners = this.getRaceRunnersWithFav(raceuid);
            console.log(runners)
            return runners;
        },
        valid:function(){
            if( this.placepot.leg1selections.length > 0
                &&
                this.placepot.leg2selections.length > 0
                &&
                this.placepot.leg3selections.length > 0
                &&
                this.placepot.leg4selections.length > 0
                &&
                this.placepot.leg5selections.length > 0
                &&
                this.placepot.leg6selections.length > 0
            )
                return true;
            else
                return false;
        },
        lines:function(){
            return this.placepot.leg1selections.length * this.placepot.leg2selections.length * this.placepot.leg3selections.length * this.placepot.leg4selections.length * this.placepot.leg5selections.length * this.placepot.leg6selections.length;
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
                    return this.placepot.leg1selections.length;
                    break;
                case 2:
                    return this.placepot.leg2selections.length;
                    break;
                case 3:
                    return this.placepot.leg3selections.length;
                    break;
                case 4:
                    return this.placepot.leg4selections.length;
                    break;
                case 5:
                    return this.placepot.leg5selections.length;
                    break;
                case 6:
                    return this.placepot.leg6selections.length;
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
            this.stake = 0,
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
.v-window__container--is-active{
    height:100% !important;
}
</style>