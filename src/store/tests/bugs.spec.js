import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { apiCallBegan } from '../api';
import { addBug, bugAdded } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
    let fakeAxios, store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugSlice = () => store.getState().entities.bugs;
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
});
