<template>
    <v-container mt-5 pa-0>
        <div v-if="loaded">
            <meetingheader></meetingheader>
            <placepotheader v-if="selectedMeeting != undefined"></placepotheader>
        </div>
        <p v-else>Loading</p>
    </v-container>
</template>
<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex'

    export default{
        name: "PlacePotBetSlip",
        data(){
            return {
                selectedmeetinguid: null,
                loaded: false
            }
        },
        computed:{
            ...mapGetters([ 'todayspoolmeetings', 'selectedMeeting' ]),
            mymeeting(){
                return this.selectedMeeting;
            }
        },
        created(){
            this.selectedmeetinguid = this.$route.params.UID;
            
            if( this.selectedmeetinguid != null )
            {
                this.$store.dispatch('InitSelectedMeeting', this.selectedmeetinguid).then(() => {
                    console.log("Success1" + this.selectedmeetinguid);
                    this.loaded = true;
                });
            }
            else
            {
                this.$store.dispatch('SetSelectedMeeting', this.todayspoolmeetings("Placepot")[0]).then(() => {
                    console.log("Success2");
                    
                    this.loaded = true;
                });
            }
        }
    
    }  
</script>
<style scoped>
.v-btn {
  padding: 0px;
  margin: 2px;
}
</style>