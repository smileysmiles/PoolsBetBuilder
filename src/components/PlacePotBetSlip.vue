<template>
<div>
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
                        <v-btn flat icon color="secondary" @click="posttobetslip">
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
       <v-card flat dark color="secondary">
            <v-card-title class="pa-1">
                <v-layout slot="header" row wrap align-center justify-space-between fill-height class="headline fill-height">
                    <v-flex xs6>
                        <span class="cyan--text text--lighten-3 text-sm-left">tote</span>
                        <span class="cyan--text ">PlacePot</span>       
                    </v-flex>
                    <v-flex xs2>
                        <v-btn flat icon color="accent" @click="rnd">
                            <v-icon>shuffle</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn flat icon color="accent" @click="favs">
                            <v-icon>favorite</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs2>
                        <v-btn flat icon color="accent" @click="clear">
                            <v-icon>replay</v-icon>
                        </v-btn>
                    </v-flex>

                </v-layout>      
            </v-card-title>
        </v-card>

    </template>
</div>

</template>
<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex'
import uuidv4 from 'uuid'

export default {
    name:"PlacePotBetSlip",
    data (){
        return{
            stake: 2, //set to the default min total stake. Customer config later MVP
            rules:{
                minstake: value => value >= 0.1 || "Minimum bet is £0.10",
                mintotalstake: value => value >= 2 || "Minimum Total Stake is £2.00",
                maxtotalstake: value => value <= 100000 || "Maximum Total Stake is £100,000"
            },
            currency:"£",
            uid:null
        }
    },
    props: [    
                'placepot',
                'races',
                'fieldnames',
                'course'
            ],
    computed: {
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
        bet:function(){

            if(!this.valid)
                 return null;

             var selections = []
            for(let i = 0; i < 6 ; i++)
            {
                let race = this.races[i]
                let items = this.placepot[this.fieldnames[i]];
                console.log("items", items)
                items.forEach(item =>{
                    console.log("ITEM" , item)
                    let selection = {
                        isBanker:0,
                        raceNumber:race.Race.Number,
                        leg:i+1,
                        raceTime: race.ScheduledTime,
                        horseNumber: item.Number,
                        horse: item.Name
                    }

                    selections.push(selection);
                })
            }

            return{
                toteBetID:this.uid,
                betCode:"PlacePot",
                betOption:"No Option",
                unitStake: this.stake,
                totalStake: this.total,
                lines: this.lines,
                selections: selections,
                course: this.course
            }
        }
        
    },
    methods:{
        favs(){
            this.$emit( 'favs', null )
        },
        rnd(){
            this.$emit( 'rnd', null )
        },
        clear(){
            this.$emit( 'clear', null )
        },
        posttobetslip(){
            let targetwindow = window.parent;
            targetwindow.postMessage( { event:"ADD-TO-BETSLIP", data:this.bet}, "*" );
            this.$emit( 'clearnowarn', null );
        }
    },
    created(){
        this.uid=uuidv4();

  }
}
</script>

<style>

</style>