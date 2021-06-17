import { Method } from 'axios';
import React from 'react';

interface Post {
    id: string,
    content: string,
    createdAt: string,
    image: string,
    user: {
        id: string,
        username: string;
    },
    title: string;
}

interface UploadImagePropsFunction {
    setImage: (value: string | ((prevImg: string) => string)) => void;
}

interface ContainerProps {
    children: JSX.Element[] | JSX.Element;
}

interface LayoutProps {
    leftSideBar?: React.ReactNode,
    main: React.ReactNode,
    rightSideBar?: React.ReactNode;
}

interface HttPContent {
    url?: string,
    method?: Method,
    params?: any,
    data?: object,
    headers?: object,
    onUploadProgress?: (progressEvent: any) => void,
    toastMessage?: string;
}

interface UploadProgress {
    (event: ProgressEvent): void;
}

interface AuthRequestData {
    username: string,
    password: string,
    email?: string;
}

interface PostSliceState {
    posts: Post[],
    usersByPosts?: Array<T>;
}

interface AuthSliceState {
    accessToken: string,
    refreshToken: string;
}

interface LoadingSliceState {
    show: boolean;
}

interface ToastSliceState {
    severity: 'error' | 'warning' | 'success' | 'info',
    message: string,
    show?: boolean;
}

interface UserSliceState {
    id?: string,
    image?: string,
    username?: string,
    email?: string,
    friends?: Array<T>,
    notifications?: Array<T>,
    requestSent?: Array<T>;
}

interface FriendSliceState {
    friendSuggestions: Array<T>;
}

interface FormParams {
    action: 'addPost' | 'updatePost' | 'updatePicture',
    payload?: {
        id: string,
        content: string,
        image: string,
        title: string;
    };
}

interface FriendSuggestion {
    id: string,
    username: string,
    image: string;
}

export {
    Post,
    UploadImagePropsFunction,
    ContainerProps,
    LayoutProps,
    HttPContent,
    UploadProgress,
    AuthRequestData,
    PostSliceState,
    AuthSliceState,
    UserSliceState,
    LoadingSliceState,
    ToastSliceState,
    FriendSliceState,
    FormParams,
    FriendSuggestion
};