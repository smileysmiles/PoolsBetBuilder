import moment from 'moment'

const state = {
    selectedmeeting: null,
    selectedrace: null,
    selections: [],
    placepotmeetings: []
};

const mutations = {
    SET_SELECTEDMEETING: ( state, meeting ) => {
        state.selectedmeeting = meeting;
    },
    SET_SELECTEDRACE: ( state, race ) => {
        state.selectedrace = race;
    },
};

const actions = {  
    SetSelectedMeeting: ({commit, getters}, meeting) => {
        return new Promise((resolve, reject) => {
            commit('SET_SELECTEDMEETING', meeting)
            resolve();
            });       
    },
    InitSelectedMeeting:({commit, getters}, uid) => {
        return new Promise((resolve, reject) => {
            var meeting = getters.todaysplacepotmeetings.find( meeting => meeting.MeetingUID == uid );   
            commit('SET_SELECTEDMEETING', meeting)
            resolve();
            });       
    },
    InitSelectedRace:({commit, getters}, uid) => {
            var race = getters.racebyuid( uid );
            console.log("Race" + race)
            if (race != undefined)
            {
                commit('SET_SELECTEDRACE', race);
                var meeting = getters.getMeetingByUID( race.MeetingUID);
                if (meeting != undefined)
                {
                    commit('SET_SELECTEDMEETING', meeting)
                }
            }
    },
};

const getters = {
    selectedMeeting: state => {
        return state.selectedmeeting;
    },
    selectedRace: state => {
        return state.selectedrace;
    },
    selectedMeetingRaces: (state, getters) =>{
        if ( state.selectedMeeting === undefined)
            return undefined;
        return getters.racesbymeetinguid( state.selectedMeeting.MeetingUID );
    },

    todaysplacepotmeetings: ( state, getters ) => {
        if (getters.todaysracecard != null)
        {
            var meetings = JSON.parse(JSON.stringify( getters.todaysracecard.Meetings )) ;
            return meetings.filter(meeting => {
                 var pool = meeting.MeetingPools.find( pool => pool.Name == "Placepot");               
                 if (pool)
                 {
                     var race = meeting.Races.find( race => race.number === pool.FirstLeg );
                     var racetime = moment(race.ScheduledStart,"HH:mm");
                     console.log("PP RACE" + race);
                     if ( moment().isBefore( racetime ))
                     {
                         let index = meeting.Races.indexOf(race);
                         var ppraces =  meeting.Races.slice(index, 6).sort((a, b) => (a.number - b.number) );
                         meeting.Races=ppraces
                         return meeting;
                     } 
                 } 
                
             });
        }
        return [];
    }

};

export default { state, mutations, actions, getters };