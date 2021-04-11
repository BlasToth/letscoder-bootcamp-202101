import React from 'react';
import { useState } from 'react';

export default function Logout() {
    const [state, setState] = useState(false);

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
