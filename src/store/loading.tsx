import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingSliceState } from '../interfaces';

const initialLoadingState: LoadingSliceState = { show: false };

const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialLoadingState,
    reducers: {
        setLoading(state, action: PayloadAction<{ status: boolean; }>) {
            state.show = action.payload.status;
        }
    }
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;