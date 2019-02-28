<template>
    <div pb-5>
                        <v-fab-transition>
              <v-btn
                v-show="!hidden"
                color="pink"
                fab
                dark
                small
                absolute
                bottom
                right
                @click="saveselection"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-fab-transition>

<v-expansion-panel dark>   
    <v-expansion-panel-content>
        <v-layout slot="header" row wrap class="body-2">
            BET OPTIONS
        </v-layout>
        <v-card pa-0 dark>
            <v-card-text class="grey--text text--lighten-5">
                <v-flex xs12 md12 >
                    <v-switch @click.native.stop  v-model="banker" color="red" :label="bankerswitchtext.description" :disabled="combination"></v-switch>                              
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
                <v-flex xs1 md1 >
                    <span class="grey--text text--lighten-1">Silk</span>
                </v-flex>
                <v-flex xs4><span class="grey--text text--lighten-1">Name</span></v-flex>
                <v-flex xs1 class="grey--text text--lighten-1">
                    {{bankerswitchtext.header}}
                </v-flex>
                <v-flex xs1>
                    <span class="grey--text text--lighten-1">2nd</span>
                </v-flex>
                <v-flex xs1 v-if="!banker">
                    <span class="grey--text text--lighten-1">ANY</span>
                </v-flex>
            </v-layout>                                     
        </v-flex>

    </v-layout>
                <v-card pa-0>
        <v-card-text class="grey lighten-5">
            <p>Use columns 1st and 2nd for a correct order bet.</p>

             <p>Multiple selections for 2nd will automatically assume that the selection in 1st is A banker.</p>

            <p>Use column ANY to  signify horses can finish in any combination of 1st or 2nd. etc etc etc</p>
             
        </v-card-text>
      </v-card>    
    </v-expansion-panel-content>
  </v-expansion-panel>
  <v-divider></v-divider>
        <div >
            <v-expansion-panel>
    <v-expansion-panel-content
      v-for="runner in runners" :key="'runner' + runner.Number"
    >
            <v-layout slot="header" row wrap class="subheading fill-height align-center justify-space-around">
            <v-flex xs1 md1>
                <span>{{runner.Number}}</span>
            </v-flex>
            <v-flex xs1 md1>
                <v-avatar size="25" tile>
                <img src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
                </v-avatar>
            </v-flex>
            <v-flex xs4  class="font-weight-bold">{{runner.Name}}</v-flex>
            <v-flex xs1>
                <v-checkbox v-model="first" :value="runner.RunnerUID" @click.native.stop :disabled="disabled(runner.RunnerUID, 'first')">
                </v-checkbox>
            </v-flex>           
            <v-flex xs1>
                <v-checkbox v-model="second" :value="runner.RunnerUID" @click.native.stop :disabled="disabled(runner.RunnerUID, 'second')">
                </v-checkbox>
            </v-flex>
            <v-flex xs1 v-if="!banker">
                <v-checkbox v-model="perms" :value="runner.RunnerUID" @click.native.stop  :disabled="disabled(runner.RunnerUID, 'perms')">
                </v-checkbox>
            </v-flex>           
            </v-layout>    
            <v-card pa-0>
        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>                               
                </v-expansion-panel-content>
  </v-expansion-panel>
        </div>
        <v-card dark class="headline">
            <v-card-title pb-1 v-if='bettype!="invalid"'><span class="cyan--text text--lighten-3">tote</span><span class="cyan--text ">exacta {{bettype}}</span></v-card-title>
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
                                <span>{{lines}}</span>
                            </v-flex>
                            <v-flex xs3 md2>
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
            <v-card-actions v-if='bettype!="invalid"'>
                <v-btn>Add</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    name:"ExactaBetslip",
    data (){
        return{
            first: [],
            second: [],
            perms: [],
            runners: null,
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
            'Race'
            ],
    computed: {
    allselections: function(){
        var selections = [];
        console.log(this.bettype)
        switch(this.bettype)
        {
            case "banker":
            case "straight":
                var array1 = this.first.map(first => {
                    return {
                        UID: first,
                        position: this.banker ? "bkr" : "1st"
                    }
                })
                var array2 = this.second.map(second => {
                    return {
                        UID: second,
                        position: "2nd"
                    }
                })
                selections = [ ...array1, ...array2]
                
                break;
            case "combination":
                selections = this.perms.map( perm => {
                    return {
                        UID: perm,
                        position: "ANY"
                    }
                })
                break;
        }
        console.log(selections)

        selections = selections.map( selection => {
            var runner = this.runners.find( runner => runner.RunnerUID == selection.UID )
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
    placebets: function() {
        return this.$store.getters.placebets;
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
        switch(this.bettype)
        {
            case "banker":
            case "straight":
                //UI is preventing first and second been the same horse so this is simplified
                return this.first.length * this.second.length;    
            case "combination":
                return (this.perms.length * this.perms.length) - this.perms.length;
        }
    },
    total: function(){
        return (this.lines * this.stake).toFixed(2);
    },

},
    methods:{
    disabled(UID, position)
    {
        if(position == "first")
        {
            if(this.perms != undefined && this.perms.length > 0 )
                return true;
            
            if(this.first[0] == UID)
                return false;

            if(this.banker && (this.first !== undefined && this.first.length >0) )
                return true;

            var insecond = this.second.find( selection => selection == UID)
            if ( insecond != undefined && insecond.length > 0 )
                return true;

            return false;
        }

        if(position == "second")
        {
            if(this.perms != undefined && this.perms.length > 0 )
                return true;

            var infirst = this.first.find( selection => selection == UID)
            if ( infirst != undefined && infirst.length > 0 )
                return true;

            return false;
        }

        if(position == "perms")
        {
            if((this.first !== undefined && this.first.length >0) || ( this.second !== undefined && this.second.length > 0 ) )
                return true;

            
            
            return false;
        }
    },
    saveselection()
    {
        if (this.banker && this.exacta)
            console.log("BANKER")
        else if (this.exacta)
            console.log("STRAIGHT")
        else if (this.validcombination)
            console.log("COMBINATION")
        else    
            console.log("INVALID BET");
        }
    },
    toggleperms: function( meetingUID, raceUID, runnerUID )
    {
        this.$store.commit('SET_EXACTAPERMS', this.perms);
    },
    created(){
    this.UID = this.$route.params.UID;
    this.selectedplaced = this.placebets.filter(item => item.race == this.UID).map(bet => bet.runner);
    this.runners = this.Race.Race.Runners.map( runner => {
        return { ...runner}
    } )
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