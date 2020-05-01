import * as types from '../actions/actionTypes';
import { browserHistory } from 'react-router';

export default function fortReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_FORTS_SUCCESS:
            return action.forts;
        case types.CREATE_FORT_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.fort)
            ];

        case types.UPDATE_FORT_SUCCESS:
            return [
                ...state.filter(fort=>fort._id!=action.fort._id),
                Object.assign({}, action.fort)
            ];

        case types.DELETE_FORT_SUCCESS:{
               const newState = Object.assign([], action.fort);
               const indexOfFortToDelete = state.findIndex( fort => {
                   return fort._id==action.fort._id;
               })
               newState.splice(indexOfFortToDelete, 1);
            return newState; 
        }   
        default: return state;
    }
   
}