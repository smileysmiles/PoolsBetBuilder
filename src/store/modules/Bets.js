const state = {
    winbets: [],
    placebets: [],
};

const mutations = {
    SET_WINBETS ( state, winbets ) {
        state.winbets = winbets;
    }
};

const actions = {

};

const getters ={
    winbets: state => {
        return state.winbets;
    }
};

export default { state, mutations, actions, getters };