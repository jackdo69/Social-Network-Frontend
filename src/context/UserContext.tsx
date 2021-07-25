/* eslint-disable react/prop-types */
import React, { Dispatch, SetStateAction } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IUserState {
  isAuthenticated: boolean;
}

type Action = {
  type: string;
};

const UserStateContext = React.createContext<IUserState | null>(null);
const UserDispatchContext = React.createContext<React.Dispatch<Action> | null>(null);

function userReducer(state: IUserState, action: Action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem('id_token'),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(
  dispatch: React.Dispatch<Action>,
  login: string,
  password: string,
  history: RouteComponentProps['history'],
  setIsLoading: (props: boolean) => void,
  setError: Dispatch<SetStateAction<boolean>>,
) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    setTimeout(() => {
      localStorage.setItem('id_token', '1');
      setError(false);
      setIsLoading(false);
      dispatch({ type: 'LOGIN_SUCCESS' });

      history.push('/app/home');
    }, 2000);
  } else {
    dispatch({ type: 'LOGIN_FAILURE' });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch: React.Dispatch<Action>, history: RouteComponentProps['history']) {
  localStorage.removeItem('id_token');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  history.push('/login');
}
