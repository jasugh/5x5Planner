import {combineReducers} from 'redux';

import authReducer from './authReducer';
import planReducer from './planReducer';
import routineDayReducer from "./routineDayReducer";
import routineReducer from './routineReducer';
import workoutReducer from './workoutReducer';
import restTimerReducer from './restTimerReducer';
import settingsReducer from "./settingsReducer";
import categoryReducer from './categoryReducer';
import exerciseReducer from "./exerciseReducer";
import errorReducer from './errorReducer'

export default combineReducers({
    auth: authReducer,
    plan: planReducer,
    routineDay: routineDayReducer,
    routine: routineReducer,
    workout: workoutReducer,
    restTimer: restTimerReducer,
    settings: settingsReducer,
    category: categoryReducer,
    exercise: exerciseReducer,
    errors: errorReducer
});
