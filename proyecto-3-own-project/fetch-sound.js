require('dotenv').config();
const fetch = require("node-fetch");
const API_KEY_S = process.env.API_S;

getSoundFetch();

// fetch start
function getSoundFetch() {
const searchExp = "retard" //req.body.v1;
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchExp}?key=${API_KEY_S}`;
  fetch(url, {
      method: "GET"
  }).then(response => {
      if (response.ok) {
        //   console.log(response);
          return response.json();
      }
  }).then((data) => {;
    const audioName = data[0].hwi.prs[0].sound.audio;
    const dictName = audioName.charAt(0);
    const audioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${dictName}/${audioName}.mp3`
    console.log(audioUrl);

  })
}
// fetch end
