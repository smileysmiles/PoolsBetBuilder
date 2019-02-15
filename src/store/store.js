import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios';
import moment from 'moment'
import racecard from './modules/Racecard'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        racecard
    }
    // state:{
    //     Racecard: undefined,
    //     Meetings: [],
    //     Races: [],
    //     Loading: false,
    //     DateFilter: moment().format("YYYY-MM-DD")
    // },
    // mutations:{
    //     SET_DATEFILTER: (state, newValue) => {
    //         state.DateFilter = moment(newValue).format("YYYY-MM-DD");
    //     }
    // },
    // actions:{
    //     set_dateFilter:({commit, state}, newValue) => {
    //         commit('SET_DATEFILTER', newValue);
    //         populateData(state);
    //         return state.DateFilter;
    //     }
    // },
    // getters:{
    //     Racecard: state => {
    //         populateData(state);
    //         return state.Racecard;
    //     },
    //     Meetings: state =>  {
    //         populateData(state);
    //         return state.Meetings;
    //     },
    //     Races: state => {
    //         populateData(state);
    //         return state.Races;
    //     },
    //     Loading: state => {
    //         return state.Loading;
    //     },
    //     DateFilter: state => {
    //         return state.DateFilter;
    //     }
    // }
});

var populateData = function(state){
    if (state.loading) return null;
    if (state.Racecard === undefined || state.Racecard.DateFilter == state.DateFilter )
    {
        state.Loading = true;
        
        axios.get('https://ujmft8rx60.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + state.DateFilter)
        .then(res => {
            var data = res.data;
            state.Racecard = data.Items.filter( rc => rc.DataType == "Racecard");
            state.Racecard.DateFilter == state.DateFilter;
            state.Meetings = data.Items.filter( rc => rc.DataType == "Meeting");
            state.Races = data.Items.filter( rc => rc.DataType == "Race");
            state.Loading= false;

            console.log(state.Racecard);
            })
    }
}