import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../interfaces';
import { PostSliceState } from '../interfaces';


const initialPostState: PostSliceState = { posts: [] };

const postSlice = createSlice({
    name: 'post',
    initialState: initialPostState,
    reducers: {
        loadPosts(state, action: PayloadAction<{ posts: Array<Post>; }>) {
            state.posts = action.payload.posts;
        },
        addPost(state, action: PayloadAction<{ post: Post; }>) {
            state.posts.push(action.payload.post);
        },
        removePost(state, action) {
            if (state.posts.length) state.posts = state.posts.filter(i => i.id !== action.payload.id);
        }
    }
});

export const postActions = postSlice.actions;

export default postSlice.reducer;