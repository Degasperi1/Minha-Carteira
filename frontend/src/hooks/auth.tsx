import React, { createContext, useState, useContext } from 'react';

import api from '../services/api';

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}



const AuthContext = createContext<IAuthContext>({} as IAuthContext);


const AuthProvider: React.FC = ({ children }) => {
    const md5 = require('md5');
    const [passwordHash, setPasswordHash] = useState<string>(md5('12345678'));
    
    


    
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');
        
        return !!isLogged;
    });
    
    const [passwordEntry, setPasswordEntry] = useState<string>('');
    const [userEntry, setUserEntry] = useState<string>('');
    
    
    async function getPassword(){
        await api.get(`/user/${userEntry}`)
            .then(response => {
                setPasswordHash(response.data[0].ds_password)
            })
        }
    

    const signIn = (email: string, password: string) => {  

        getPassword();

        setPasswordEntry(password);
        console.log('pass ' + password);
        console.log('pass hash');

        if(md5(password) === passwordHash){
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