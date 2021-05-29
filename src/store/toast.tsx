import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastSliceState } from '../interfaces';

const initialToastSliceState: ToastSliceState = { severity: 'success', message: '', show: false };

const toastSlice = createSlice({
    name: 'toast',
    initialState: initialToastSliceState,
    reducers: {
        setToast(state, action: PayloadAction<ToastSliceState>) {
            state.severity = action.payload.severity;
            state.message = action.payload.message;
            state.show = true
        },
        closeToast(state, action: PayloadAction<{}>) {
            state.show = false;
            state.message = ''
        }
    }
});

export const toastActions = toastSlice.actions;

export default toastSlice.reducer;