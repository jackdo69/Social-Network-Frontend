import { Method } from 'axios';
import React from 'react';

interface IPost {
  id: string;
  content: string;
  createdAt: string;
  image: string;
  user: {
    id: string;
    username: string;
  };
  title: string;
}

interface UploadImagePropsFunction {
  setImage: (value: string | ((prevImg: string) => string)) => void;
}

interface ContainerProps {
  children: JSX.Element[] | JSX.Element;
}

interface LayoutProps {
  leftSideBar?: React.ReactNode;
  main: React.ReactNode;
  rightSideBar?: React.ReactNode;
}

interface HttPContent {
  url?: string;
  method?: Method;
  params?: unknown;
  data?: unknown;
  headers?: unknown;
  onUploadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void;
  toastMessage?: string;
}

interface UploadProgress {
  (event: ProgressEvent): void;
}

interface AuthRequestData {
  username: string;
  password: string;
  email?: string;
}

interface PostSliceState {
  posts: Post[];
}

interface AuthSliceState {
  accessToken: string;
  refreshToken: string;
}

interface LoadingSliceState {
  show: boolean;
}

interface ToastSliceState {
  severity: 'error' | 'warning' | 'success' | 'info';
  message: string;
  show?: boolean;
}

interface ChatSliceState {
  show: boolean;
  receiverId: string;
  receiverUsername: string;
}
interface UserSliceState {
  id: string;
  image: string;
  username: string;
  email: string;
  friends?: Array<T>;
  notifications?: Array<T>;
  requestSent?: Array<T>;
}

interface FriendSliceState {
  friendSuggestions: Array<T>;
}

interface FormParams {
  action: 'addPost' | 'updatePost' | 'updatePicture';
  payload?: {
    id: string;
    content: string;
    image: string;
    title: string;
  };
}

interface FriendSuggestion {
  id: string;
  username: string;
  image: string;
  bio: string;
}

interface Message {
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: number;
}

export {
  IPost,
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
  FriendSuggestion,
  ChatSliceState,
  Message,
};
