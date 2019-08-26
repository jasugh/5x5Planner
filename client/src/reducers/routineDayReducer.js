import {GET_ROUTINE_DAY, LOADING_ROUTINE_DAY, SAVE_ROUTINE_DAY, SAVE_ADD_AB, STOP_LOADING_ROUTINE_DAY,} from '../actions/types';

const initialState = {
    routineDay: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_ROUTINE_DAY:
            return {
                ...state,
                loading: true,
            };
        case STOP_LOADING_ROUTINE_DAY:
            return {
                ...state,
                loading: false,
            };
        case SAVE_ROUTINE_DAY:
            return {
                ...state,
                routineDay: action.payload,
                loading: false,
            };
        case GET_ROUTINE_DAY:
            return {
                ...state,
                routineDay: action.payload,
                loading: false,
            };
        case SAVE_ADD_AB:
            return {
                ...state,
                routineDay: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
