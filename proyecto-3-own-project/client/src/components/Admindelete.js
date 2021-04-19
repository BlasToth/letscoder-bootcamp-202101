import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

function Admindelete() {
  const [source, setSource] = useState();
  const [verbDelete, setVerbDelete] = useState("");
  const [show, setShow] = useState(true);
  const [option, setOption] = useState([]);
  const [changeItem, setChangeItem] = useState();
  
  async function makeGetRequest() {
    const res = await axios.get('/api/verbs/verbs');
    const data = res.data;
    return mapVerbs(data)
  }
  useEffect(() => {
    makeGetRequest();
  }, [])

  function mapVerbs(data) {
    const newOptions = data.map(verb => {
      return [verb.sourceName] 
      })
      setOption(newOptions)
  }

  

  const handleChange = (e) => {
    console.log(`Verb selected:  ${e.target.value}`);
    setChangeItem(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const theVerbToBeDeleted = await submitDeleteDataForm({
      source,
    });
  };

  async function submitDeleteDataForm(theVerbToBeDeleted) {
    axios
      .delete("/api/deleteverb", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          theVerbToBeDeleted,
        },
      })
      .then((response) => {
        setVerbDelete(response.data.message);
      });
  }

  return (
    <>
      <div className="delete-verb content">
        <h2>Delete a verb</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>
                Source name of the verb:{" "}
                <select value={changeItem} onChange={handleChange}>
            {option.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
              </p>
            </label>
          </fieldset>
          {verbDelete && show && <Alert  className="alert-no-answer" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{verbDelete}: <strong>{source}</strong></Alert.Heading>
      </Alert>}
          <input type="submit" name="sub" value="DELETE" />
        </form>
      </div>
    </>
  );
}

export default Admindelete;
