const configureStore = require('./store/configureStore');
import * as actions from './store/bugs';

const store = configureStore;

store.subscribe(() => {
    console.log('State changed', store.getState());
});
store.dispatch(actions.addBug('Bug 1'));
store.dispatch(actions.addBug('Bug 3'));
store.dispatch(actions.addBug('Bug 4'));
