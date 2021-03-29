import React from 'react'

function handleLogout() {
    localStorage.removeItem('token');   
}

export default function Logout() {
    return (
        <div>
            <button onClick={handleLogout}>🚪 Log Out</button>
            
        </div>
    )
}
