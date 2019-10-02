import {
    LOADING_WORKOUT,
    STOP_LOADING_WORKOUT,
    CREATE_WORKOUT,
    UPDATE_WORKOUT,
    GET_WORKOUT,
    SELECT_WORKOUT,
    CLEAR_SELECTED_WORKOUT,
    DELETE_WORKOUT,
} from '../actions/types';

const initialState = {
    workout: [],
    selected_workout: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_WORKOUT:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING_WORKOUT:
            return {
                ...state,
                loading: false,
            };
        case CREATE_WORKOUT:
            return {
                ...state,
                workout: action.payload,
                // loading: false,                      loading -> false when get_workout is finished
            };
        case UPDATE_WORKOUT:
            return {
                ...state,
                workout: action.payload,
                // loading: false,                       loading -> false when get_workout is finished
            };
        case GET_WORKOUT:
            return {
                ...state,
                workout: action.payload,
                loading: false,
            };
        case SELECT_WORKOUT:
            return {
                ...state,
                selected_workout: action.payload,
                loading: false,
            };
        case CLEAR_SELECTED_WORKOUT:
            return {
                selected_workout: {},
            };
        case DELETE_WORKOUT:
            return {
                ...state,
                workout: {},
                loading: false,
            };
        default:
            return state;
    }
}
