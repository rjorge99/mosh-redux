// import { addBug, resolveBug } from './store/bugs';
import configureStore from './store/configureStore';
import { projectAdded } from './store/projects';

const store = configureStore();

store.subscribe(() => {
    console.log('State changed', store.getState());
});
//projects
store.dispatch(projectAdded({ name: 'New project' }));

//Bugs
// store.dispatch(addBug({ description: 'Bug1' }));
// store.dispatch(addBug({ description: 'Bug2' }));
// store.dispatch(addBug({ description: 'Bug3' }));
// store.dispatch(resolveBug({ id: 1 }));
