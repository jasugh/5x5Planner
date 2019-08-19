import {
    SAVE_SETTINGS,
    GET_SETTINGS,
    LOADING_SETTINGS,
    STOP_LOADING_SETTINGS,
} from '../actions/types';

const initialState = {
    settings: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_SETTINGS:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING_SETTINGS:
            return {
                ...state,
                loading: false,
            };
        case SAVE_SETTINGS:
            return {
                ...state,
                settings: action.payload,
                loading: false,
            };
        case GET_SETTINGS:
            return {
                ...state,
                settings: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

