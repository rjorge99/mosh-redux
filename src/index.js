import { addBug, resolveBug, getUnresolvedBugs, bugAssigned, getBugsByUserId } from './store/bugs';
import configureStore from './store/configureStore';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();

// store.dispatch((dispatch, getState) => {
//     dispatch({ type: 'bugsReceived', payload: { bugs: [1, 3, 4] } });
//     console.log(getState());
// });

store.dispatch({
    type: 'error',
    payload: { message: 'An error ocurred' }
});
// store.subscribe(() => {
//     console.log('State changed', store.getState());
// });

// //projects
// store.dispatch(projectAdded({ name: 'New project' }));

// //Bugs
// store.dispatch(addBug({ description: 'Bug1' }));
// store.dispatch(addBug({ description: 'Bug2' }));
// store.dispatch(resolveBug({ id: 1 }));

// //user(
// store.dispatch(userAdded({ name: 'User 2' }));
// store.dispatch(bugAssigned({ bugId: 1, userId: 1 }));

// const bugs = getBugsByUserId(1)(store.getState());
// console.log('bugsById', bugs);
