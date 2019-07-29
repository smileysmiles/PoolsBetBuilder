<template>
<div v-if="selectedRace != undefined && selectedRace != null ">
    <v-layout slot="header" row wrap class="body-2" >
        <v-flex xs2  class="justify-left">
            <v-btn @click="previous()" :disabled="disableprevious" flat icon>
                <v-icon>fa-arrow-circle-left</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs8 class="justify-center">
            <v-combobox
            v-model="selectedrace"
            :items="selectedmeeting.Races"
            item-text="ScheduledStart"
            item-value="RaceUID"
            label="Race"
            ></v-combobox>
        </v-flex>
        <v-flex xs2>
            <div class="justify-right">
                <v-btn @click="next()" :disabled="disablenext" flat icon>
                    <v-icon>fa-arrow-circle-right</v-icon>
                </v-btn>
            </div>
        </v-flex>
    </v-layout>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
      return {
             
      }
    },
    props: ['raceuid'] ,
    computed:{
        ...mapGetters([ 'racebyuid' ]),
        todaysraces: function () {
            return this.$store.getters.todaysraces;
        },
        racerunners: function () {
            return this.$store.getters.getRunnersByRaceUID(this.UID);
        },  
        race: function(){
        return this.todaysraces.find( item => item.UID == this.raceuid );
        },
        selectedMeetings: function(){
            return this.$store.state.selectedmeeting;
        },
        selectedRace: function(){
            this.todaysraces.find( race => race.UID == this.raceid);
        },
    },
    methods:{
    },
    created(){

        },
    beforeRouteUpdate (to, from, next) {

    }
}


    
</script>
