<template>
    <v-flex xs2 v-if="runner">
        <v-checkbox v-model="selected" :value="runner" :id="runner.UID" @click.native="getValue(runner)" @click.native.stop />
    </v-flex>
</template>
<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    name:"placepotselection",
    data(){
        return{
            selected: null
        }
    },
    computed:{
    },
    props:[
        'runner',
        'leg',
        'pooluid',
        'numberoflegs',
        'selector'
    ],
    methods:{
        ...mapActions([ 'ADD_SELECTION','REMOVE_SELECTION' ]),
        getValue(value){
            this.$nextTick(() =>{
                let elt = document.getElementById( value.UID );
                if (elt.checked)
                {
                    console.log('checked');
                    this.ADD_SELECTION({poolid:this.pooluid, leg: this.leg, numberoflegs: this.numberoflegs, selection: value } );
                }
                else{
                    this.REMOVE_SELECTION({poolid:this.pooluid, leg: this.leg, selection: value } );
                }
            })
        }
        
    },
    async created () {
        if(this.selector && this.runner)
        {
            let sel = this.selector.find( item => item.UID == this.runner.UID )
            this.selected = sel;
        }
  },
}
</script>