import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSliceState } from '../interfaces';

const initialUserSliceState: UserSliceState = {
    image: '',
    email: '',
    username: '',
    id: '',
    friends: [],
    notifications: [],
    requestSent: []
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserSliceState,
    reducers: {
        setUser(state, action: PayloadAction<UserSliceState>) {
            state.image = action.payload.image;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            if (action.payload.friends) state.friends = action.payload.friends;
            if (action.payload.notifications) state.notifications = action.payload.notifications;
            if (action.payload.requestSent) state.requestSent = action.payload.requestSent;
        },
        setImage(state, action: PayloadAction<UserSliceState>) {
            state.image = action.payload.image;
        },

    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;