<template>
  <div class="about">
    <h1>Meetings</h1>
    {{Meetings}}
  </div>
</template>
<script>
export default {
  name: 'home',
  computed: {
    Meetings: function () {
        return this.$store.getters.Meetings;
      }
  }
}
</script>