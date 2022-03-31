import { addBug, resolveBug, getUnresolvedBugs, bugAssigned, getBugsByUserId } from './store/bugs';
import configureStore from './store/configureStore';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const store = configureStore();

store.subscribe(() => {
    console.log('State changed', store.getState());
});
//projects
store.dispatch(projectAdded({ name: 'New project' }));

//Bugs
store.dispatch(addBug({ description: 'Bug1' }));
store.dispatch(addBug({ description: 'Bug2' }));
store.dispatch(addBug({ description: 'Bug3' }));
store.dispatch(resolveBug({ id: 1 }));

//user(
store.dispatch(userAdded({ name: 'User 1' }));
store.dispatch(userAdded({ name: 'User 2' }));

store.dispatch(bugAssigned({ bugId: 1, userId: 1 }));

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log(unresolvedBugs);

const bugs = getBugsByUserId(1)(store.getState());
console.log('bugsById', bugs);
