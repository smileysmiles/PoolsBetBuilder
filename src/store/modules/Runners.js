// import initRunners from '@/components/data/runners';
// import moment from 'moment';
// import axios from 'axios';
// import { date } from './date'
// import { stat } from 'fs';

// const state = {
//     // runners: [],
//     // todaysrunners: [],
//     // loading: false,
//     racingpostrunners: []
// };

// const mutations = {
//     // 'SET_RUNNERS' ( state, runners ) {
//     //     state.runners = runners;
//     // },
//     // 'SET_TODAYSRUNNERS' ( state, todaysrunners ) {
//     //     state.todaysrunners = todaysrunners ;
//     // },
//     // 'SET_LOADING' ( state, loading ) {
//     //     state.loading = loading ;
//     // },
//     'ADD_RPRUNNERS' ( state, rprunners){
//         state.racingpostrunners.push( rprunners )
//     }
// };

// const actions = {  
//     // initRunners: ({commit}) => {
//     //     commit('SET_RUNNERS', initRunners)
//     // },
//     // inittodaysrunners:({commit}) => {
//     //     //commit('SET_LOADING', true);
//     //     var date = moment().format("DD-MM-YYYY");
//     //     //var date ='08-03-2019'
//     //     var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date() + '/Runner'
//     //     axios.get(url)
//     //     .then(res => {
//     //         console.log("data" + res.data);
//     //         if (res.data === undefined)
//     //         {
//     //             console.log("undefined")
//     //             commit('SET_TODAYSRUNNERS', [])
//     //         }
//     //         else
//     //         {
//     //             //RP uses lists not arrays makes it awkward
//     //             var rprunners = Object.keys( res.data.Items ).map( p => Object.assign( res.data.Items[p], {rpraceid:p} ) );
//     //             console.log(rprunners)
//     //             commit('SET_TODAYSRUNNERS', rprunners)
//     //         }
//     //         });   
//     //     //commit('SET_LOADING', false);     
//     // },
//     loadRacingpostRunners:({commit, state}, raceUID) => {
//         console.log("Load Racing Post Data", raceUID)
//         if(state.racingpostrunners && state.racingpostrunners.length > 0)
//         {
//             let exists = state.racingpostrunners
//             .find( runner => runner.RaceUID == raceUID)
//             if(exists && exists.Runners.length > 0)
//                 return;
//         }
//         var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racingpostrunners/raceuid/' + raceUID
//         axios.get(url)
//         .then(res => {
//             console.log("data" + res.data);
//             if (res.data)
//             {
//                 //RP uses lists not arrays makes it awkward
//                 var rprunners = Object.keys( res.data.Items ).map( p => Object.assign( res.data.Items[p], {rpraceid:p} ) );
//                 console.log(rprunners)
//                 let racerunners  = { RaceUID: raceUID, Runners: rprunners};
//                 commit('ADD_RPRUNNERS', racerunners)
//             }
//             });   

//     }


// };

// const getters ={
//     // runners: state => {
//     //     return state.runners;
//     // },
//     // todaysrunners: state => {
//     //     return state.todaysrunners;
//     // },
//     // loading: state => {
//     //     return state.loading;
//     // },
//     RacingPostRunnersByPoolsRaceUID: state => (raceUID) => {
//         if (state.racingpostrunners && state.racingpostrunners.length > 0)
//         {
//             console.log("Racing POST Runners - ", raceUID)
//             let result = state.racingpostrunners.find( raceRunners => raceRunners.RaceUID == raceUID );
//             return result;
//         }
//         return null;
//     }
// };

// export default { state, mutations, actions, getters };