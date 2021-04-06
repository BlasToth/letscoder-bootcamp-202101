// import './Nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Login';
import Signup from "./Signup";
import { useState } from 'react';

const token = localStorage.getItem('token');
function Home() {
  const [visible, setVisible] = useState(false);
  
    if (!token && visible === false){
      setVisible(true);
      return (
        <>
          <Login />
    
          <hr></hr>
    
          <Signup />
        </>
      );
    }
    return(
      <h1>Home - Info</h1>
    )
}



export default Home;
