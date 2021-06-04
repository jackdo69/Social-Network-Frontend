import { configureStore } from '@reduxjs/toolkit';

import postReducer from './post';
import authReducer from './auth';
import loadingReducer from './loading';
import toastReducer from './toast';
import userReducer from './user';

const store = configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer,
        loading: loadingReducer,
        toast: toastReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;