import initRP from '@/components/data/Racingpost';

const state = {
    rp: []
};

const mutations = {
    'SET_RP' ( state, rp ) {
        state.rp = rp;
    }
};

const actions = {
   
    initRacecard: ({commit}) => {
        commit('SET_RP', initRP)
    }
};

const getters ={
    rp: state => {
        return state.rp;
    }
};

export default { state, mutations, actions, getters };