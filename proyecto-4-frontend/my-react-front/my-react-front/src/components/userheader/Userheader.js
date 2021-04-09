import React from 'react';
import { useEffect, useState } from 'react';
import Username from './Username';
import Userpoints from './Userpoints';
import Logout from './Logout'
import jwt_decode from "jwt-decode";
import './Userheader.css';
import axios from 'axios';


let localStorageToken = JSON.parse(localStorage.getItem("token"));
let token = (localStorageToken) ? localStorageToken.token : null;


export default function Userheader() {
    const [nickname, setNickname] = useState("Anonymus");
    const [points, setPoints] = useState();
    // console.log(nickname)
    // console.log(points)
    
    useEffect(() => {
        axios.get('http://localhost:4000/login/usernick', {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
        .then((response) => {
            setPoints(response.data.points)
            setNickname(response.data.nickname)
            
          });
    }, [])

    
    return (
        <div className="user-header">
            <Username nickname={nickname} />
            <Userpoints points={points}/>
            <Logout />
        </div>
    )
}
