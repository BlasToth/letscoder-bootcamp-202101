import React from 'react'

export default function Username(props) {
    const admin = props.authAdminState.authAdminState;
    const key = "🔑";
    console.log(admin)
    if (props.nickname.length) {
        return (
            <div>
                Username: <span className="strong">{props.nickname} {admin && key} </span> 
            </div>
        )
    }
    return (
        <div>
            Username: <span className="strong">Anonym </span> 
        </div>
    )
}
