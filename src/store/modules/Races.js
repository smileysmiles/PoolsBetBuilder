import initraces from '@/components/data/races';

const state = {
    races: []
};

const mutations = {
    'SET_RACES' ( state, races ) {
        state.races = races;
    }
};

const actions = {
    viewRace: ({commit}, id ) => {
        commit();
    },
    initRaces: ({commit}) => {
        commit('SET_RACES', initraces)
    }
};

const getters ={
    races: state => {
        return state.races;
    }
};

export default { state, mutations, actions, getters };