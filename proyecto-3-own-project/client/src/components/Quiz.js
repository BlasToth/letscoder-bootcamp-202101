import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import audioHandler from "../js/logic/audio-handler";
import "./Quiz.css";
import { Alert, Container } from "react-bootstrap";

let localStorageToken = JSON.parse(localStorage.getItem("token"));
let token = localStorageToken ? localStorageToken.token : null;
// console.warn(token)

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function Quiz() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [noMoreVerbs, setNoMoreVerbs] = useState(false);
  const [buttonText, setButtonText] = useState(false);
  const [active, setActive] = useState({
    activeObject: null,
    objects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  });
  const [finalAnswerToBack, setFinalAnswerToBack] = useState([]);
  // console.log(finalAnswerToBack);

  const buttonTextState = buttonText ? "NEXT" : "SEND";

  const [show, setShow] = useState(false);

  function axiosGetAnswers() {
    axios
      .get("/verbs/answers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (result) => {
          if (!result.data.showVForm) {
            setIsLoaded(true);
            setNoMoreVerbs(true);
          }
          // console.log(result.data.showVForm)
          setIsLoaded(true);
          setItems(result.data.showVForm);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function axiosGetAnswersPlusButtonTextHandler() {
    axiosGetAnswers();
    setButtonText(!buttonText);
    setActive({ ...active, activeObject: null });
  }

  function handleSendAnswerToBack() {
    axios
      .post(
        "/verbs/check",
        {
          body: finalAnswerToBack,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then(
        (result) => {
          // console.log(result.data.verdict);
          if (result.data.verdict === true) {
            document.querySelector(".with-header").classList.add("correct");
          } else {
            document.querySelector(".with-header").classList.add("not-correct");
          }
        },
        (error) => {
          // console.log(error);
        }
      );

    setButtonText(!buttonText);
  }

  function handleBackground() {
    if (document.querySelector(".with-header").classList.value === "correct") {
      document.querySelector(".with-header").classList.remove("correct");
    } else if (
      document.querySelector(".with-header").classList.value === "not-correct"
    ) {
      document.querySelector(".with-header").classList.remove("not-correct");
    }
  }

  function toggleActive(index) {
    setActive({ ...active, activeObject: active.objects[index] });
  }

  function toggleActiveStyles(index) {
    if (active.objects[index] === active.activeObject) {
      return "active";
    } else {
      return "inactive";
    }
  }

  useEffect(() => {
    axiosGetAnswers();
  }, []);

  let [v1, v2, v3, verbId, wordArray, gifUrl, audioUrl, sourceName] = items;

  let sendAnswerToBack = [];
  const gap = "______";
  if (v1 === "case 0") {
    sendAnswerToBack.push("case 0", verbId);
    v1 = gap;
  } else if (v2 === "case 1") {
    sendAnswerToBack.push("case 1", verbId);
    v2 = gap;
  } else if (v3 === "case 2") {
    sendAnswerToBack.push("case 2", verbId);
    v3 = gap;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (noMoreVerbs) {
    return (
      <div>
        <h1>THAT'S IT FOLKS! NO MORE VERBS TO LEARN!</h1>
      </div>
    );
  } else if (show) {
    return (
      <Alert  className="alert-no-answer" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>We need an answer!</Alert.Heading>
        <h5>
          If you don't click on an answer, we cannot continue with the quiz!
        </h5>
      </Alert>
    );
  } else {
    return (
      <>
      <Container className="quiz-container">
        <div className="quiz-question-text">
          Cuál es la forma correcta del verbo irregular:{" "}
          <strong>{sourceName}</strong>? 
        </div>
        <div className="quiz-3-verbs">
            {v1}, {v2}, {v3} <figure>
              <figcaption className="figcaption" onClick={audioHandler}>
                🔉
              </figcaption>
              <audio className="audio" hidden>
                <source src={audioUrl} type="audio/mp3"></source>
              </audio>
            </figure>
        </div>
        <div className="quiz-answer-buttons">
          {wordArray &&
            wordArray.map((word, index) => {
              return (
                <button
                  className="quiz-answer-individual"
                  key={index}
                  onClick={() => {
                    sendAnswerToBack[2] = word;
                    setFinalAnswerToBack(sendAnswerToBack);

                    toggleActive(index);
                  }}
                  className={toggleActiveStyles(index)}
                >
                  {word}
                </button>
              );
            })}
            </div>
            <div className="quiz-handler">
              {buttonText === false && (
                <button
                  className="quiz-handler__send"
                  onClick={() => {
                    if (finalAnswerToBack.length === 3) {
                      // console.log(finalAnswerToBack.length);
                      handleSendAnswerToBack();
                    }
                    if (finalAnswerToBack.length !== 3) {
                      // console.log(finalAnswerToBack.length);
                      setShow(true);
                    }
                  }}
                >
                  {buttonTextState}
                </button>
              )}

              {buttonText === true && (
                <button
                className="quiz-handler__next"
                  onClick={() => {
                    axiosGetAnswersPlusButtonTextHandler();
                    handleBackground();
                    window.location.reload();
                  }}
                >
                  {buttonTextState}{" "}
                </button>
              )}
          </div>
          <div className="quiz-gif">
          <img src={gifUrl} width="100%" alt="Verb card"></img> 
          </div>
        
        </Container>
      </>
    );
  }
}
export default Quiz;
