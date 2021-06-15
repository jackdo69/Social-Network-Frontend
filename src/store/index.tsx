import { configureStore } from '@reduxjs/toolkit';

import postReducer from './post';
import authReducer from './auth';
import loadingReducer from './loading';
import toastReducer from './toast';
import userReducer from './user';
import friendReducer from './friend';

const store = configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer,
        loading: loadingReducer,
        toast: toastReducer,
        user: userReducer,
        friend: friendReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;