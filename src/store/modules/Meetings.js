import initmeetings from '@/components/data/meeting';

const state = {
    meetings: []
};

const mutations = {
    'SET_RACECARDS' ( state, racecards ) {
        state.racecards = racecards;
    }
};

const actions = {
    viewRacecard: ({commit}, date) => {
        commit();
    },
    initRacecard: ({commit}) => {
        commit('SET_RACECARDS', initracecard)
    }
};

const getters ={
    racecard: state => {
        return state.racecards;
    }
};

export default { state, mutations, actions, getters };