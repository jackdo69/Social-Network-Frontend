import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliceState {
    isLoggedIn: boolean,
    token: string;
}

const initialAuthState: SliceState = { isLoggedIn: false, token: '' };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; }>) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout(state, action: PayloadAction<{}>) {
            state.isLoggedIn = false;
            state.token = '';
        }
    }
});

export const postActions = authSlice.actions;

export default authSlice.reducer;