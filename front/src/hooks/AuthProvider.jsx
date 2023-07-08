import {createContext, useState} from 'react';


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const logIn = (newToken) => {
        setToken(newToken)
        localStorage.setItem('token', newToken);
        console.log(localStorage.token)
    }

    const logOut = () => {
        setToken(null);
        localStorage.removeItem('token');
        window.location.replace("http://127.0.0.1:3000/login/")
    }

    const value = {logIn, logOut}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};