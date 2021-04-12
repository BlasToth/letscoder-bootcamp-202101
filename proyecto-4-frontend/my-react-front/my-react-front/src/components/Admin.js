// import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admincreate from './Admincreate'
import Admindelete from './Admindelete';
import Adminupdate from './Adminupdate';


function Admin() {
    return (
        <>
        <div className="title">Admin Page</div>
        <Admincreate />
        <Adminupdate />
        <Admindelete />
        </>
    );
  }
  
  export default Admin;