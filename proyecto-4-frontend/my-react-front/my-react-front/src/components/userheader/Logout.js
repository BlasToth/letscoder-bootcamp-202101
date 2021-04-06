import React from 'react';
import Login from '../Login';
import { useState } from 'react';
import useToken from '../../hooks/useToken';
import { useHistory } from 'react-router-dom';


export default function Logout() {
    const history = useHistory();
    const [state, setState] = useState(false);
    const { token, setToken } = useToken();

    const buttonText = state ? "Log in " : "Log out";

    function handleLogout() {
        localStorage.removeItem('token');
        setState(!state); 
        window.location.reload()

    }

    return (
        <div>
        {state === false && (
            <button onClick={handleLogout}>🚪 {buttonText}</button>
        )}

        {state === true && (
        
        <button onClick={handleLogout}>🚪 {buttonText} </button>
        
        )}
            
        </div>
    )
}
