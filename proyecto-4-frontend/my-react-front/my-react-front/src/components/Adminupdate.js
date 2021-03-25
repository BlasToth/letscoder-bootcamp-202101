// import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function Adminupdate() {
    return (
        <>
        <div class="update-verb content">
        <h2>Update a verb</h2>
            <form action="/" method="POST">
                <p>ID of the verb: <input type="text" name="sourceName" required/></p>
                <p>Source name: <input type="text" name="sourceName" required/></p>
                <p>V1: <input type="text" name="v1" required/></p>
                <p>V2: <input type="text" name="v2" required/></p>
                <p>V3: <input type="text" name="v3" required/></p>
                <p>WrongV1: <input type="text" name="wrongv1" required/></p>
                <p>WrongV2: <input type="text" name="wrongv2" required/></p>
                <p>WrongV3: <input type="text" name="wrongv3" required/></p>
                <input type="submit" name="sub" value="CREATE" />
            </form>
        </div>
        </>
    );
  }
  
  export default Adminupdate;