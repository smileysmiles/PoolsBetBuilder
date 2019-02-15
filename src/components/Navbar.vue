<template>
    <nav>
        <v-toolbar flat app>
            <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                
                <span class="font-weight-light">Pools</span>
                <span>Builder</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat color="grey">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
         <v-navigation-drawer app v-model="drawer" class="primary">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.title" :to="link.link">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>    
</template>
<script>
    export default{
        data(){
            return{
                drawer:false,
                links:[
                {title: 'Home', icon: 'dashboard', link:'/'},
                {title: 'Todays Races', icon: 'event', link:'/Today'},
                {title: 'Meetings', icon: 'toc', link:'/Meeting'},
                {title: 'Race', icon: 'access_time', link:'/Race'}
                ],
                right:null
            }
        }
    }
</script>
