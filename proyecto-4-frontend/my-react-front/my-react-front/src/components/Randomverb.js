import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Randomverb() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetch("verbs/onerandomverb") 
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
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

                <div className="verb">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="card mystyle-card">
                        <img
                          className="card-img-top mystyle-card-image"
                          src={items.gifUrl}
                          alt="Verb card"
                        ></img>
                        <div className="card-body">
                          <h5 className="card-title sourcename">
                            {items.sourceName}
                          </h5>
                          <p className="card-text rest">
                            {items.v1}, {items.v2}, {items.v3}
                          </p>
                          <figure>
                            <figcaption
                              className="figcaption"
                              onClick={audioHandler}
                            >
                              🔉
                            </figcaption>
                            <audio className="audio" hidden>
                              <source
                                src={items.audioUrl}
                                type="audio/mp3"
                              ></source>
                            </audio>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          )}

      }
  export default Randomverb;