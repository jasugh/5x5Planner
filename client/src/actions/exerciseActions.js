import axios from 'axios';

import {
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_EXERCISE,
    GET_ALL_EXERCISE,
    SAVE_EXERCISE,
    UPDATE_EXERCISE,
    DELETE_EXERCISE,
    LOADING_EXERCISE,
    STOP_LOADING_EXERCISE,
} from "./types";

//Save exercise
export const saveExercise = (exerciseData, history) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingExercise());

    axios.post('/api/exercise/add', exerciseData)
        .then(res => {
            dispatch({
                type: SAVE_EXERCISE,
                payload: res.data
            });
            dispatch(getAllExercise());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingExercise())
        });
};

//Update exercise
export const updateExercise = (exerciseData, history) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingExercise());

    axios.post('/api/exercise/update', exerciseData)
        .then(res => {
            dispatch({
                type: UPDATE_EXERCISE,
                payload: res.data
            });
            dispatch(getAllExercise());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingExercise())
        });
};

//Get all exercises
export const getAllExercise = () => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingExercise());

    axios.get('/api/exercise/all')
        .then(res =>
            dispatch({
                type: GET_ALL_EXERCISE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingExercise())
        });
};


//Get exercise
export const getExercise = (exercise) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingExercise());

    axios.get(`/api/exercise/one/${exercise}`)
        .then(res =>
            dispatch({
                type: GET_EXERCISE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingExercise())
        });
};

//Delete exercise
export const deleteExercise = (exerciseData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingExercise());

    axios.delete(`/api/exercise/${exerciseData.id}`)
        .then(res => {
            dispatch({
                type: DELETE_EXERCISE,
                payload: res.data
            });
            dispatch(getAllExercise());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingExercise())
        });
};

// Loading exercise
export const setLoadingExercise = () => {
    return {
        type: LOADING_EXERCISE
    }
};

// Stop loading exercise
export const stopLoadingExercise = () => {
    return {
        type: STOP_LOADING_EXERCISE
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
