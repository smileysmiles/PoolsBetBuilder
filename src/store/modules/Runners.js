import initRunners from '@/components/data/runners';

const state = {
    runners: []
};

const mutations = {
    'SET_RUNNERS' ( state, runners ) {
        state.runners = runners;
    }
};

const actions = {
   
    initRacecard: ({commit}) => {
        commit('SET_RUNNERS', initRunners)
    }
};

const getters ={
    runners: state => {
        return state.runners;
    }
};

export default { state, mutations, actions, getters };