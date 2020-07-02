import { combineReducers } from '@reduxjs/toolkit'

import { reducer as authReducer}  from './auth.reducer';

const rootReducer = combineReducers({
    auth: authReducer
});

//console.log(counterReducer);
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>