import axios from 'axios';

import {
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_PLAN,
    SAVE_PLAN,
    DELETE_PLAN,
    LOADING_PLAN,
    STOP_LOADING_PLAN
} from "./types";

//Save plan
export const savePlan = (planData, history) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingPlan());

    axios.post('/api/plan', planData)
        .then(res => {
            // history.push('/dashboard');
            dispatch({
                type: SAVE_PLAN,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingPlan())
        });
};

//Get plan
export const getPlan = () => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingPlan());

    axios.get('/api/plan')
        .then(res =>
            dispatch({
                type: GET_PLAN,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingPlan())
        });
};

//Delete plan
export const deletePlan = (history) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingPlan());

    axios.delete('/api/plan')
        .then(res => {
            history.push('/dashboard');
            dispatch({
                type: DELETE_PLAN,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingPlan())
        });
};

// Loading plan
export const setLoadingPlan = () => {
    return {
        type: LOADING_PLAN
    }
};

// Stop loading plan
export const stopLoadingPlan = () => {
    return {
        type: STOP_LOADING_PLAN
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
