<template>
    <v-bottom-nav value="true"  dark fixed >
        <v-btn flat color="teal" to="/today">
            <span>Home</span>
            <v-icon>home</v-icon>
        </v-btn>
        <v-btn flat color="teal">
            <v-badge color="cyan" right bottom>
                <span slot="badge">6</span>
                <v-icon color="grey lighten-1">shopping_cart</v-icon>
            </v-badge>
      </v-btn>       
    </v-bottom-nav>
</template>