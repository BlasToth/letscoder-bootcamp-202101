// import './Nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer, useState } from "react";

const formReducer = (state, event) => {
    if (event.reset) {
        return {
            email: '',
            password: ''
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

function Home() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
        setFormData({
            reset: true
        })
          }, 3000);
    }

    const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value
        });
    }


  return (
    <>
      <h1>Welcome!</h1>
      <h2>Please log in!</h2>
      <div className="login content">
      {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Email</p>
              <input name="email" onChange={handleChange} value={formData.email || ''}/>
            </label>
          </fieldset>
          <fieldset>
            <label>
              <p>Password</p>
              <input name="password" onChange={handleChange} value={formData.password || ''}/>
            </label>
          </fieldset>
          <button type="submit">LOG IN</button>
        </form>
      </div>

      <hr></hr>

      <h2>Sign up if you are new here: </h2>
      <div className="signup content">
        <form action="/signup" method="POST">
          <p>
            Email: <input type="email" name="email" required />
          </p>
          <p>
            Password: <input type="password" name="password" required />
          </p>
          <p>
            Nickname: <input type="text" name="nickname" required />
          </p>
          <input type="submit" name="sub" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default Home;
