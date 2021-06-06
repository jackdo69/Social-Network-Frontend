import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSliceState } from '../interfaces';

const initialUserSliceState: UserSliceState = { image: '', email: '', username: '', id: '', usersByPosts: [] };

const userSlice = createSlice({
    name: 'toast',
    initialState: initialUserSliceState,
    reducers: {
        setUser(state, action: PayloadAction<UserSliceState>) {
            state.image = action.payload.image;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
        },
        setImage(state, action: PayloadAction<UserSliceState>) {
            state.image = action.payload.image;
        },
        setUsersByPosts(state, action: PayloadAction<{ usersByPostsInfo: UserSliceState[]; }>) {
            state.usersByPosts = action.payload.usersByPostsInfo;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;