import './Verb.css';

function Verb() {
    return (
      <div className="verb">
        <div className="row">
            <div className="col-sm-6">
                <div className="card mystyle-card">
                    <img className="card-img-top mystyle-card-image" src="https://media0.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif?cid=e1c45ae7htzz02slu3tnu36bwhmw7y80ss7eow7ug97iotv6&rid=giphy.gif" alt="Card image cap"></img>
                    <div className="card-body">
                      <h5 className="card-title sourcename">ganar</h5>
                      <p className="card-text rest">win, won, won</p>
                      <figure>
                          <figcaption className="figcaption">🔉</figcaption>
                          <audio className="audio" hidden>
                              <source src="https://media.merriam-webster.com/audio/prons/en/us/mp3/w/win00001.mp3" type="audio/mp3"></source>
                              </audio>
                            </figure>
                    </div>
                  </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Verb;