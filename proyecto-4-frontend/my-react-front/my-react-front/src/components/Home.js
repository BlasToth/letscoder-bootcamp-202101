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
          <button type="submit" name="login">LOG IN</button>
        </form>
      </div>

      <hr></hr>

      <h2>Sign up if you are new here: </h2>
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
          <fieldset>
            <label>
              <p>Nickname</p>
              <input name="nickname" type="text" />
            </label>
          </fieldset>
          <button type="submit" name="signup">SIGN UP</button>
        </form>
      </div>
    </>
  );
}



export default Home;
