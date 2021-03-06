require('dotenv').config();
const fetch = require("node-fetch");
const API_KEY_S = process.env.API_S;

getSoundFetch();

// fetch start
function getSoundFetch() {
const searchExp = "freeze" //req.body.v1;
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchExp}?key=${API_KEY_S}`;
  fetch(url, {
      method: "GET"
  }).then(response => {
      if (response.ok) {
        //   console.log(response);
          return response.json();
      }
  }).then((data) => {
    console.log(data[0].hwi.prs[0].sound.audio);

  })
}
// fetch end
