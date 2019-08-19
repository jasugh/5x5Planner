import axios from 'axios';

import {
    GET_ROUTINE,
    CREATE_ROUTINE,
    UPDATE_ROUTINE,
    LOADING_ROUTINE,
    STOP_LOADING_ROUTINE,
    GET_ROUTINE_ERRORS,
    CLEAR_ROUTINE_ERRORS,
} from "./types";

//Create beginner routine
export const createRoutineBeginner = (history) => dispatch => {
    dispatch(clearRoutineErrors());
    dispatch(setLoadingRoutine());

    axios.post('/api/routine/beginner')
        .then(res => {
            history.push('/dashboard');
            dispatch({
                type: CREATE_ROUTINE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ROUTINE_ERRORS,
                payload: err.response
            });
        });
};

//Create experienced routine
export const createRoutineExperienced = (history) => dispatch => {
    dispatch(clearRoutineErrors());
    dispatch(setLoadingRoutine());

    axios.post('/api/routine/experienced')
        .then(res => {
            // history.push('/dashboard');
            dispatch({
                type: CREATE_ROUTINE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ROUTINE_ERRORS,
                payload: err.response
            });
        });
};

//Create experienced routine
export const createRoutineFixed = (history) => dispatch => {
    dispatch(clearRoutineErrors());
    dispatch(setLoadingRoutine());

    axios.post('/api/routine/fixed')
        .then(res => {
            history.push('/dashboard');
            dispatch({
                type: CREATE_ROUTINE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ROUTINE_ERRORS,
                payload: err.response
            });
        });
};

//Update routine
export const updateRoutine = (updatedRoutine, history) => dispatch => {
    dispatch(clearRoutineErrors());
    dispatch(setLoadingRoutine());

    axios.post('/api/routine/update', updatedRoutine)
        .then(res => {
            // history.push('/dashboard');
            dispatch({
                type: UPDATE_ROUTINE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ROUTINE_ERRORS,
                payload: err.response
            });
        });
};

//Get user's routine
export const getRoutine = () => dispatch => {
    dispatch(clearRoutineErrors());
    dispatch(setLoadingRoutine());

    axios.get('/api/routine/list')
        .then(res =>
            dispatch({
                type: GET_ROUTINE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ROUTINE_ERRORS,
                payload: err.response
            });
        });
};

// Loading routine
export const setLoadingRoutine = () => {
    return {
        type: LOADING_ROUTINE
    }
};

// Stop loading routine
export const stopLoadingRoutine = () => {
    return {
        type: STOP_LOADING_ROUTINE
    }
};

// Clear errors
export const clearRoutineErrors = () => {
    return {
        type: CLEAR_ROUTINE_ERRORS
    };
};
