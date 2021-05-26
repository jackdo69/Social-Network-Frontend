import { configureStore } from '@reduxjs/toolkit';

import postReducer from './post';
import authReducer from './auth';

const store = configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;