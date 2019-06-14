<template>
<div v-if="todaysplacepotmeetings != undefined && todaysplacepotmeetings != null ">

            <v-layout slot="header" row wrap class="body-2" >
                <v-flex xs2  class="justify-left">
                    <v-btn @click="previous()" :disabled="disableprevious" flat icon>
                        <v-icon>fa-arrow-circle-left</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs8 class="justify-center">
                    <v-combobox
                    v-model="selectedMeeting"
                    :items="todaysplacepotmeetings"
                    item-text="Meeting.Name"
                    item-value="UID"
                    label="Placepot meeting"
                    return-object
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
    computed:{
        ...mapGetters([ 'todayspoolmeetings' ]),
        todaysplacepotmeetings: function (){
            return this.todayspoolmeetings("Placepot");
        },
        selectedMeeting:{
            get(){
                return this.$store.getters.selectedMeeting;
            },
            set(meeting){
                this.$store.dispatch('SetSelectedMeeting', meeting)
            }
        },
        currentindex: function(){
            if (this.selectedMeeting === undefined)
                return 0;
            return this.todaysplacepotmeetings.findIndex( m => m.MeetingUID == this.selectedMeeting.MeetingUID);
        },
        disablenext: function(){
            return this.currentindex >= (this.todaysplacepotmeetings.length - 1);
        },
        disableprevious: function(){
            return this.currentindex <= ( 0 );
        }
    },
    methods:{
        next: function(){
            if ( !this.disablenext )
            {
                this.$store.dispatch('SetSelectedMeeting', this.todaysplacepotmeetings[this.currentindex + 1])
            }
        },
        previous: function(){
            if ( !this.disableprevious )
            {
                this.$store.dispatch('SetSelectedMeeting', this.todaysplacepotmeetings[this.currentindex - 1])
            }
        }
    },

}


    
</script>
