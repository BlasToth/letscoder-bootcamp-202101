import './MyComponent.css';
import { useEffect, useState } from "react";

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("verbs/verbs")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
      <ul>
        {items.map((item) => (
          <li key={item._id} style={{ listStyleType: "none" }}>
            <>
              {/* <Button variant="success" style={{ border: "2px solid black" }}>Test Button</Button> */}
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
    );
  }
}

export default MyComponent;