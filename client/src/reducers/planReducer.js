import {
    GET_PLAN,
    LOADING_PLAN,
    STOP_LOADING_PLAN,
    SAVE_PLAN, DELETE_PLAN,
} from '../actions/types';

const initialState = {
    plan: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_PLAN:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING_PLAN:
            return {
                ...state,
                loading: false,
            };
        case SAVE_PLAN:
            return {
                ...state,
                plan: action.payload,
                loading: false,
            };
        case GET_PLAN:
            return {
                ...state,
                plan: action.payload,
                loading: false,
            };
        case DELETE_PLAN:
            return {
                ...state,
                plan: {},
                loading: false,
            };
        default:
            return state;
    }
}

