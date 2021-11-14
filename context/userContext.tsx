import { createContext, useContext, ReactNode } from 'react';
import useUser from '../hooks/useUser';

const userContext = createContext({
    user: null,
    loading: true,
    signIn: (email: string, password: string) => { },
    signUp: (email: string, password: string) => { },
    signOut: () => { },
});

interface IProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: IProps) => {
    const auth = useUser();

    return (
        <userContext.Provider value={auth}>
            {children}
        </userContext.Provider>
    );
};

export const useFirebaseUser = () => useContext(userContext);