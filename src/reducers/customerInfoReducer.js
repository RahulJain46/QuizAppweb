import * as types from '../actions/actionTypes'
import initialState from './initialState';

export default function customerInfoReducer(state = initialState.customerInformations, action) {
    switch (action.type) {
        case types.CREATE_CUSTOMERINFO_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.customerInfo)
            ];
        case types.CHECK_CUSTOMERINFO_SUCCESS:
            return action.message;
        default: return state;
    }
   
}