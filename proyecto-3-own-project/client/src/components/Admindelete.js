import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

function Admindelete() {
  const [source, setSource] = useState();
  const [verbDelete, setVerbDelete] = useState("");
  const [show, setShow] = useState(true);

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
                <input
                  type="text"
                  name="source"
                  required
                  onChange={(e) => setSource(e.target.value)}
                />
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
