import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceState } from '../interfaces';


const initialAuthState: AuthSliceState = { accessToken: '', refreshToken: '' };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action: PayloadAction<{ accessToken: string, refreshToken: string; }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state, action: PayloadAction<{}>) {
            state.accessToken = '';
            state.refreshToken = '';
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;