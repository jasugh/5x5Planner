import {
    START_REST_TIMER,
    STOP_REST_TIMER,
} from '../actions/types';

const initialState = {
    restTime: 0,
    start_rest_timer: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case START_REST_TIMER:
            return {
                restTime: action.payload,
                start_rest_timer: true,
            };
        case STOP_REST_TIMER:
            return {
                start_rest_timer: false,
            };
        default:
            return state;
    }
}
