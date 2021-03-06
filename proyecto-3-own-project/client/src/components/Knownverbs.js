// import './Nav.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

let localStorageToken = JSON.parse(localStorage.getItem("token"));
let token = localStorageToken ? localStorageToken.token : null;

export default function Knownverbs() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [noVerbYet, setNoVerbYet] = useState("");

  useEffect(() => {
    axios
      .get("/api/verbs/knownverbs", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(
        (result) => {
          if (!result.data.verbs) {
            setNoVerbYet(result.data.message);
          }
          setItems(result.data.verbs);
          setIsLoaded(true);
          // setItems(result);
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

  async function handleDeleteKnownVerbs() {
    axios.patch('/api/verbs/deleteknownverbs', {
      headers: {
        'Authorization': `Bearer ${token}`,
    },
    })
    .then((response) => {
      setNoVerbYet("You have deleted your verbs! Try the Quiz!")
    });
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (noVerbYet) {
    return (
      <>
        <div className="title">Known Verbs</div>
        <div>
          <h1>{noVerbYet}</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="title">Known Verbs</div>
        <div>
          <h1>You already know: {items.length} verb(s)</h1>
          <div className="randomverb-button-container__known ">
          <button className="randomverb-button" onClick={handleDeleteKnownVerbs}>Delete known verbs</button>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item._id} style={{ listStyleType: "none" }}>
                <>
                  <div className="verb">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="card mystyle-card">
                          <img
                            className="card-img-top mystyle-card-image"
                            src={item.gifUrl}
                            alt="Verb card"
                          ></img>
                          <div className="card-body">
                            <h5 className="card-title sourcename">
                              {item.sourceName}
                            </h5>
                            <p className="card-text rest">
                              {item.v1}, {item.v2}, {item.v3}
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
                                  src={item.audioUrl}
                                  type="audio/mp3"
                                ></source>
                              </audio>
                            </figure>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
