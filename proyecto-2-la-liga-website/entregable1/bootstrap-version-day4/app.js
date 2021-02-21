// const partidos = matchesData.matches;

// fetch start
function getDataFetch() {
  const url = "https://api.football-data.org/v2/competitions/2014/matches";
  fetch(url, {
      method: "GET",
      headers: {
          "X-Auth-Token": `${api_key}`
      }
  }).then(response => {
      if (response.ok) {
          console.log(response);
          return response.json();
      }
  }).then((data) => {
      partidos = data.matches;

      function getMatches(partidos) {
        let tbody = document.querySelector(".partidos-body");
        tbody.innerHTML = "";
      
        for (let i = 0; i < partidos.length; i++) {
          let awayTeamID = partidos[i].awayTeam.id;
          let homeTeamID = partidos[i].homeTeam.id;
      
          let urlAwayTeam = "https://crests.football-data.org/" + awayTeamID + ".svg";
          let urlHomeTeam = "https://crests.football-data.org/" + homeTeamID + ".svg";
      
          let awayTeamName = partidos[i].awayTeam.name;
          let homeTeamName = partidos[i].homeTeam.name;
      
          let tr = document.createElement("tr"); // crear tr
      
          let tdLocal = document.createElement("td"); // crear 3 td
          tdLocal.innerText = partidos[i].homeTeam.name; // homeTeam - 1.
      
          let tdResult = document.createElement("td"); // resultado - 2. | 0 - 0 |
          if (partidos[i].score.fullTime.awayTeam === null) {
            tdResult.innerText = partidos[i].status;
            tdResult.classList.add("scheduled");
          } else {
            tdResult.style.textAlign = "center";
            tdResult.innerHTML = `
            <span><img src="${urlHomeTeam}" alt="${homeTeamName}" width="40px" title="${homeTeamName}"></span>
            <span>${partidos[i].score.fullTime.homeTeam}</span>
            <span>-<span>
            <span>${partidos[i].score.fullTime.awayTeam}</span>
            <span><img src="${urlAwayTeam}" alt="${awayTeamName}" width="40px" title="${awayTeamName}"></span>
            `;
          }
      
          let tdVisitante = document.createElement("td"); // awayTeam -3.
          tdVisitante.innerText = partidos[i].awayTeam.name;
          tdVisitante.style.textAlign = "right";
          
          tr.append(tdLocal); // append td to tr
          tr.append(tdResult);
          tr.append(tdVisitante);
          tbody.append(tr); // append  tr to tbody
          
        }
      }

      const error = "ERROR";
const radioButtons = document.getElementsByName("filter");

// TODO filter for names first
const mySearchBtn = document.getElementById("searchBtn");
const mySearchInput = document.getElementById("search");
let searchedExpression;

 getMatches(partidos);
 
 function callError() {
   let tbody = document.querySelector(".partidos-body");
   tbody.innerHTML = "";
   let newP = document.createElement("p");
   newP.innerText = `No hemos encontrado nada con la palabra: ${searchedExpression}`
   newP.style.textAlign = "center";
   newP.style.color = "red";
   newP.style.fontSize = "1.1em";
   tbody.append(newP);
 }
 
mySearchInput.addEventListener('keyup', () => {
  
  searchedExpression = mySearchInput.value;

  const filterForName = partidos.filter(
    (partidos) => partidos.awayTeam.name.toLowerCase().includes(searchedExpression) 
                  ||
                  partidos.homeTeam.name.toLowerCase().includes(searchedExpression)
  );
  
  // error message
  if (filterForName.length < 1) {
    callError();
  } 
  // end error message
  
  console.log(filterForName)

  // getMatches(filterForName);

  const todosLosPartidosPorNombre = filterForName.filter(
    (matches) => matches.score.winner === "HOME_TEAM" || matches.score.winner === "AWAY_TEAM" || matches.score.winner === "DRAW" || matches.status !== "FINISHED"
  );

  const ganados = filterForName.filter(
    (matches) => matches.awayTeam.name.toLowerCase().includes(searchedExpression) && matches.score.winner === "AWAY_TEAM"
                  ||
                  matches.homeTeam.name.toLowerCase().includes(searchedExpression) && matches.score.winner === "HOME_TEAM"
  );

  const perdidos = filterForName.filter(
    (matches) => matches.awayTeam.name.toLowerCase().includes(searchedExpression) && matches.score.winner === "HOME_TEAM"
                  ||
                  matches.homeTeam.name.toLowerCase().includes(searchedExpression) && matches.score.winner === "AWAY_TEAM"
  )

  const empatados = filterForName.filter(
    (matches) => matches.score.winner === "DRAW"
  )

  const proximos = filterForName.filter(
    (matches) => matches.status !== "FINISHED"
  )
  
  const arrayOfFilters = [todosLosPartidosPorNombre, ganados, perdidos, empatados, proximos];

  for (let k = 0; k < radioButtons.length; k++) {
    radioButtons[k].addEventListener("click", () => {
      getMatches(arrayOfFilters[k]);
    });
  }

});

      
  })
}

getDataFetch();
// fetch end



