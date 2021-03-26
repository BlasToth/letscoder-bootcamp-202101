import React from 'react';
import './Login.css';

export default function Login() {
    return(
        <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form>
            <fieldset>
                <label>
                    <p>Username</p>
                    <input type="text"/>
                </label>
            </fieldset>
            <fieldset>
                <label>
                    <p>Password</p>
                    <input type="password"/>
                </label>
            </fieldset>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>

        </div>

    )
}