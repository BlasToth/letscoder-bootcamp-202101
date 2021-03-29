import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Quiz() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetch("verbs/onerandomverb") //right now it will receive: Please login! hence the error
        .then((res) => res.json())
        .then(
          (result) => {
            const data = result;
            setIsLoaded(true);
            setItems(result);
            return data;
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, []);

    function audioHandler() {
      const figcaptions = document.querySelectorAll(".figcaption");
      const sounds = document.querySelectorAll(".audio");
  
      for (let i = 0; i < figcaptions.length; i++) {
        figcaptions[i].addEventListener("click", () => {
          sounds[i].play();
        });
      }
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

                <h1>Quiz</h1>
          )}

      }
  export default Quiz;