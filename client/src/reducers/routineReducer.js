import {
    GET_ROUTINE,
    CREATE_ROUTINE,
    UPDATE_ROUTINE,
    LOADING_ROUTINE,
    STOP_LOADING_ROUTINE,
    GET_ROUTINE_ERRORS,
    CLEAR_ROUTINE_ERRORS,
} from '../actions/types';

const initialState = {
    routine: [],
    routine_loading: false,
    routine_errors: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_ROUTINE:
            return {
                ...state,
                routine_loading: true,
            };
        case STOP_LOADING_ROUTINE:
            return {
                ...state,
                routine_loading: false,
            };
        case GET_ROUTINE:
            return {
                ...state,
                routine: action.payload,
                routine_loading: false,
            };
        case CREATE_ROUTINE:
            return {
                ...state,
                routine: action.payload,
                routine_loading: false,
            };
        case UPDATE_ROUTINE:
            return {
                ...state,
                routine: action.payload,
                routine_loading: false,
            };
        case GET_ROUTINE_ERRORS:
            return {
                ...state,
                routine_errors: action.payload,
                routine_loading: false,
            };
        case CLEAR_ROUTINE_ERRORS:
            return {
                ...state,
                routine_errors: {},
                routine_loading: false,
            };
        default:
            return state;
    }
}

