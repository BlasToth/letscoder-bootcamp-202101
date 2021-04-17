import { useState } from "react";
import './Signup.css';
import { Alert } from "react-bootstrap";


export default function Signup() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nickname, setNickname] = useState();
    const [error, setError] = useState();
    const [userSignupSuccess, setUserSignupSuccess] = useState("");
    const [userCreate, setUserCreate] = useState("");
    const [showSuccess, setShowSuccess] = useState(true);
    const [showFail, setShowFail] = useState(true);
    
        const handleSubmit = async e => {
            e.preventDefault();
            const regData= {
                email,
                password, 
                nickname
            }
            signupUser(regData);
        }
        async function signupUser(credentials) {
          return fetch('/api/signup', {
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
          if (data.message !== undefined) {
            console.log(data.message)
            setShowSuccess(true)
            setUserSignupSuccess(data.message)
          } else {
            console.log(data)
            setShowFail(true)
            setUserCreate(data)
          }
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
        
                {userSignupSuccess && showSuccess && <Alert  className="alert-update-error" onClose={() => setShowSuccess(false)} transition dismissible>
              <Alert.Heading><strong>{userSignupSuccess}</strong></Alert.Heading>
            </Alert>}
      
            {userCreate && showFail && <Alert  className="alert-update-success" onClose={() => setShowFail(false)} transition dismissible>
        <Alert.Heading><strong>{userCreate}</strong></Alert.Heading>
      </Alert>}

        <button type="submit" >
          SIGN UP
        </button>
      </form>
    </div>
  );
}


