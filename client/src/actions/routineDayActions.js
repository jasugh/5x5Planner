import axios from 'axios';

import {
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_ROUTINE_DAY,
    SAVE_ROUTINE_DAY,
    SAVE_ADD_AB,
    SAVE_ADD_DAY,
    LOADING_ROUTINE_DAY,
    STOP_LOADING_ROUTINE_DAY

} from "./types";

//Save routine day
export const saveRoutineDay = (routineDayData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingRoutineDay());

    axios.post('/api/routineday/add', routineDayData)
        .then(res => {
            dispatch({
                type: SAVE_ROUTINE_DAY,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingRoutineDay());
        });
};

//Get routine day
export const getRoutineDay = () => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingRoutineDay());

    axios.get('/api/routineday')
        .then(res =>
            dispatch({
                type: GET_ROUTINE_DAY,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingRoutineDay());
        });
};

//Save additional exercises to Workout A and Workout B
export const saveAdditionalAB = (addAB ) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingRoutineDay());

    axios.post('/api/routineday/addab', addAB)
        .then(res => {
            dispatch({
                type: SAVE_ADD_AB,
                payload: res.data
            });
            dispatch(getRoutineDay());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingRoutineDay());
        });
};


//Save additional exercises for workout days
export const saveAdditionalDay = (addDay ) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingRoutineDay());

    axios.post('/api/routineday/addday', addDay)
        .then(res => {
            dispatch({
                type: SAVE_ADD_DAY,
                payload: res.data
            });
            dispatch(getRoutineDay());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingRoutineDay());
        });
};

// Loading trainer
export const setLoadingRoutineDay = () => {
    return {
        type: LOADING_ROUTINE_DAY
    }
};

// Stop loading trainer
export const stopLoadingRoutineDay = () => {
    return {
        type: STOP_LOADING_ROUTINE_DAY
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
