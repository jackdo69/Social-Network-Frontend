import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatSliceState } from '../interfaces';

const initialChatSliceState: ChatSliceState = { show: false, receiverId: '', receiverUsername: '' };

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatSliceState,
  reducers: {
    openChat(state, action: PayloadAction<{ receiverId: string; receiverUsername: string }>) {
      state.receiverId = action.payload.receiverId;
      state.receiverUsername = action.payload.receiverUsername;
      state.show = true;
    },
    closeChat(state) {
      state.show = false;
      state.receiverId = '';
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
