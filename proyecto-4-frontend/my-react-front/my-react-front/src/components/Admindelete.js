import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';



function Admindelete() {
    const [source, setSource] = useState();
    const [verbDelete, setVerbDelete] = useState("");
    console.log(source)


    const handleSubmit = async e => {
        e.preventDefault();
        const theVerbToBeDeleted = await submitDeleteDataForm({
            source
        });
    }

    async function submitDeleteDataForm(theVerbToBeDeleted) {
        axios.delete("http://localhost:4000/deleteverb", {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
              theVerbToBeDeleted
            }
          })
          .then(response => {
              setVerbDelete(response.data.message)
          })

    }

    return (
        <>
        <div className="delete-verb content">
        <h2>Delete a verb</h2>
            <form onSubmit={handleSubmit}>
                <p>Source name of the verb: <input type="text" name="source" required onChange={e => setSource(e.target.value)} /></p>
                {verbDelete && <p style={{color: "red"}}>{verbDelete}</p>}
                <input type="submit" name="sub" value="DELETE" />
            </form>
        </div>
        </>
    );
  }
  
  export default Admindelete;