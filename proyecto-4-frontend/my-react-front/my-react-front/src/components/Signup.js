import React, { useState } from "react";
import './Signup.css';
import { Alert } from "react-bootstrap";



export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nickname, setNickname] = useState();
    const [error, setError] = useState();
    const [userSignupSuccess, setUserSignupSuccess] = useState("");
    const [showSuccess, setShowSuccess] = useState(true);
    const [showError, setShowError] = useState(true);

        const handleSubmit = async e => {
            e.preventDefault();
            const regData = await signupUser({
                email,
                password, 
                nickname
            });
            signupUser(regData);
        }
        async function signupUser(credentials) {
          return fetch('http://localhost:4000/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(credentials)
          })
          .then((response) => {
            return response.json();
          })
        .then(data => {
          console.log(data)
          setUserSignupSuccess(data)
      })
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
          {userSignupSuccess && showSuccess && <Alert  className="alert-update-info" onClose={() => setShowSuccess(false)} dismissible>
        <Alert.Heading><strong>{userSignupSuccess}</strong></Alert.Heading>
      </Alert>}
        <button type="submit" >
          SIGN UP
        </button>
      </form>
    </div>
  );
}


