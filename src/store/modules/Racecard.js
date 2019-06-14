import axios from 'axios';
import testracecard from '../../components/data/racecard';
import testraces from '../../components/data/races';
import { date } from './date'

const state = {
    racecards: [],
    meetings: [],
    races: [],
    runners: [],
    dataloading: false,
    meetingpools: [],
    poolraces: []
};

const mutations = {
    'ADD_RACECARD' ( state, racecard ) {
        state.racecards.push(racecard);
    },
    'ADD_MEETING_RACES' ( state, race ) {
        state.races.push( ...race);
    },
    'ADD_RACE_RUNNERS' ( state, racerunners ) {
        state.runners.push(racerunners);
    },
    'ADD_MEETINGS' ( state, meetings ) {
        state.meetings = meetings;
    },
    'LOAD_DATA' (state){
        state.dataloading = true;
    },
    'DATA_LOADED' (state){
        state.dataloading = false;
    },
    'ADD_MEETING_POOLS' ( state, pools ) {
        state.meetingpools.push (pools);
    },
    'ADD_MEETING_POOL_RACES' ( state, poolraces ) {
        state.poolraces.push (poolraces);
    },

};

// actions
const actions = {



    async getTodaysCourseData({ commit, state, dispatch }, course)
    {
        if (state.dataloading)
            return;
        
        var racecard;
        if ( state.racecards )
        {
            racecard = state.racecards.find( racecard => racecard.DataID == date());            
        }

        //Load Racecard if required & Meetings
        if(!racecard)
        {
            //Assume Meetings also required
            console.log("Start retrieving Racecard & Meetings")
            await Promise.all([
                dispatch('getTodaysRacecard'),
                dispatch('getTodaysMeetings')
            ])
            console.log("Completed retrieving Racecard & Meetings")
        }
        else
        {

            if( !state.meetings || state.meetings.length == 0)
            {
            console.log("Start retrieving Meetings")
            await dispatch('getTodaysMeetings');
            console.log("Completed retrieving Meetings")
            }
        }

        let meeting = state.meetings.find( meeting => meeting.Meeting.Name.toUpperCase() == course.toUpperCase());
        console.log("Meeting", meeting);
        //Load Races if required
        await Promise.all([
            dispatch('getMeetingRaces', meeting.UID),
            dispatch('getMeetingPools', meeting.UID)
        ])
        //Shape some data
        //Shouldnt need to wait for this.
        dispatch('BuildPoolRaces', meeting.UID);
    },
    async getTodaysData({ commit, state, dispatch })
    {
        if (state.dataloading)
            return;

        if ( state.racecards )
        {
            let todaysRacecard = state.racecards.find( racecard => racecard.DataID == date);
            if (todaysRacecard)
            {
                //nothing to do
                return;
            }
        }
        commit('LOAD_DATA');

        await Promise.all([
            dispatch('getTodaysRacecard'),
            dispatch('getTodaysRaces'),
            dispatch('initRacepools'),
            dispatch('initMeetingPools'),           
            dispatch('getTodaysRunners')
            ]);
        
        commit('DATA_LOADED');
    },
    async getTodaysRacecard ({ commit }) {
        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date() + '/Racecard'
        try
        {
            let res = await axios.get(url)
            if(res !== undefined && res.data !== undefined )
            {
                console.log(res);
                commit('ADD_RACECARD', res.data.Items[0]);
                console.log("ADD_RACECARD")
            }
        }
        catch( error ) {
            console.log("getRacecard: Fail - " + JSON.stringify(error))
        }
    },
    async getTodaysMeetings ({ commit, state }) {

        if (state.meetings && state.meetings.length > 0)
            return

        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date() + '/Meeting'
        
        try
        {
            let res = await axios.get(url)
            if(res !== undefined && res.data !== undefined )
            {
                console.log(res);
                commit('ADD_MEETINGS', res.data.Items);
                console.log("ADD_MEETINGS")
            }
        }
        catch( error ) {
            console.log("ADD_MEETINGS: Fail - " + JSON.stringify(error))
        }
         
    },
    async getTodaysRaces ({ commit }) {

        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/racecard/' + date() + '/Race'
        
        try
        {
            let res = await axios.get(url)
            if(res !== undefined && res.data !== undefined )
            {
                console.log(res);
                commit('ADD_RACE', res.data.Items);
                console.log("ADD_RACE")
            }
        }
        catch( error ) {
            console.log("ADD_RACE: Fail - " + JSON.stringify(error))
        }
         
    },
    async getMeetingRaces ({ commit, state, dispatch }, meetingUID) {

        //Does it exist
        if(state.races)
        {
            let exists = state.races.filter(race => race.MeetingUID == meetingUID );
            if (exists && exists.length > 0)
            {
                console.log("Meeting Races already loaded")
                return
            }
        }
        console.log("Loading Meeting Races")

        var url = `https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/race/${meetingUID}`;
        
        try
        {
            let res = await axios.get(url)
            if(res !== undefined && res.data !== undefined )
            {
                let races = res.data.Items;

                let sortedraces = races.sort((a, b) => (a.Race.Number - b.Race.Number))

                console.log(res);
                commit('ADD_MEETING_RACES', sortedraces);
                console.log("ADD_MEETING_RACES");
               
                console.log("Getting Race Runners")
                let result = await Promise.all( sortedraces.map ( async race => {
                    await dispatch('getRaceRunners', race.UID);
                    console.log("Completed Getting Race Runners")
                }));
            }
            return;
        }
        catch( error ) {
            console.log("ADD_MEETING_RACES: Fail - " + JSON.stringify(error))
        }
    },
    async getRaceRunners ({ commit }, raceUID) {

        var url = `https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/runner/${raceUID}`
        
        try
        {
            let res = await axios.get(url)
            if(res !== undefined && res.data !== undefined )
            {
                let sortedrunners = res.data.Items.sort((a, b) => (a.Number - b.Number) )
                let item = { raceuid: raceUID, runners: sortedrunners}
                commit('ADD_RACE_RUNNERS', item);
                console.log("ADD_RACE_RUNNERS")
            }
        }
        catch( error ) {
            console.log("ADD_RACE_RUNNERS: Fail - " + JSON.stringify(error))
        }
         
    },
    async BuildPoolRaces({commit}, meetingUID)
    {
        //Need to tie this together with get meeting races.
        //or just tie in id's and pull races from the races object this is PoC only.

        //Validate Meeting Pools & get list
        if(!state.meetingpools)
            return;
            console.log("something3")
        let meetingpools = state.meetingpools.find( meeting => meeting.meetinguid == meetingUID);

        if(!meetingpools)
            return;

        meetingpools = meetingpools.meetingpools;

        //Validate Meeting races & get list
        if(!state.races)
            return;
            console.log("something2")
        let races = state.races.filter(race => race.MeetingUID == meetingUID );

        if(!races)
            return;
       
        console.log("something")

        let poolraces = meetingpools.map( pool => {
            let firstleg = parseInt(pool.FirstLeg);
            let numberoflegs = parseInt(pool.NumberOfLegs);

            //Races already sorted.
            //beware == not === here
            let firstrace = races.find( race => race.Race.Number == firstleg )

            let index = races.index = races.indexOf ( firstrace );

            //slice uses start and end index not end length
            //character at lastposition is not included hence no -1
            let lastposition = (index + numberoflegs);
            console.log(index + " - " + " - " + numberoflegs)

            let placepotraces = races.slice(index, lastposition);
            return { pool: pool.Name, uid: pool.UID, numberoflegs: pool.NumberOfLegs,  races: placepotraces, firstleg: firstleg};
        })



        commit('ADD_MEETING_POOL_RACES', { meetinguid: meetingUID, poolsRaces: poolraces});
    },
    async getMeetingPools({commit}, meetinguid){
        var url = 'https://azs0ed5o6l.execute-api.eu-west-2.amazonaws.com/dev/meetingpools/' + meetinguid;

        if (state.meetingpools)
        {
            let exists = state.meetingpools.find( pool => pool.meetinguid == meetinguid)
            if(exists && exists.meetingpools && exists.meetingpools.length > 0)
                return;
        }
        
        let res = await axios.get(url)
        if (res.data !== undefined)
        {
            let pools = res.data.Items;
            let item ={ meetinguid: meetinguid, meetingpools: pools}
            commit('ADD_MEETING_POOLS', item);
            console.log("complete");
        }

    }
  }
  

const getters ={
    getracecards: state => {
        return state.racecards;
    },
    gettodaysracecard: state => {
            return state.racecards.find( racecard => racecard.DataID == date());
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
        return state.racecards.find( racecard => racecard.DataID == date());
    },
    getRunnersByRaceUID: (state) => (uid) => {
        var runners =  state.runners.filter(todo => todo.RaceUID === uid);
        return runners.sort((a, b) => a.Number - b.Number) ;
    },
    getMeetingByUID: (state, getters) => (uid) => {
        var meeting =  getters.todaysracecard.Meetings.filter(meeting => meeting.MeetingUID === uid);
        return meeting ;
      },
    getTodaysMeetings: (state) => {
        return state.meetings;
    },
    getMeetingRaces: ( state ) => ( meetinguid )=>{
        console.log("meeting UID", meetinguid)
        var races = state.races.filter(race => race.MeetingUID == meetinguid)
        console.log("Meeting Races - ",races)    
        return races;
    },
    getPoolRaces: ( state ) => ( meetinguid )=>{
        let poolRaces = state.poolraces.find(race => race.meetinguid == meetinguid);
        if (!poolRaces)
            return null;

        let items = JSON.parse(JSON.stringify(poolRaces.poolsRaces))
        let sortedPools = items.sort((a, b) => (a.firstleg - b.firstleg) )
        return sortedPools;
    },
    getPlacePotRaces: ( state ) => ( meetinguid )=>{
        let placepotraces = state.poolraces.find(race => race.meetinguid == meetinguid);
        if(!placepotraces)
            return;

        let poolraces = placepotraces.poolsRaces.find( pool => pool.pool == "Placepot");
       
        if (poolraces)
            return poolraces;
        
        return poolraces;
    },
    getRaceRunners: ( state ) => ( raceuid )=>{
        var runners = state.runners.find(runner => runner.raceuid == raceuid)
        if (runners)
            return runners.runners;
        
        return runners;
    },
    getRaceRunnersWithFav: ( state ) => ( raceuid )=>{
        var runners = state.runners.find(runner => runner.raceuid == raceuid)
        if (runners)
        {
            runners = JSON.parse(JSON.stringify(runners));
            let unnamedfavorite = {
                "RaceDate":"21-05-2019",
                "DataID":"0",
                "DataType":"Runner",
                "UID":raceuid,
                "Name":"Unnamed Favorite"
                ,"Number":"-",
                "RaceUID":raceuid,
                "racingpostdata":null
                ,"rpmeetingID":"2276077"};
            
            runners.runners.push(unnamedfavorite);
            return runners.runners;
        }
        
        return runners;
    },
    getMeetingPools: ( state ) => ( meetinguid )=>{
        var pools = state.meetingpools.find(pool => pool.meetinguid == meetinguid)
        if (pools)
            return pools.meetingpools;
        
        return pools;
    }
};

export default { state, mutations, actions, getters };
