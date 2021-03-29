import React from 'react';
import Username from './Username';
import Userpoints from './Userpoints';
import Logout from './Logout'
import jwt_decode from "jwt-decode";
import './Userheader.css';

const token = localStorage.getItem('token');
const decoded = jwt_decode(token);
const {nickname, points} = decoded;

export default function Userheader() {
    return (
        <div className="user-header">
            <Username nickname={nickname} />
            <Userpoints points={points}/>
            <Logout />
        </div>
    )
}
