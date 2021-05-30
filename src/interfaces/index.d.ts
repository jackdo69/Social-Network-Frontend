import { Method } from 'axios';

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

interface LayoutProps {
    children: JSX.Element[] | JSX.Element;
}

interface HttPContent {
    url?: string,
    method?: Method,
    params?: any,
    data?: object,
    headers?: object,
    onUploadProgress?: (progressEvent: any) => void,
    toastMessage?: string
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
    LayoutProps,
    HttPContent,
    UploadProgress,
    AuthRequestData,
    PostSliceState,
    AuthSliceState,
    LoadingSliceState,
    ToastSliceState,
    FormParams
};