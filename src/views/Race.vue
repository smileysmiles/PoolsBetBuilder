<template>
  <div class="about">
  {{Loading}}
    <div v-if="Loading">
      <div class="text-xs-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :width="3"
          color="red"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :width="3"
          color="green"
          indeterminate
        ></v-progress-circular>

        <v-progress-circular
          :size="50"
          color="amber"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <div v-else>
      {{Races}}
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'home',
  computed: {
    Races: function () {
        return this.$store.getters.Races;
      },
    Loading: function () {
        return this.$store.getters.Loading;
      }
  }
}
</script>