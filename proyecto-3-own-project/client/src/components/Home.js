// import './Nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Login';
import Signup from "./Signup";
import { useState } from 'react';
import Sharky from "../images/tiburon_refran.jpg";
import { Container } from "react-bootstrap";


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
      <Container>
      <div className="title">Home</div>
      <div className="home-text">Si das pescado a un hombre hambriento, le nutres una jornada. Si le enseñas a pescar, le nutrirás toda la vida </div>
      <div className="home-image">
        <img className="shark-commonphrase" src={Sharky}  alt="shark saying"></img>
      </div>
      </Container>
    )
}



export default Home;
