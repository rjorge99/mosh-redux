import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVED } from './actionTypes';
let id = 0;
export const reducer = (state = [], action) => {
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
