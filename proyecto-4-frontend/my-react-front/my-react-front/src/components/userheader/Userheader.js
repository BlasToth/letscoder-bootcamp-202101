import React from 'react';
import Username from './Username';
import Userpoints from './Userpoints';
import Logout from './Logout'
import jwt_decode from "jwt-decode";

const token = localStorage.getItem('token');
const decoded = jwt_decode(token);
const {nickname, points} = decoded;
console.log(points, nickname)

export default function Userheader() {
    return (
        <div>
            <Username nickname={nickname} />
            <Userpoints />
            <Logout />
        </div>
    )
}
