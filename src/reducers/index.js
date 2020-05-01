import { combineReducers } from 'redux';
import forts from './fortReducer';
import customerInformations from "./customerInfoReducer";


const rootReducer = combineReducers({
    forts,
    customerInformations
});
export default rootReducer;