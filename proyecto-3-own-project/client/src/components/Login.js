import React, { useState } from "react";
import './Login.css';
import { Alert } from 'react-bootstrap'


export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userCreate, setUserCreate] = useState("");
  const [showFail, setShowFail] = useState(true);

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
  return fetch('/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
  .then((response) => {
    return response.json();
  })
  // .then(data => {
  //   console.log(data);
  // });
  
//   .then(data => {
//     data.json()
//       console.log(data.message)
//       setShowFail(true)
//       setUserCreate(data.message)
// })
  
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

        {userCreate && showFail && <Alert  className="alert-update-success" onClose={() => setShowFail(false)} transition dismissible>
        <Alert.Heading><strong>{userCreate}</strong></Alert.Heading>
      </Alert>}

        <button type="submit" >
         LOG IN
        </button>
      </form>      
    </div>
  );
}
