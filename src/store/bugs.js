// Action Types
const BUG_ADDED = 'bugAdded';
const BUG_REMOVED = 'bugRemvoed';
const BUG_RESOLVED = 'bugResolved';

// Action Creators
export const addBug = (description) => ({
    type: BUG_ADDED,
    payload: description
});

export const removeBug = (id) => ({
    type: BUG_REMOVED,
    payload: id
});

export const resolveBug = (id) => ({
    type: BUG_RESOLVED,
    payload: id
});

//Reducer
let id = 0;
const reducer = (state = [], action) => {
    switch (action.type) {
        case BUG_ADDED:
            return [
                ...state,
                {
                    id: ++id,
                    description: action.payload,
                    resolved: false
                }
            ];
            break;
        case BUG_REMOVED:
            return state.filter((bug) => bug.id !== action.payload);
        case BUG_RESOLVED:
            return state.map((bug) =>
                bug.id !== action.payload ? bug : { ...bug, resolved: true }
            );
        default:
            return state;
    }
};

export default reducer;
