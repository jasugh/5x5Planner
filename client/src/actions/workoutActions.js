import axios from 'axios';

import {
    UPDATE_WORKOUT,
    GET_WORKOUT,
    GET_CREATE_WORKOUT,
    SELECT_WORKOUT,
    CLEAR_SELECTED_WORKOUT,
    DELETE_WORKOUT,
    LOADING_WORKOUT,
    STOP_LOADING_WORKOUT,
    CLEAR_ERRORS,
    GET_ERRORS,
} from "./types";

//Get/create workout for a date
export const getCreateWorkout = (workoutData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingWorkout());

    axios.post('/api/workout', workoutData)
        .then(res => {
            dispatch({
                type: GET_CREATE_WORKOUT,
                payload: res.data
            });
            dispatch(getWorkout(workoutData));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingWorkout())
        });
};

//Get workout by date
export const getWorkout = (workoutData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingWorkout());

    let workoutDate = workoutData.workout_date;

    axios.get(`/api/workout/date/${workoutDate}`)
        .then(res => {
            dispatch({
                type: GET_WORKOUT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingWorkout())
        });
};

//Select workout
export const selectWorkout = (workoutData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingWorkout());

    axios.get('/api/workout/select/', {
        params: {
            workout_date: workoutData.workout_date,
            exercise: workoutData.exercise
        }
    })
        .then(res => {
            dispatch({
                type: SELECT_WORKOUT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingWorkout())
        });
};

//Select workout
export const clearSelectedWorkout = () => dispatch => {
    dispatch({
        type: CLEAR_SELECTED_WORKOUT,
    })
};

//Delete workout
export const deleteWorkout = (workoutData, history) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingWorkout());

    axios.delete('/api/workout', workoutData)
        .then(res => {
            history.push('/dashboard');
            dispatch({
                type: DELETE_WORKOUT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingWorkout())
        });
};

//Update workout
export const updateWorkout = (workoutData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingWorkout());

    axios.post('/api/workout/update', workoutData)
        .then(res => {
            dispatch({
                type: UPDATE_WORKOUT,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingWorkout())
        });
};

// Loading workout
export const setLoadingWorkout = () => {
    return {
        type: LOADING_WORKOUT
    }
};

// Stop loading workout
export const stopLoadingWorkout = () => {
    return {
        type: STOP_LOADING_WORKOUT
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
