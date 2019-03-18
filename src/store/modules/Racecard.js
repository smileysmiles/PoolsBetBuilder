import axios from 'axios';
import testracecard from '../../components/data/racecard';
import testraces from '../../components/data/races';

const state = {
    racecards: [],
    races: [],
    runners: []
};

const mutations = {
    'ADD_RACECARD' ( state, racecard ) {
        state.racecards.push(racecard);
    },
    'ADD_RACE' ( state, race ) {
        state.races = race;
    },
    'ADD_RUNNER' ( state, runners ) {
        state.runners = runners;
    }
};

// actions
const actions = {
     getTodaysRacecard ({ commit }) {
        //var date = moment().format("DD-MM-YYYY");
        var date ='12-03-2019'   

        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date + '/Racecard'
        axios.get(url)
        .then( ( response ) => {


            commit('ADD_RACECARD', testracecard.Items[0]);
         // commit('ADD_RACECARD', response.data.Items[0]);
        })
        .catch( ( error ) => {
            console.log("getRacecard: Fail - " + JSON.stringify(error))
        }) 
    },
    getTodaysRaces ({ dispatch, commit }) {
        //var date = moment().format("DD-MM-YYYY");
        var date ='12-03-2019'   
        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date + '/Race'
        commit('ADD_RACE', testraces.Items);
        // axios.get(url)
        // .then( ( response ) => {
        //     console.log(response)
            
            
        //     //commit('ADD_RACE', response.data.Items);
        // })
        // .catch( ( error ) => {
        //     console.log("getRaces: Fail - " + JSON.stringify(error))
        // }) 
         
    },
    getTodaysRunners ({ dispatch, commit }) {
      //var date = moment().format("DD-MM-YYYY");
      var date ='12-03-2019'   
      var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date + '/Runner'
      axios.get(url)
      .then( ( response ) => {
          console.log(response)
          commit('ADD_RUNNER', response.data.Items);
      })
      .catch( ( error ) => {
          console.log("getRunners: Fail - " + JSON.stringify(error))
      }) 
        
    }
  }
  
 

// const actions = {
//     async inittodaysracing ({dispatch, commit}) {
//         return new Promise(async (resolve, reject) => {
//             //var date = moment().format("DD-MM-YYYY");
//             var date ='12-03-2019'       
//             var racecard = await racecardapi.getRacecard(date);
//             var meetings = await Promise.all(racecard.Meetings.map (async meeting =>{
//                 console.log("Meeting - " + meeting.number);
//                 var races = await racecardapi.getMeetingRaces(meeting.MeetingUID);
//                 console.log("Races - " + races.length );
//                 meeting.Races= await Promise.all( races.map(async race => {
//                     console.log("Race - " + JSON.stringify(race) );
//                     race.Runners = await runnerapi.getRaceRunners(race.UID);
//                     return race;
//                 }));
//                 return meeting
//             }));
//             racecard.Meetings = meetings;
//             console.log(JSON.stringify(racecard));
//             setTimeout(() => {
//                 commit('ADD_RACECARDS', racecard);
//                 console.log("complete" + JSON.stringify(racecard));
//                 resolve();
//             }, 1)
//             })
//         }
//     }

const getters ={
    getracecards: state => {
        return state.racecards;
    },
    todaysraces: state => {
      return state.races;
    },
    racesbymeetinguid: state => (uid) => {
        var races = state.races.filter( race => { race.MeetingUID == uid})
        return races.sort((a, b) => (a.number > b.number) ? 1 : -1)
    },
    racebyuid: state => (uid) => {
        return state.races.find( race =>  race.UID == uid);
    },
    todaysracecard: state => {
        var date ='12-03-2019'
        return state.racecards.find( racecard => racecard.DataID == date);
    },
    getRunnersByRaceUID: (state) => (uid) => {
        var runners =  state.runners.filter(todo => todo.RaceUID === uid);
        return runners.sort((a, b) => a.Number - b.Number) ;
    },
    getMeetingByUID: (state, getters) => (uid) => {
        var meeting =  getters.todaysracecard.Meetings.filter(meeting => meeting.MeetingUID === uid);
        return meeting ;
      },
    
};

export default { state, mutations, actions, getters };
