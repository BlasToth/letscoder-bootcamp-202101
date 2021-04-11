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
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nickname, setNickname] = useState();
    const [error, setError] = useState("");

        const handleSubmit = async e => {
            e.preventDefault();
            const regData = await signupUser({
                email,
                password, 
                nickname
            });
            signupUser(regData);
        }
  if (error) {
    return <div>Error: {error.message}</div>;
  }else
  return (
    <div className="signup-wrapper">
    <h1>Sign up if you are new here:</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Email</p>
            <input name="email" type="email" required onChange={e => setEmail(e.target.value)} />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Password</p>
            <input name="password" type="password" required onChange={e => setPassword(e.target.value)} />
          </label>
        </fieldset>
        <fieldset>
            <label>
              <p>Nickname</p>
              <input name="nickname" type="text" required onChange={e => setNickname(e.target.value)} />
            </label>
          </fieldset>
        <button type="submit" >
          SIGN UP
        </button>
      </form>
    </div>
  );
}


