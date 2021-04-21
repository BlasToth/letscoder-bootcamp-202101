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

  const [state, setState] = useState(true);

  const buttonText = state ? "Show me all" : "Show me 10";

  useEffect(() => {
      if (state === true) {
    axios.get("/api/login/halloffame", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) 
        .then(
          (result) => {
            setItems(result.data.users)
          
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
      } else {
        axios.get("/api/login/halloffameall", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }) 
          .then(
            (result) => {
              setItems(result.data.users)
            
              setIsLoaded(true);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );

      }
  }, [state]);
  
       
     const renderUser = (user, index) => {
         return(
             <tr style={{textAlign: "center"}} key={index} >
                 <td>{index + 1} </td>
                 <td>{user.nickname}</td>
                 <td>{user.points}</td>
             </tr>
         )
     }

     function listHandler() {
       setState(!state)
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
       <button onClick={listHandler}>{buttonText}</button>
         </div>
       );
     }
   }