import configureStore from './store/configureStore';
import * as actions from './store/bugs';

const store = configureStore();

store.subscribe(() => {
    console.log('State changed', store.getState());
});
store.dispatch(actions.addBug({ description: 'Bug1' }));
store.dispatch(actions.addBug({ description: 'Bug2' }));
store.dispatch(actions.addBug({ description: 'Bug3' }));
store.dispatch(actions.resolveBug({ id: 1 }));
