import * as actions from './actionTypes';

export const addBug = (description) => ({
    type: actions.BUG_ADDED,
    payload: description
});

export const removeBug = (id) => ({
    type: actions.BUG_REMOVED,
    payload: id
});

export const resolveBug = (id) => ({
    type: actions.BUG_RESOLVED,
    payload: id
});
