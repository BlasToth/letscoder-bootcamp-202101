import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';



function Admindelete() {
    const [id, setId] =useState();
    console.log(id)

    const handleSubmit = async e => {
        e.preventDefault();
        const idOfTheVerbToBeDeleted = await submitDeleteDataForm({
            id
        });
    }

    async function submitDeleteDataForm(idOfTheVerbToBeDeleted) {
        axios.delete("http://localhost:4000/deleteverb", {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
              idOfTheVerbToBeDeleted
            }
          });
    }

    return (
        <>
        <div className="delete-verb content">
        <h2>Delete a verb</h2>
            <form onSubmit={handleSubmit}>
                <p>ID of the verb: <input type="text" name="id" required onChange={e => setId(e.target.value)} /></p>
                <input type="submit" name="sub" value="DELETE" />
            </form>
        </div>
        </>
    );
  }
  
  export default Admindelete;