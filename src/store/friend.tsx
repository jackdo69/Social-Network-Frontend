import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendSliceState, FriendSuggestion } from '../interfaces';

const initialFriendState: FriendSliceState = { friendSuggestions: [] };

const friendSlice = createSlice({
  name: 'friend',
  initialState: initialFriendState,
  reducers: {
    setFriendSuggestions(state, action: PayloadAction<{ list: Array<FriendSuggestion> }>) {
      state.friendSuggestions = action.payload.list;
    },
  },
});

export const friendActions = friendSlice.actions;

export default friendSlice.reducer;
