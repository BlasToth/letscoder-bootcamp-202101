// import './Nav.css';
import "bootstrap/dist/css/bootstrap.min.css";


function Home() {
    
  return (
    <>
      <h1>Welcome!</h1>
      <h2>Please log in!</h2>
      <div className="login content">
      
        <form>
          <fieldset>
            <label>
              <p>Email</p>
              <input name="email" type="email" />
            </label>
          </fieldset>
          <fieldset>
            <label>
              <p>Password</p>
              <input name="password" type="password" />
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
