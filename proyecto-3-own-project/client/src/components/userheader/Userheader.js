import React from 'react';
import { useEffect, useState } from 'react';
import Username from './Username';
import Userpoints from './Userpoints';
import Logout from './Logout'
import './Userheader.css';
import axios from 'axios';


let localStorageToken = JSON.parse(localStorage.getItem("token"));
let token = (localStorageToken) ? localStorageToken.token : null;


export default function Userheader(props) {
    const [nickname, setNickname] = useState("");
    const [points, setPoints] = useState(0);
    
    async function axiosGetUserNick() {
        let response = await axios.get('/api/login/usernick', {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
            setPoints(response.data.points)
            setNickname(response.data.nickname)    
            
    }
    
    useEffect(() => {
        axiosGetUserNick()

    }, [])

    
    return (
        <div className="user-header">
            <Username nickname={nickname} authAdminState={props} />
            <Userpoints points={points}/>
            <Logout />
        </div>
    )
}
