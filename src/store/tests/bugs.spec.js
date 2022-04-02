import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { apiCallBegan } from '../api';
import { addBug, bugAdded, getUnresolvedBugs, loadBugs, resolveBug } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
    let fakeAxios, store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugSlice = () => store.getState().entities.bugs;
    const createState = () => ({
        entities: { bugs: { list: [] } }
    });
    // Solitary test
    // describe('actions creators', () => {
    //     it('addBug', () => {
    //         const bug = { description: 'a' };
    //         const result = addBug(bug);
    //         const expected = {
    //             type: apiCallBegan.type,
    //             payload: {
    //                 url: '/bugs',
    //                 method: 'POST',
    //                 data: bug,
    //                 onSuccess: bugAdded.type
    //             }
    //         };
    //         expect(result).toEqual(expected);
    //     });
    // });

    // using real api, integration test
    // it('should handle the addBug action', async () => {
    //     const store = configureStore();
    //     const bug = { description: 'a' };
    //     await store.dispatch(addBug(bug));
    //     expect(store.getState().entities.bugs.list).toHaveLength(1);
    //     console.log(store.getState());
    // });

    // using mock api, unit test
    it('should add the bug to the store if its saved to the server', async () => {
        // Arrange
        const bug = { description: 'a' };
        const savedBug = { ...bug, id: 1 };
        fakeAxios.onPost('/bugs').reply(200, savedBug);

        // Act
        await store.dispatch(addBug(bug));

        // Assert
        expect(bugSlice().list).toContainEqual(savedBug);
    });

    it('should not add the bug to the store if its not saved to the server', async () => {
        // Arrange
        const bug = { description: 'a' };
        fakeAxios.onPost('/bugs').reply(500);

        // Act
        await store.dispatch(addBug(bug));

        // Assert
        expect(bugSlice().list).toHaveLength(0);
    });

    it('should be changed to status resolved if its save to the server', async () => {
        fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugSlice().list[0].resolved).toBe(true);
    });

    it('should not changed to status to resolved if its not saved to the server', async () => {
        fakeAxios.onPatch('/bugs/1').reply(500);
        fakeAxios.onPost('/bugs').reply(200, { id: 1 });

        await store.dispatch(addBug({}));
        await store.dispatch(resolveBug(1));

        expect(bugSlice().list[0].resolved).not.toBe(true);
    });

    describe('loading bugs', () => {
        describe('if the bugs exist in the cache', () => {
            it('they should not be fetched from the server again', async () => {
                fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

                await store.dispatch(loadBugs());
                await store.dispatch(loadBugs());

                expect(fakeAxios.history.get.length).toBe(1);
            });
        });
        describe('if the bugs does not exist in the cache', () => {
            it('they should be fetch from the server and put in the store', async () => {
                fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

                await store.dispatch(loadBugs());

                expect(bugSlice().list).toHaveLength(1);
            });

            describe('loading indicator', () => {
                it('should be true while fetching the bugs', () => {
                    fakeAxios.onGet('/bugs').reply(() => {
                        expect(bugSlice().loading).toBe(true);
                        return [200, [{ id: 1 }]];
                    });

                    store.dispatch(loadBugs());
                });

                it('should be false after thae bugs are fetched', async () => {
                    fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

                    await store.dispatch(loadBugs());

                    expect(bugSlice().loading).toBe(false);
                });

                it('should be false if the server return an error', async () => {
                    fakeAxios.onGet('/bugs').reply(500);

                    await store.dispatch(loadBugs());

                    expect(bugSlice().loading).toBe(false);
                });
            });
        });
    });

    describe('selectors', () => {
        it('getUnresolvedBugs', () => {
            const state = createState();
            state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];

            const result = getUnresolvedBugs(state);

            expect(result).toHaveLength(2);
        });
    });
});
