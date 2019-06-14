<template>
<div v-if="runners">
    
 <v-expansion-panel>
    <v-expansion-panel-content v-for="runner in runners" :key="'runner' + runner.UID" >
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
                <v-checkbox v-model="selected" :value="runner" :id="runner.UID" @click.native="getValue(runner)" @click.native.stop />
            </v-flex>
            </v-layout>
            <racingpostrunnerinfo :racingpostdata="runner.racingpostdata" ></racingpostrunnerinfo>           
     
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>


</template>
<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    name:"placepotrunners",
    data(){
        return{
            selections: []
        }
    },
    computed:{
        ...mapGetters([ 'getRaceRunners' ]),
        runners: function(){
            let runners = this.getRaceRunners(this.raceuid);
            return runners;
        },
    },
    props:[
        'raceuid',
        'leg',
        'pooluid',
        'numberoflegs',
        'legselections'
    ],
    methods:{
        ...mapActions([ 'ADD_SELECTION','REMOVE_SELECTION' ]),
        getValue(value){
            this.$nextTick(() =>{
                let elt = document.getElementById( value.UID );
                if (elt.checked)
                {
                    this.ADD_SELECTION({poolid:this.pooluid, leg: this.leg, selection: value } );
                }
                else{
                    this.REMOVE_SELECTION({poolid:this.pooluid, leg: this.leg, selection: value } );
                }
            })
        }
    }
}
</script>