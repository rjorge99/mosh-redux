import configureStore from './store/configureStore';
import { assignBugToUser, loadBugs, resolveBug } from './store/bugs';
import { addBug } from './store/bugs';

const store = configureStore();

store.dispatch(loadBugs());

// setTimeout(() => {
//     store.dispatch(assignBugToUser(1, 4));
// }, 1000);
