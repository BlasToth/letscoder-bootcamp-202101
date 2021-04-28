import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner } from "react-bootstrap";
import Pagination from './Pagination';

function Allverbs() {
   useEffect(() => {
     fetchItems();
   }, []);

   const [items, setItems] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [error] = useState(null);
   const [posts, setPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(10);
 

   const fetchItems = async () => {
     const data = await fetch(
       '/api/verbs/verbs'
     );

     const items = await data.json();
     if (items.length) {
       setIsLoaded(true);
       setItems(items);
       setPosts(items);
     }
   }

   function audioHandler() {
      const figcaptions = document.querySelectorAll(".figcaption");
      const sounds = document.querySelectorAll(".audio");
  
      for (let i = 0; i < figcaptions.length; i++) {
        figcaptions[i].addEventListener("click", () => {
          sounds[i].play();
        });
      }
    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="spinner-container">
      <Spinner className="spinner" animation="border" variant="success" />
      </div>
    } else {
      return (
        <>
        <Container>
        <div className="title">All verbs</div>
        <ul>
          {currentPosts.map((item) => (
            <li key={item._id} style={{ listStyleType: "none" }}>
              <>
                <div className="verb">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="card mystyle-card">
                        <img
                          className="card-img-top mystyle-card-image"
                          src={item.gifUrl}
                          alt="Verb card"
                        ></img>
                        <div className="card-body">
                          <h5 className="card-title sourcename">
                            {item.sourceName}
                          </h5>
                          <p className="card-text rest">
                            {item.v1}, {item.v2}, {item.v3}
                          </p>
                          <figure>
                            <figcaption
                              className="figcaption"
                              onClick={audioHandler}
                            >
                              <span>🔉</span>
                            </figcaption>
                            <audio className="audio" hidden>
                              <source
                                src={item.audioUrl}
                                type="audio/mp3"
                              ></source>
                            </audio>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </li>
          ))}
        </ul>
        </Container>
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </>
      );
    }
  }
  
  export default Allverbs;