import { reducer } from './reducer';

function customStore(reducer) {
    let state;
    let listeners = [];

    function dispatch(action) {
        state = reducer(state, action);

        for (const listener of listeners) listener();
    }

    function subscribe(listener) {
        listeners.push(listener);
    }

    function getState() {
        return state;
    }

    return {
        getState,
        dispatch,
        subscribe
    };
}

export default customStore(reducer);
