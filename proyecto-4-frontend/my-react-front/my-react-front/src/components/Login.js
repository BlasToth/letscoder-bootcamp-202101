import React, { useState } from "react";
import './Login.css';

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
        window.location.reload()
    }

    async function loginUser(credentials) {
      return fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
      })
      .then(data => data.json())
  }

  return (
    <div className="login-wrapper">
    <h1>Please Log In</h1>
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
        <button type="submit" >
         LOG IN
        </button>
      </form>      
    </div>
  );
}
