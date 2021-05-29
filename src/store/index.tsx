import { configureStore } from '@reduxjs/toolkit';

import postReducer from './post';
import authReducer from './auth';
import loadingReducer from './loading';
import toastReducer from './toast';

const store = configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer,
        loading: loadingReducer,
        toast: toastReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;