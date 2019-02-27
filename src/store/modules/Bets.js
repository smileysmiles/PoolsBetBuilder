const state = {
    winbets: [],
    placebets: [],
    exactabets: []

};

const mutations = {
    SET_WINBETS ( state, winbets ) {
        state.winbets = winbets;
    },
    SET_PLACEBETS ( state, winbets ) {
        state.placebets = winbets;
    },
    SET_EXACTABETS ( state, exactabets ) {
        state.exactabets = exactabets;
    }
};

const actions = {

};

const getters ={
    winbets: state => {
        return state.winbets;
    },
    placebets: state => {
        return state.placebets;
    },
    exactabets: state => {
        return state.exactabets;
    }
};

export default { state, mutations, actions, getters };