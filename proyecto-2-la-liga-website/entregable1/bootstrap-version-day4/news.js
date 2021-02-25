getDataFetch();

// fetch start
function getDataFetch() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${api_key_sports}`;
  fetch(url, {
      method: "GET",
      headers: {
      }
  }).then(response => {
      if (response.ok) {
          console.log(response);
          return response.json();
      }
  }).then((data) => {
      console.log(data)
  })
}
// fetch end