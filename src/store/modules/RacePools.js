import axios from 'axios';
import { date } from './date'

const state = {
    meetingpools : [],
    racepools : []
}

const mutations = {
    SET_RACEPOOLS ( state, pools ) {
        state.racepools = pools;
    },
    SET_MEETINGPOOLS ( state, pools ) {
        state.meetingpools = pools;
    }
}

const actions = {
    async initRacepools({commit}){
        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/pool/' + date() + '/racepools'

        let res = await axios.get(url)
            if (res.data !== undefined)
            {
                commit('SET_RACEPOOLS', res.data.Items);
                console.log("complete");
            }

    },
    async initMeetingPools({commit}){
        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/pool/' + date() + '/meetingpools'

        let res = await axios.get(url)
            if (res.data !== undefined)
            {
                commit('SET_MEETINGPOOLS', res.data.Items);
                console.log("complete");
            }

    }
}

const getters = {
    getpoolsbytype: state => ( type ) => {
        return state.meetingpools.filter( pool => pool.Name == type);
    },
}



export default { state, mutations, actions, getters };