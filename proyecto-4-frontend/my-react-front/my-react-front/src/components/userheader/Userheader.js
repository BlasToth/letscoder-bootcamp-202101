import React from 'react';
import Username from './Username';
import Userpoints from './Userpoints';
import Logout from './Logout'
import jwt_decode from "jwt-decode";
import './Userheader.css';
import Login from '../Login';



export default function Userheader() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const {nickname, points} = decoded;    
    
    return (
        <div className="user-header">
            <Username nickname={nickname} />
            <Userpoints points={points}/>
            <Logout />
        </div>
    )
}
