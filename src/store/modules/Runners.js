import initRunners from '@/components/data/runners';
import moment from 'moment';
import axios from 'axios';

const state = {
    runners: [],
    todaysrunners: [],
    loading: false
};

const mutations = {
    'SET_RUNNERS' ( state, runners ) {
        state.runners = runners;
    },
    'SET_TODAYSRUNNERS' ( state, todaysrunners ) {
        state.todaysrunners = todaysrunners ;
    },
    'SET_LOADING' ( state, loading ) {
        state.loading = loading ;
    }
};

const actions = {  
    initRunners: ({commit}) => {
        commit('SET_RUNNERS', initRunners)
    },
    inittodaysrunners:({commit}) => {
        //commit('SET_LOADING', true);
        //var date = moment().format("DD-MM-YYYY");
        var date ='08-03-2019'
        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date + '/Runner'
        axios.get(url)
        .then(res => {
            console.log("data" + res.data);
            if (res.data === undefined)
            {
                console.log("undefined")
                commit('SET_TODAYSRUNNERS', [])
            }
            else
            {
                //RP uses lists not arrays makes it awkward
                var rprunners = Object.keys( res.data.Items ).map( p => Object.assign( res.data.Items[p], {rpraceid:p} ) );
                console.log(rprunners)
                commit('SET_TODAYSRUNNERS', rprunners)
            }
            });   
        //commit('SET_LOADING', false);     
    }
};

const getters ={
    runners: state => {
        return state.runners;
    },
    todaysrunners: state => {
        return state.todaysrunners;
    },
    getRunnersByRaceUID: (state) => (uid) => {
        return state.todaysrunners.filter(todo => todo.RaceUID === uid)
      },
    loading: state => {
        return state.loading;
    },
};

export default { state, mutations, actions, getters };