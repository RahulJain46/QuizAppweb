import * as types from './actionTypes'
//import fortApi from '../api/mockFortApi'
import { getFort , getFortById , updateFort, deleteFort , save} from "../api/Fort";




export function loadFortsSuccess(forts) {
    return { type: types.LOAD_FORTS_SUCCESS, forts };
}

export function createFortSuccess(fort) {
    return { type: types.CREATE_FORT_SUCCESS, fort };
}

export function updateFortSuccess(fort) {
    return { type: types.UPDATE_FORT_SUCCESS, fort };
}

export function deleteFortSuccess(fort) {
    return { type: types.DELETE_FORT_SUCCESS, fort };
}


export function loadFort() {
    return function (dispatch) {
        return getFort().then((forts) => {
            dispatch(loadFortsSuccess(forts));
        }).catch((error) => {
            throw (error);
        })
    }
}


export function saveFort(fort) {
    return function (dispatch, getState) {
         return  fort._id ? ( updateFort(fort).then((fort) => { console.log("in actions",fort)
           dispatch(updateFortSuccess(fort))}) ) : save(fort).then((fort) => { console.log("in actions",fort)
           dispatch(createFortSuccess(fort));}) 
        }.catch((error) => {
            throw (error);
        })
    }




export function deleteFortById(fort) {
    return function (dispatch, getState) { 
        return deleteFort(fort._id).then(() => { console.log("in actions")
            dispatch(deleteFortSuccess(fort));
        }).catch((error) => {
            throw (error);
        })
    }
}