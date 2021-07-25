import React from 'react';

interface ILayoutState {
  isSidebarOpened: boolean;
}

type Action = {
  type: string;
};

const LayoutStateContext = React.createContext<ILayoutState | null>(null);
const LayoutDispatchContext = React.createContext<React.Dispatch<Action> | null>(null);

function layoutReducer(state: ILayoutState, action: Action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: false,
  });
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>{children}</LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error('useLayoutState must be used within a LayoutProvider');
  }
  return context;
}

function useLayoutDispatch() {
  const context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider');
  }
  return context;
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };

// ###########################################################
function toggleSidebar(dispatch: React.Dispatch<Action>) {
  dispatch({
    type: 'TOGGLE_SIDEBAR',
  });
}
