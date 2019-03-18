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
        ...mapGetters([ 'selectedMeetingRaces' ]),
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
        // currentindex: function(){
        //     if (this.selectedMeeting === undefined)
        //         return 0;
        //     return this.todaysplacepotmeetings.findIndex( m => m.MeetingUID == this.selectedMeeting.MeetingUID);
        // },
        // disablenext: function(){
        //     return this.currentindex >= (this.todaysplacepotmeetings.length - 1);
        // },
        // disableprevious: function(){
        //     return this.currentindex <= ( 0 );
        // }
    },
    methods:{
        // next: function(){
        //     if ( !this.disablenext )
        //     {
        //         this.$store.dispatch('SetSelectedRace', this.todaysplacepotmeetings[this.currentindex + 1])
        //     }
        // },
        // previous: function(){
        //     if ( !this.disableprevious )
        //     {
        //         this.$store.dispatch('SetSelectedRace', this.todaysplacepotmeetings[this.currentindex - 1])
        //     }
        // }
    },
    created(){
            if( this.raceuid != null )
            {
                this.$store.dispatch('InitSelectedRace', this.raceuid);
            }
        },
    beforeRouteUpdate (to, from, next) {

                this.$store.dispatch('InitSelectedRace', this.raceuid);


    }
}


    
</script>
