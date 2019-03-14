import axios from 'axios';
import initracecard from '@/components/data/racecard';
import moment from 'moment';
import racecardapi from '../../api/RacecardDAL';
import runnerapi from '../../api/RunnersDAL';

const state = {
    racecards: [],
};

const mutations = {
    'ADD_RACECARDS' ( state, racecard ) {
        state.racecards.push(racecard);
    }
};

const actions = {
    async inittodaysracing ({dispatch, commit}) {
        return new Promise(async (resolve, reject) => {
            //var date = moment().format("DD-MM-YYYY");
            var date ='08-03-2019'       
            var racecard = await racecardapi.getRacecard(date);
            var meetings = await Promise.all(racecard.Meetings.map (async meeting =>{
                console.log(meeting);
                meeting.Races = await Promise.all( meeting.Races.map(async race => {
                    race.Runners = await runnerapi.getRaceRunners(race.RaceUID);
                    return race;
                }));
                return meeting
            }));
            racecard.Meetings = meetings;
            console.log(JSON.stringify(racecard));
            setTimeout(() => {
                commit('ADD_RACECARDS', racecard);
                console.log("complete" + JSON.stringify(racecard));
                resolve();
            }, 1)
            })
        }
    }

const getters ={
    racecards: state => {
        return state.racecards;
    },
    todaysracecard: state => {
        //var date = moment().format("DD-MM-YYYY");
        var date ='08-03-2019'       
        var record = state.racecards.find( racecard => racecard.DataID == date);
        //console.log("todays racecard" + JSON.stringify(record));
        if (record)
            return record;
        else
            return null;

    },
    todaysmeetings: (state, getters) => {
        //console.log("todays meetings " + getters.todaysracecard)
        //console.log("todays state " + state.racecards)
        if ( getters.todaysracecard === null)
            return [];

        return getters.todaysracecard.Meetings;
    },
    dataloaded: (state) => {
        console.log("state.racecards" + JSON.stringify(state.racecards))
        //no need to use racecards right now.
        if ( state.racecards != undefined || state.racecards.length != 0)
            return true;
        
        return false;
    }
};

export default { state, mutations, actions, getters };
