require('dotenv').config();
const fetch = require("node-fetch");
const API_KEY = process.env.API;
console.log(process.env.API)
getGifFetch();

// fetch start
function getGifFetch() {

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=cat`;
  fetch(url, {
      method: "GET"
  }).then(response => {
      if (response.ok) {
          console.log(response);
          return response.json();
      }
  }).then((data) => {
      console.log(`miezmar: ${data.data[0].images.downsized_medium.url}`);

  })
}
// fetch end