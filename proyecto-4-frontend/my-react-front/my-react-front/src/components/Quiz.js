import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function audioHandler() {
  const figcaptions = document.querySelectorAll(".figcaption");
  const sounds = document.querySelectorAll(".audio");

  for (let i = 0; i < figcaptions.length; i++) {
    figcaptions[i].addEventListener("click", () => {
      sounds[i].play();
    });
  }
}
const num = 5;
const localStorageToken= JSON.parse(localStorage.getItem("token"));
const token = (localStorageToken) ? localStorageToken.token : null;
// console.warn(token)

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function Quiz() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:4000/verbs/answers", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) //right now it will receive: Please login! hence the error
        .then(
          (result) => {
            console.log(result.data.showVForm)
            setIsLoaded(true);
            setItems(result.data.showVForm);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, []);

    let [v1, v2, v3, verbId, wordArray, gifUrl, audioUrl, sourceName] = items;
    const sendAnswerToBack = [];
    const gap = "______";
    if (v1 === "case 0") {
      sendAnswerToBack.push("case 0", verbId);
      v1 = gap;
    }
    else if (v2 === "case 1") {
      sendAnswerToBack.push("case 1", verbId);
      v2 = gap;
    }
    else if (v3 === "case 2") {
      sendAnswerToBack.push("case 2", verbId);
      v3 = gap;
    }
    // console.log(sendAnswerToBack)
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <h1>Cuál es la forma correcta del verbo irregular: <strong>{items[7]}</strong>?</h1>
                <h2>{v1}, {v2}, {v3}</h2>
                {/* <h2>{items[4][0]}, {items[4][1]}, {items[4][2]}, {items[4][3]}</h2> */}
                <img src={gifUrl} alt="Verb card"></img>
        </>
          )}
      }
  export default Quiz;