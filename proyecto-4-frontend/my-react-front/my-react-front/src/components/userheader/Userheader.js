import React from 'react';
import Username from './Username';
import Userpoints from './Userpoints';
import Logout from './Logout'

export default function Userheader() {
    return (
        <div>
            <Username />
            <Userpoints />
            <Logout />
        </div>
    )
}
