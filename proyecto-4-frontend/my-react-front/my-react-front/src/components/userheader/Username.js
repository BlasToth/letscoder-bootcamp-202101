import React from 'react'

export default function Username(props) {
    if (props.nickname.length) {
        return (
            <div>
                Username: <span className="strong">{props.nickname} </span> 
            </div>
        )
    }
    return (
        <div>
            Username: <span className="strong">Anonym </span> 
        </div>
    )
}
