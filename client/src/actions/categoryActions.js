import axios from 'axios';

import {
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_CATEGORY,
    GET_ALL_CATEGORY,
    SAVE_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    LOADING_CATEGORY,
    STOP_LOADING_CATEGORY
} from "./types";

//SAve category
export const saveCategory = (categoryData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingCategory());

    axios.post('/api/category/add', categoryData)
        .then(res => {
            dispatch({
                type: SAVE_CATEGORY,
                payload: res.data
            });
            dispatch(getAllCategory());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingCategory())
        });
};

//Update category
export const updateCategory = (categoryData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingCategory());

    axios.post('/api/category/update', categoryData)
        .then(res => {
            dispatch({
                type: UPDATE_CATEGORY,
                payload: res.data
            });
            dispatch(getAllCategory());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(stopLoadingCategory())
        });
};

//Get all categories
export const getAllCategory = () => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingCategory());

    axios.get('/api/category/all')
        .then(res =>
            dispatch({
                type: GET_ALL_CATEGORY,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingCategory())
        });
};

//Get category
export const getCategory = () => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingCategory());

    axios.get('/api/category',)
        .then(res =>
            dispatch({
                type: GET_CATEGORY,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingCategory())
        });
};

//Delete category
export const deleteCategory = (categoryData) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoadingCategory());

    axios.delete(`/api/category/${categoryData.id}`,)
        .then(res => {
            dispatch({
                type: DELETE_CATEGORY,
                payload: res.data
            });
            dispatch(getAllCategory());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            });
            dispatch(stopLoadingCategory())
        });
};

// Loading category
export const setLoadingCategory = () => {
    return {
        type: LOADING_CATEGORY
    }
};

// Stop loading category
export const stopLoadingCategory = () => {
    return {
        type: STOP_LOADING_CATEGORY
    }
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
