require('dotenv').config();
const fetch = require("node-fetch");
const API_KEY = process.env.API;
getGifFetch();

// fetch start
function getGifFetch() {
const searchExp = req.body.v1;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=${searchExp}`;
  fetch(url, {
      method: "GET"
  }).then(response => {
      if (response.ok) {
          console.log(response);
          return response.json();
      }
  }).then((data) => {
    //   console.log(`miezmar: ${data.data[0].images.downsized_medium.url}`);
      const gifUrl = data.data[0].images.downsized_medium.url;
    //   console.log(gifUrl)

  })
}
// fetch end
