import * as types from './actionTypes'
import cutomerInfoApi from '../api/mockCutomerInfoApi'


export function createtCustomerInfoSuccess(customerInfo) {
    return { type: types.CREATE_CUSTOMERINFO_SUCCESS, customerInfo};
}

export function checkAuthenticationCustomerInfoSuccess(message) {
    return { type: types.CHECK_CUSTOMERINFO_SUCCESS, message};
}



export function saveCustomerInfo(customerInfo) {
    return function (dispatch,getState) {
        return cutomerInfoApi.saveCustomerInfo(customerInfo).then((customerInfo) => {
            dispatch(createtCustomerInfoSuccess(customerInfo));
        }).catch((error) => {
            throw (error);
        })
    }
}

export function checkAuthentication(customerInfo,message) {
    return function (dispatch,getState) {
        return cutomerInfoApi.checkAuthentication(customerInfo,message).then((message) => {
            dispatch(checkAuthenticationCustomerInfoSuccess(message));
        }).catch((error) => {
            throw (error);
        })
        // return cutomerInfoApi.saveCustomerInfo(customerInfo,getState,message).then((customerInfo) => {
        // debugger;
    //    let info =  getState().customerInformations.filter( info =>info.email == customerInfo.email );
    //    if(info==0){
    //       let message = "not registered";
    //       dispatch(checkAuthenticationCustomerInfoSuccess(customerInfo));
    //    }
        // debugger;
        //     dispatch(checkAuthenticationCustomerInfoSuccess(customerInfo));
    }
}