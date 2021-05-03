import { createSlice } from '@reduxjs/toolkit';

const initialPostState = { posts: [] }

const postSlice = createSlice({
    name: 'post',
    initialState: initialPostState,
    reducers: {
        loadPosts(state, action) {
            state.posts = action.payload.posts
        },
        addPost(state, action) {
            state.posts.push(action.payload.post)
        },
        removePost(state, action) {
            state.posts = state.posts.filter(i => i.id != action.payload.id)
        }
    }
});

export const postActions = postSlice.actions;

export default postSlice.reducer