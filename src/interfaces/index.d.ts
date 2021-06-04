import { Method } from 'axios';
import React from 'react';

interface Post {
    id: string,
    content: string,
    createdAt: string,
    image: string,
    user: string,
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
    posts: Post[];
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
    image: string,
    username: string,
    email: string;
}

interface FormParams {
    action: 'add' | 'edit',
    payload?: {
        id: string,
        content: string,
        image: string,
        title: string;
    };
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
    FormParams
};