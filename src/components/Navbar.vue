<template>
    <div>
        <v-toolbar flat app dense light color="primary">
            <v-toolbar-side-icon color="secondary" class="primary--text  text--lighten-4" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase secondary--text">
                <span class="font-weight-dark secondary--text">{{ currentRouteName }}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon color="secondary" to="/">
                <v-icon >home</v-icon>
            </v-btn>
        </v-toolbar>



         <v-navigation-drawer dark app v-model="drawer" color="primary" >
            <v-list>
                <v-list-tile v-for="link in links" :key="link.title" :to="link.link">
                    <v-list-tile-action>
                        <v-icon class="grey--text text--lighten-4">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="grey--text text--lighten-4">{{ link.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
    
</template>
<script>
    export default{
        data(){
            return{
                betslip:false,
                links:[
                {title: 'Todays Races', icon: 'event', link:'/'},
                {title: 'Architecture Timeline', icon: 'event', link:'/ArchitectureTimeline'},
                ],
                right:null
            }
        },
        props:[ 'drawer' ],
        computed: {
            currentRouteName() {
                return this.$route.name;
            }
        }
    }
</script>
