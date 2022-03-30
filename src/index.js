// const { addBug, resolveBug } = require('./actions');
const { store } = require('./store');

// store.subscribe(() => {
//     console.log('Store changed', store.getState());
// });

// store.dispatch(addBug('Bug1'));
// store.dispatch(resolveBug(1));

// import store from './customStore';
import * as actions from './actions';

store.subscribe(() => {
    console.log('State changed', store.getState());
});
store.dispatch(actions.addBug('Bug 1'));
store.dispatch(actions.addBug('Bug 3'));
store.dispatch(actions.addBug('Bug 4'));
