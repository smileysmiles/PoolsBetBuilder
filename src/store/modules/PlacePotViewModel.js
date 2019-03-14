import moment from 'moment'

const state = {
    selectedmeeting: null,
    selections: [],
    placepotmeetings: []
};

const mutations = {
    SET_SELECTEDMEETING: ( state, meeting ) => {
        state.selectedmeeting = meeting;
    },
    ADD_SELECTION: ( state, selection ) => {
        var record = state.selections.find( element => element.meetinguid == selection.meetinguid )
        if (record)
        {
            state.selections.splice(state.selections.indexOf(record), 1, selection);
        }
        else
        {
            state.selections.push(selection);
        }
    }
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
    AddSelections:({commit}, selection) => {
        commit('ADD_SELECTION', meeting)
    },
};

const getters = {
    selectedMeeting: state => {
        return state.selectedmeeting;
    },
    // selectedRaces: ( state, getters) => {
    //     if (getters.selectedMeeting != undefined)
    //     {
    //         var pool = getters.selectedMeeting.MeetingPools.find( pool => pool.Name == "Placepot");
    //         var index = getters.selectedMeeting.Races.findIndex( race => race.number === pool.FirstLeg );           
    //         var items =  getters.selectedMeeting.Races.slice(index, 6).sort((a, b) => (a.number > b.number) ? 1 : -1);
    //         return items;
    //     }
    //     else
    //         return null;
    // },
    todaysplacepotmeetings: ( state, getters ) => {
        if (getters.todaysracecard != undefined)
        {
            console.log("here");
            var nowtime = moment();
            var meetings = [];
            getters.todaysracecard.Meetings.filter(meeting => {
                var pool = meeting.MeetingPools.find( pool => pool.Name == "Placepot");               
                if (pool)
                {
                    
                    var race = meeting.Races.find( race => race.number === pool.FirstLeg );
                    var racetime = moment(race.ScheduledStart,"HH:mm");
                    console.log(race);
                    if ( nowtime.isBefore( racetime ))
                    {
                        let index = meeting.Races.indexOf(race);
                        meeting.Races =  meeting.Races.slice(index, 6).sort((a, b) => (a.number > b.number) ? 1 : -1);
                        console.log(meeting);
                        meetings.push(meeting);
                    }                   
                } 
                
            });
            console.log("end placepot meetings" + JSON.stringify(meetings));
            return meetings;
        }
        return [];
    }

};

export default { state, mutations, actions, getters };