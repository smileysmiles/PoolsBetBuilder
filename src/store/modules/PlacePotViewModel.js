import moment from 'moment'

//poolid = poolidentifier + "_" Leg
//placepotselections = { poolid, selections }

const state = {
    placepotselections:[],
    pooluid: null,
    leg1selections:[]
};

const mutations = {
    'ADD_TO_SELECTIONS' ( state, selection ) {
        //find PoolID
        let exists = state.placepotselections.find( bet => bet.poolid == selection.poolid );
        if (!exists)
        {
            let output = [ { leg : selection.leg, selections: [ selection.selection ] } ];
            
            state.placepotselections.push( { poolid : selection.poolid, legs : output } );
        }
        else
        {
            console.log("Exists")

            let poolleg = exists.legs.find( leg => leg.leg == selection.leg )

            if (poolleg)
                poolleg.selections.push( selection.selection );
            else
                {
                    let output = { leg : selection.leg, selections: [ selection.selection ] };
                    exists.legs.push( output )
                }
            
        }       
    },
    'REMOVE_FROM_SELECTIONS' ( state, selection ) {
        //find PoolID
        let exists = state.placepotselections.find( bet => bet.poolid == selection.poolid );
        if (exists)
        {
            let poolleg = exists.legs.find( leg => leg.leg == selection.leg )

            if (poolleg)
                poolleg.selections = poolleg.selections.filter( item => item.UID != selection.selection.UID)
        }
 
    }
};

const actions = {  
    
    ADD_SELECTION ({ commit}, selection){
        if (state.poolid != selection.poolid)
            commit('CLEAR_PLACEPOT')
        commit('ADD_TO_BETLIP', selection) 
    },
    REMOVE_SELECTION({commit}, selection){
        commit('REMOVE_FROM_BETLIP', selection) 
    },
};

const getters = {
    selectedMeeting: state => {
        return state.selectedmeeting;
    },
    selections: state => {
        return state.selections;
    },
    getbetslip: state => pooluid => {
        let betslip = state.betslip.find( bet => bet.poolid == pooluid );
        return betslip;
    }

};

export default { state, mutations, actions, getters };