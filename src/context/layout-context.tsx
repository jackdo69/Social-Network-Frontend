import React, { Dispatch } from 'react';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

type State = {
  isSidebarOpened: boolean;
};

type Action = {
  type: string;
};

const LayoutStateContext = React.createContext<State | null>(null);
const LayoutDispatchContext = React.createContext<Dispatch<Action> | null>(null);

function layoutReducer(state: State, action: Action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const LayoutProvider = (props: Props) => {
  const [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: true,
  });

  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>{props.children}</LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
};

const useLayoutState = () => {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error('useLayoutState must be used within a LayoutProvider');
  }
  return context;
};

function useLayoutDispatch() {
  const context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider');
  }
  return context;
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };

// ###########################################################
function toggleSidebar(dispatch: Dispatch<Action>) {
  dispatch({
    type: 'TOGGLE_SIDEBAR',
  });
}
