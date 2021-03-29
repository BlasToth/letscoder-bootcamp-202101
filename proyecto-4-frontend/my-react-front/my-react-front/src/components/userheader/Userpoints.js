import React from 'react'

export default function Userpoints() {
    return (
        <div>
            Points: {localStorage.getItem('token')}
        </div>
    )
}
