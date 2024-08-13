import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { LoadUserAPI, loginUserAPI, LogoutUserAPI, SignUpUserAPI } from '../helpers/api-communicator';

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    loginUser: (email: string, password: string) => Promise<void>;
    signUpUser: (name: string, email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const data = await LoadUserAPI();
            if (data) {
                setUser(data.user);
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, [])

    const loginUser = async (email: string, password: string) => {
        const data = await loginUserAPI(email, password);
        if (data) {
            setUser(data.user);
            setIsLoggedIn(true);
        }
    }

    const signUpUser = async (name: string, email: string, password: string) => {
        const data = await SignUpUserAPI(name, email, password);
        if (data){
            setUser(data.user);
            setIsLoggedIn(true);
        }
    }

    const logoutUser = async () => {
        const data = await LogoutUserAPI();
        if (data){
            setUser(null);
            setIsLoggedIn(false);
        }
    }

    const value = {
        user,
        isLoggedIn,
        loginUser,
        signUpUser,
        logoutUser,
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}
//eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);