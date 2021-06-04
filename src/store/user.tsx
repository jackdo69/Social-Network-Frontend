import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSliceState } from '../interfaces';

const initialUserSliceState: UserSliceState = { image: '', email: '', username: '' };

const userSlice = createSlice({
    name: 'toast',
    initialState: initialUserSliceState,
    reducers: {
        setUser(state, action: PayloadAction<UserSliceState>) {
            state.image = action.payload.image;
            state.username = action.payload.username;
            state.email = action.payload.email;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;