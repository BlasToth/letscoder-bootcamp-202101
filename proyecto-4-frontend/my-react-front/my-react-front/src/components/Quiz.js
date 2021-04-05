import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import audioHandler from '../js/logic/audio-handler';
import './Quiz.css';

let localStorageToken= JSON.parse(localStorage.getItem("token"));
let token = (localStorageToken) ? localStorageToken.token : null;
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
    const [noMoreVerbs, setNoMoreVerbs] = useState(false);
    const [buttonText, setButtonText] = useState(false);
    const [active, setActive] = useState({
      activeObject: null,
      objects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
    const [finalAnswerToBack, setFinalAnswerToBack] = useState([]);
    console.log(finalAnswerToBack);

    const buttonTextState = buttonText ? "NEXT" : "SEND";

    function axiosGetAnswers() {
      axios.get("http://localhost:4000/verbs/answers", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) 
        .then(
          (result) => {
            if (!result.data.showVForm) {
              setIsLoaded(true);
              setNoMoreVerbs(true);
             return console.log("NO more verbs");
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
      setActive({ ...active, activeObject: null })
    }

    function handleSendAnswerToBack() {
      axios.post('http://localhost:4000/verbs/check', {
        body: finalAnswerToBack
      }, {
        headers: {
          'Authorization': `Basic ${token}` 
        }
      })
          .then(
            (result) => {
              console.log(result.data.verdict)
              if (result.data.verdict === true) {
                document.body.classList.add('correct'); 
              }else {
                document.body.classList.add('not-correct');
              }
            },
            (error) => {
              console.log(error)
            }
          );

          setButtonText(!buttonText);
                 
    }

    function handleBackground() {
      if (document.body.classList.value === "correct") {
        document.body.classList.remove("correct");
      } else if (document.body.classList.value === "not-correct") {
        document.body.classList.remove("not-correct")
      }
    }

    function toggleActive(index) {
      setActive({ ...active, activeObject: active.objects[index] })
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
      }
      else if (v2 === "case 1") {
        sendAnswerToBack.push("case 1", verbId);
        v2 = gap;
      }
      else if (v3 === "case 2") {
        sendAnswerToBack.push("case 2", verbId);
        v3 = gap;
      }
      console.log(sendAnswerToBack)


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }  else if (noMoreVerbs) {
      return <div><h1>THAT'S IT FOLKS! NO MORE VERBS TO LEARN!</h1></div>;
    } else {
      return (
        <>
        <h1>Cuál es la forma correcta del verbo irregular: <strong>{sourceName}</strong>?</h1>
                <h2>{v1}, {v2}, {v3}</h2>
                {wordArray && wordArray.map((word, index) => {
                  return <button key={index} onClick={() => {
                    sendAnswerToBack[2] = word;
                   setFinalAnswerToBack(sendAnswerToBack)
                    
                    toggleActive(index)
                    console.log(sendAnswerToBack);
                    }}
                    className={toggleActiveStyles(index)}
                    >{word}</button>

                })}
                {buttonText === false && (
            <button onClick={() => {
          handleSendAnswerToBack();
          
        }}>{buttonTextState}</button>
        )}

        {buttonText === true && 
        <button onClick={() => {
          axiosGetAnswersPlusButtonTextHandler();
          handleBackground();
        }}>{buttonTextState} </button>
          }

                <img src={gifUrl} alt="Verb card"></img>  
                <figure>
                            <figcaption
                              className="figcaption"
                              onClick={audioHandler}
                            >
                              🔉
                            </figcaption>
                            <audio className="audio" hidden>
                              <source
                                src={audioUrl}
                                type="audio/mp3"
                              ></source>
                            </audio>
                          </figure>  
        </>
          )}
      }
  export default Quiz;