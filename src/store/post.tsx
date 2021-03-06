import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostSliceState, IPost } from '../interfaces';

const initialPostState: PostSliceState = { posts: [] };

const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    loadPosts(state, action: PayloadAction<{ posts: Array<IPost> }>) {
      state.posts = action.payload.posts;
    },
    addPost(state, action: PayloadAction<{ post: IPost }>) {
      state.posts.push(action.payload.post);
    },
    removePost(state, action: PayloadAction<{ id: string }>) {
      if (state.posts.length) state.posts = state.posts.filter((i) => i.id !== action.payload.id);
    },
    updatePost(state, action: PayloadAction<{ id: string; content: string; title: string }>) {
      const clonePosts = [...state.posts];
      const updatedPost = clonePosts.find((p) => p.id === action.payload.id);

      if (updatedPost) {
        updatedPost.content = action.payload.content;
        updatedPost.title = action.payload.title;
      }
      state.posts = clonePosts;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
