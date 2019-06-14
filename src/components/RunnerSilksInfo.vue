<template>
    <v-flex xs2 md1>
        <v-avatar size="25" tile>
            <img v-if="racingpostdata != null" :src="racingpostdata.silk_image_png" />
            <img v-else src="https://assets.ladbrokes.com/medias/racing_post/silk/159790.gif" />
        </v-avatar>
    </v-flex>
</template>
<script>
export default {
    name:"RunnersSilksInfo",
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

