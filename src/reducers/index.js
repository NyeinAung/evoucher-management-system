import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { evoucher } from './evoucher.reducer';

const rootReducer = combineReducers({
    authentication,
    evoucher
});

export default rootReducer;