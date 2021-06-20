import { createContext, useState } from 'react';
import useAuth from '../hooks/auth-hook';

type AuthCtx = {
    loggedIn: boolean,
    setLoggedIn: (status: boolean) => void;
};

type Props = {
    children?: JSX.Element | JSX.Element[];
};

export const AuthContext = createContext<AuthCtx>({ loggedIn: false, setLoggedIn: (status) => console.log(status) });

export const AuthProvider = (props: Props) => {
    let { isLoggedIn } = useAuth();
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    return (

        <AuthContext.Provider value={{ loggedIn, setLoggedIn }} >
            { props.children}
        </AuthContext.Provider >
    );
};