import axios from 'axios';

import {
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_SETTINGS,
    SAVE_SETTINGS,
    LOADING_SETTINGS,
    STOP_LOADING_SETTINGS,
} from "./types";

//Save settings
export const saveSettings = (settingsData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingSettings());

    axios.post('/api/settings', settingsData)
        .then(res => {
            dispatch({
                type: SAVE_SETTINGS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingSettings())
        });
};

//Get settings
export const getSettings = () => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingSettings());

    axios.get('/api/settings')
        .then(res =>
            dispatch({
                type: GET_SETTINGS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingSettings())
        });
};

// Loading settings
export const setLoadingSettings = () => {
    return {
        type: LOADING_SETTINGS
    }
};

// Stop loading settings
export const stopLoadingSettings = () => {
    return {
        type: STOP_LOADING_SETTINGS
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
