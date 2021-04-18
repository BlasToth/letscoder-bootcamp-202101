import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        // console.log(userToken?.points, userToken?.nickname)
        return userToken?.token
      };
    const [token, setToken] = useState(getToken());
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        localStorage.setItem('points', JSON.stringify(userToken?.points));
        localStorage.setItem('nickname', JSON.stringify(userToken?.nickname));

        setToken(userToken.token);
      };

    return {
        setToken: saveToken,
        token
    }
}
