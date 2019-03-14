import initraces from '@/components/data/races';
import moment from 'moment';
import axios from 'axios';

const state = {
    races: [],
    todaysraces: []
};

const mutations = {
    'SET_RACES' ( state, races ) {
        state.races = races;
    },
    'SET_TODAYSRACES' ( state, todaysraces ) {
        state.todaysraces = todaysraces;
    }
};

const actions = {
    initRaces: ({commit}) => {
        commit('SET_RACES', initraces)
    },
    inittodaysraces:({commit}) => {
        //var date = moment().format("DD-MM-YYYY");
        var date ='08-03-2019'
        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date + '/Race'
        axios.get(url)
        .then(res => {
            //console.log("data 5" + JSON.stringify(res.data.Items));
            
            if (res.data == undefined )
                commit('SET_TODAYSRACES', [])
            else
            {

                commit('SET_TODAYSRACES', res.data.Items)
            }

            });        
    }
};

const getters ={
    races: state => {
        return state.races;
    },
    todaysraces: state => {
        return state.todaysraces;
    },
    getracesbymeetingid: (state) => (uid)=>{
        return state.todaysraces.filter(todo => todo.MeetingUID === uid)
    }
};

export default { state, mutations, actions, getters };