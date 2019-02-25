import initracecard from '@/components/data/racecard';

const state = {
    racecards: []
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
        return state.racecards.Items[0];
    }
};

export default { state, mutations, actions, getters };