<template>

    <v-expansion-panel>
        <v-expansion-panel-content >
            <v-layout slot="header" row wrap class="body-2">
                <v-flex xs12 md12 >
                    <v-layout row wrap class="caption fill-height align-center justify-space-around">
                        <v-flex xs1 md1 >
                            <span class="grey--text text--lighten-1">No.</span>
                        </v-flex>
                        <v-flex xs2 md1 >
                            <span class="grey--text text--lighten-1">Silk</span>
                        </v-flex>
                        <v-flex xs6><span class="grey--text text--lighten-1">Name</span></v-flex>
                        <v-flex xs2 class="grey--text text--lighten-1">Place</v-flex>
                    </v-layout>                                     
                </v-flex>
            </v-layout>
            <v-card pa-0>
                <v-card-text class="grey lighten-5">
                    <h4>What is Quadpot</h4>
                    <p> Pick a horse to win in each of the four totequadpot races(legs).</p>
                    <h4>Pick more horses to increase your chances</h4>
                    <p>You can choose just one horse in each race, although selecting two or more horses offers a greater chance of winning.</p>
                    <p>Total stake will be calculated by multiplying the number of selections in each leg as below.</p>
                    <h4>2 x 1 x 2 x 3 = 12 selections</h4>
                    <p>then multiply this by your chosen stake unit which must be more than 10 pence with a Total stake of at least £2</p>
                    <h4>12 x 50p = £6.00</h4>
                </v-card-text>
            </v-card>    
        </v-expansion-panel-content>
    </v-expansion-panel>

</template>
<script>
</script>