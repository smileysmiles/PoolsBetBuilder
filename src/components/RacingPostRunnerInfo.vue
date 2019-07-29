<template>
    <div>
         <v-card v-if="racingpostdata"  >
            <v-card-text class="grey lighten-5">
                <div class="pa-2">{{racingpostdata.spotlight}}</div>
                <v-layout  slot="header" row wrap class="body-2" pa-2>
                    <v-flex xs12 md12 >
                        <v-layout row wrap class="caption fill-height align-left ">
                            <v-flex xs3 md2 class="text-md-right" py-2>
                                <span class="grey--text text--lighten-1">Jockey :</span>
                            </v-flex>
                            <v-flex xs3  md2 class="text-md-left" py-2>
                                <span class="grey--text text--darken-3 text-md-center">{{racingpostdata.jockey_name}}</span>
                            </v-flex>
                            <v-flex xs3  md2 class="text-md-right" py-2>
                                <span class="grey--text text--lighten-1">Trainer :</span>
                            </v-flex>
                            <v-flex xs3  md2 class="text-md-left" py-2>
                                <span class="grey--text text--darken-3">{{racingpostdata.trainer_stylename}}</span>
                            </v-flex>
                            
                            <v-flex xs3 md2 class="text-md-right" py-2><span class="grey--text text--lighten-1">Owner :</span></v-flex>
                            <v-flex xs3 md2 class="text-md-left" py-2><span class="black--text text--darken-3">{{racingpostdata.owner_name}}</span></v-flex>
                            <v-flex xs3 md2 class="text-md-right" py-2>
                                <span class="grey--text text--lighten-1">14 day form :</span>
                            </v-flex >
                            <v-flex xs3 md2 class="text-md-left" py-2>
                                <span class="grey--text text--darken-3">{{racingpostdata.jockey_last_14_days.wins}} wins in {{racingpostdata.jockey_last_14_days.runs}} runs</span>
                            </v-flex>
                        </v-layout>              
                    </v-flex>                     
                </v-layout>
                <v-expansion-panel inset>   
                <v-expansion-panel-content>
                    <v-layout slot="header" row wrap class="body-2">
                        Recent Form
                    </v-layout>
                    <v-card pa-0 dark>
                        <v-card-text class="grey--text text--lighten-5">
                            <v-flex xs12 md12 >
                                Some stuff
                            </v-flex>
                        </v-card-text>
                    </v-card>    
                    
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card-text>
        </v-card>                               
        <v-card v-else>
            <v-card-text class="grey lighten-5"><div class="pa-2">Unfortunately no racing post data has been found. This maybe because you are viewing a virtual race.</div>                 
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    name:"RacingPostRunnerInfo",
    data (){
        return{
        }
    },
    computed: {
    },
    props: [    
            'racingpostdata'
            ]
}

</script>

