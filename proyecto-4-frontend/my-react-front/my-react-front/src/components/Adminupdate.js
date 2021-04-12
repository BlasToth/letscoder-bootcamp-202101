import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

async function submitVerbDataForm(verbUpdateForm) {
    axios.patch('http://localhost:4000/updateverb',
         { verbUpdateForm }
         );
}

function Adminupdate() {
    const [sourceName, setSourceName] = useState();
    const [v1, setV1] = useState();
    const [v2, setV2] = useState();
    const [v3, setV3] = useState();
    const [wrongV1, setWrongV1] = useState();
    const [wrongV2, setWrongV2] = useState();
    const [wrongV3, setWrongV3] = useState();

    const handleSubmit = async event => {
        event.preventDefault();
        const verbUpdateForm = await submitVerbDataForm({
            sourceName,
            v1,
            v2,
            v3,
            wrongV1,
            wrongV2,
            wrongV3
        })
    }


    return (
        <>
        <div className="update-verb content">
        <h2>Update a verb</h2>
            <form onSubmit={handleSubmit}>
            <fieldset>
                <label>
                <p>Source name: <input type="text" name="sourceName" required onChange={event => setSourceName(event.target.value)} /></p>
                </label>
                <fieldset>
                <label>
                <p>V1: <input type="text" name="v1" required onChange={event => setV1(event.target.value)} /></p>
                </label>
            </fieldset>
            <fieldset>
                <label>
                <p>V2: <input type="text" name="v2" required onChange={event => setV2(event.target.value)} /></p>
                </label>
            </fieldset>
            <fieldset>
                <label>
                <p>V3: <input type="text" name="v3" required onChange={event => setV3(event.target.value)} /></p>
                </label>
            </fieldset>
            <fieldset>
                <label>
                <p>WrongV1: <input type="text" name="wrongv1" required onChange={event => setWrongV1(event.target.value)} /></p>
                </label>
            </fieldset>
            <fieldset>
                <label>
                <p>WrongV2: <input type="text" name="wrongv2" required onChange={event => setWrongV2(event.target.value)} /></p>
                </label>
            </fieldset>
            <fieldset>
                <label>
                <p>WrongV3: <input type="text" name="wrongv3" required onChange={event => setWrongV3(event.target.value)} /></p>
                </label>
            </fieldset>
            </fieldset>
                <input type="submit" name="sub" value="UPDATE" />
            </form>
        </div>
        </>
    );
  }
  
  export default Adminupdate;