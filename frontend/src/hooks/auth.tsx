import React, { createContext, useState, useContext } from 'react';

import api from '../services/api';

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string, passwordHash: string): void;
    signOut(): void;
}



const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const md5 = require('md5');
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');
        
        return !!isLogged;
    });
    
    const [passwordEntry, setPasswordEntry] = useState<string>('');
    const [userEntry, setUserEntry] = useState<string>('');
    
    
    async function getPassword(){
        await api.get(`/user/${userEntry}`)
            .then(response => {
                setPasswordEntry(response.data[0].ds_password)
            })
        }
    

    const signIn = (email: string, password: string, passwordHash: string) => {       

        if(md5(passwordEntry) === passwordHash){
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLogged(true);
        }else{
            alert('Senha ou usuário inválidos!');
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };