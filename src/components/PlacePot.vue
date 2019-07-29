<template>
<div v-if="meeting" class="text-xs-center">
    <placepotbetslip :placepot="placepot" :course="meeting.Meeting.Name" :races="races" :fieldnames="fieldnames" @favs='showdialog("favs")' @rnd='showdialog("randomise")' @clearnowarn="reset" @clear='showdialog("clear")'></placepotbetslip>

    <v-layout row wrap  class="pb-2 pt-3 white">
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

    <v-card flat pa-0>
        <v-card-text>
            <placepotheader></placepotheader>
                <v-expansion-panel v-for="runner in runners" :key="'runner' + runner.UID">
                    <v-expansion-panel-content  >
                            <v-layout slot="header" row wrap class="subheading fill-height align-center justify-space-around">
                            <v-flex xs1 md1>
                                <span>{{runner.Number}}</span>
                            </v-flex>
                            <v-flex xs2 md1>
                                <v-avatar size="25" tile>
                                
                                <img v-if="runner.racingpostdata != null" :src="runner.racingpostdata.silk_image_png" />
                                <img v-else :src="`https://pools.tote.co.uk//img/icons/icon-virtual-${runner.Number}.svg`" />
                                </v-avatar>
                            </v-flex>
                            <v-flex xs6  class="font-weight-bold">{{runner.Name}}</v-flex>
                            <v-flex xs2 v-if="runner">                      
                                <v-checkbox multiple v-model="placepot[`leg${selectedleg}selections`]" :value="runner" :id="runner.UID" @click.native.stop />
                            </v-flex>
                            </v-layout>
                            <racingpostrunnerinfo :racingpostdata="runner.racingpostdata" ></racingpostrunnerinfo>           
                    
                    </v-expansion-panel-content>
                </v-expansion-panel>
        </v-card-text>
    </v-card>
    <v-dialog v-model="confirmdialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Continue with change?</v-card-title>
        <v-card-text>This will clear any existing selections are you sure?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="confirmdialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click="continueaction">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return{
            confirmdialog:false,
            lastaction:null,
            placepot:{
                pooluid:null,
                leg1selections:[],
                leg2selections:[],
                leg3selections:[],
                leg4selections:[],
                leg5selections:[],
                leg6selections:[]
            },
            fieldnames:[
                    "leg1selections",
                    "leg2selections",
                    "leg3selections",
                    "leg4selections",
                    "leg5selections",
                    "leg6selections"
                ],
            selectedleg: 1,
            betstore:[],
            currency:"£"
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
    },
    props:[
        'meeting',
        'pooluid'
    ],
    methods:{
        showdialog(action){
            this.confirmdialog = true;
            this.lastaction=action;
        },
        continueaction(){
            this.clearselections();

            switch(this.lastaction)
            {
                case "favs":
                    this.favs();
                    break;
                case "clear":
                    console.log("reset")
                    this.reset();
                    break;
                case "randomise":
                    this.randomise();
                    break;
            }
            this.confirmdialog=false;
        },
        favs()
        {
            for(let i = 0; i < 6 ; i++)
            {
                let raceuid = this.races[i ].UID
                let runners = this.getRaceRunnersWithFav(raceuid);
                console.log(runners)
                let runner= runners.find( item => item.DataID == "0");
                let item = this.placepot[this.fieldnames[i]];
                let exists = item.find( sel => sel.DataID == "0");
                if(!exists)
                    item.push(runner);
            }

        },
        randomise(){
            for(let i = 0; i < 6 ; i++)
            {
                
                let raceuid = this.races[i ].UID
                let runners = this.getRaceRunnersWithFav(raceuid);
                let item = this.placepot[this.fieldnames[i]];
                let totalrunners = runners.length;

                let myluckynumber = Math.floor((Math.random() * totalrunners) + 1);
                let myluckhorse = runners[myluckynumber - 1];
                let exists =  item.find( sel => sel.DataID == myluckhorse.DataID)

                if(!exists)
                    item.push(myluckhorse);
            }

            
        },
        isselected(item){
            if (item == this.selectedleg)
                return "accent"
            else
                return "primary"
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
                }
                else{
                    console.log("Un Checked");
                }
            })
        },
        clearselections(){
            this.placepot = {
                pooluid:this.pooluid,
                leg1selections:[],
                leg2selections:[],
                leg3selections:[],
                leg4selections:[],
                leg5selections:[],
                leg6selections:[],
            };
        },
        reset(){
            this.clearselections();
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