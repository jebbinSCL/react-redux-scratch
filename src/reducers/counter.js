import { INCREASE_COUNTER, DECREASE_COUNTER } from '../actions/types';

const initialState = {
    count: 0,
};

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE_COUNTER: 
            return { count: state.count + 1};
        case DECREASE_COUNTER: 
            return { count: state.count - 1};
        default: 
            return state;
    }
};