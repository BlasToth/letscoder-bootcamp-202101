// import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Halloffame.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap';

let localStorageToken = JSON.parse(localStorage.getItem("token"));
let token = (localStorageToken) ? localStorageToken.token : null;

export default function Halloffame() {
  
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:4000/login/halloffame", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) 
        .then(
          (result) => {
            console.log(result.data.users)
            setItems(result.data.users)
          
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
  }, []);
       
     const renderUser = (user, index) => {
         return(
             <tr style={{textAlign: "center"}} key={index} >
                 <td>{index + 1} </td>
                 <td>{user.nickname}</td>
                 <td>{user.points}</td>
             </tr>
         )
     }
   
     if (error) {
       return <div>Error: {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Loading...</div>;
     } else {
       return (
         <div>
           <div className="title">Hall of fame</div>
<ReactBootStrap.Table striped bordered hover>
  <thead style={{ backgroundColor : "lightblue", textAlign: "center" }}>
    <tr>
      <th>#</th>
      <th>Nickname</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    {items.map(renderUser)}
  </tbody>
</ReactBootStrap.Table>
         </div>
       );
     }
   }