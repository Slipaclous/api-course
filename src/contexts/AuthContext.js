import {createContext} from 'react';

//Juste besoin d'une forme de contexte
export default createContext({
    isAuthenticated: false,
    setIsAuthenticated: value=>{}
});
