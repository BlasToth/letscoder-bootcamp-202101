// import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function Admindelete() {
    return (
        <>
        <div class="delete-verb content">
        <h2>Delete a verb</h2>
            <form action="/" method="DELETE">
                <p>ID of the verb: <input type="text" name="sourceName" required/></p>
                <input type="submit" name="sub" value="DELETE" />
            </form>
        </div>
        </>
    );
  }
  
  export default Admindelete;