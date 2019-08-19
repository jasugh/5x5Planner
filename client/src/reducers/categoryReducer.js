import {
    GET_CATEGORY,
    GET_ALL_CATEGORY,
    LOADING_CATEGORY,
    STOP_LOADING_CATEGORY,
    SAVE_CATEGORY, DELETE_CATEGORY,
} from '../actions/types';

const initialState = {
    category: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_CATEGORY:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING_CATEGORY:
            return {
                ...state,
                loading: false,
            };
        case SAVE_CATEGORY:
            return {
                ...state,
                category: action.payload,
                // loading: false,
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false,
            };
        case GET_ALL_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false,
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

