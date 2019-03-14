<template>
<div v-if="this.selectedMeeting != undefined">
    {{this.selectedMeeting}}
         <v-tabs dark show-arrows>
    <v-tabs-slider color="white"></v-tabs-slider>

    <v-tab v-for="i in 30" :key="i" :href="'#tab-' + i">
      Item {{ i }}
    </v-tab>

    <v-tabs-items>
      <v-tab-item
        v-for="i in 30"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</div>


</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters([ 'selectedMeeting' ])
    }

}
</script>