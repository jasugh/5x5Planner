import {
    GET_EXERCISE,
    GET_ALL_EXERCISE,
    LOADING_EXERCISE,
    STOP_LOADING_EXERCISE,
    SAVE_EXERCISE, DELETE_EXERCISE,
} from '../actions/types';

const initialState = {
    exercises: [],
    exercise: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_EXERCISE:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING_EXERCISE:
            return {
                ...state,
                loading: false,
            };
        case SAVE_EXERCISE:
            return {
                ...state,
                exercises: action.payload,
                // loading: false,
            };
        case GET_EXERCISE:
            return {
                ...state,
                exercise: action.payload,
                loading: false,
            };
        case GET_ALL_EXERCISE:
            return {
                ...state,
                exercises: action.payload,
                loading: false,
            };
        case DELETE_EXERCISE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

