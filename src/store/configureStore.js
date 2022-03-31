import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middlewares/logger';
// import func from './middlewares/func';
import tostify from './middlewares/tostify';

export default function () {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware(),
            logger('console'),
            tostify
        ]
    });
}
