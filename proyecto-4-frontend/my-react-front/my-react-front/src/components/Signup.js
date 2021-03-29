import React, { useState } from "react";
import './Signup.css';

async function signupUser(credentials) {
    return fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nickname, setNickname] = useState();

        const handleSubmit = async e => {
            e.preventDefault();
            const regData = await signupUser({
                email,
                password, 
                nickname
            });
            signupUser(regData);
        }

  return (
    <div className="signup-wrapper">
    <h1>Sign up if you are new here:</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Email</p>
            <input name="email" type="email" onChange={e => setEmail(e.target.value)} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Password</p>
            <input name="password" type="password" onChange={e => setPassword(e.target.value)} />
          </label>
        </fieldset>
        <fieldset>
            <label>
              <p>Nickname</p>
              <input name="nickname" type="text" onChange={e => setNickname(e.target.value)} />
            </label>
          </fieldset>
        <button type="submit" >
          SIGN UP
        </button>
      </form>
    </div>
  );
}


