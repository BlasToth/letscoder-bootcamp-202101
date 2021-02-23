let searchedExpression;

getDataFetch();

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
      let partidos = data.matches;
      getMatches(partidos);
      search(partidos);
      const spinnerWrapper = document.querySelector('.spinner-wrapper');
      spinnerWrapper.parentElement.removeChild(spinnerWrapper);
  })
}
// fetch end


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

function callError(filterForName, todosLosPartidosPorNombre, ganados, perdidos, empatados, proximos) {
  const inputs = document.getElementsByName("filter");
  let tbody = document.querySelector(".partidos-body");
  tbody.innerHTML = "";
  let newP = document.createElement("p");
  if (inputs[1].checked) {
    newP.innerText = `Entre los partidos GANADOS no hay nada con la palabra: ${searchedExpression}`;
  newP.style.textAlign = "center";
  newP.style.color = "red";
  newP.style.fontSize = "1.1em";
  tbody.append(newP);
  } else if (inputs[2].checked) {
    newP.innerText = `Entre los partidos PERDIDOS no hay nada con la palabra: ${searchedExpression}`;
    newP.style.textAlign = "center";
    newP.style.color = "red";
    newP.style.fontSize = "1.1em";
    tbody.append(newP);
  } else if (inputs[3].checked) {
    newP.innerText = `Entre los partidos EMPATADOS no hay nada con la palabra: ${searchedExpression}`;
    newP.style.textAlign = "center";
    newP.style.color = "red";
    newP.style.fontSize = "1.1em";
    tbody.append(newP);
  } else if (inputs[4].checked) {
    newP.innerText = `Entre los partidos PRÓXIMOS no hay nada con la palabra: ${searchedExpression}`;
    newP.style.textAlign = "center";
    newP.style.color = "red";
    newP.style.fontSize = "1.1em";
    tbody.append(newP);
  }
   else {
    newP.innerText = `No hemos encontrado nada con la palabra: ${searchedExpression}`
    newP.style.textAlign = "center";
    newP.style.color = "red";
    newP.style.fontSize = "1.1em";
    tbody.append(newP);
  }
}

function search(partidos) {
  const mySearchInput = document.getElementById("search");
  const radioButtons = document.getElementsByName("filter");

  mySearchInput.addEventListener('keyup', () => {
  
    searchedExpression = mySearchInput.value;
  
    const filterForName = partidos.filter(
      (partido) => partido.awayTeam.name.toLowerCase().includes(searchedExpression) 
                    ||
                    partido.homeTeam.name.toLowerCase().includes(searchedExpression)
    );

    console.log(filterForName)
  
    // getMatches(filterForName);
  
    const todosLosPartidosPorNombre = filterForName.filter(
      (match) => match.score.winner === "HOME_TEAM" || match.score.winner === "AWAY_TEAM" || match.score.winner === "DRAW" || match.status !== "FINISHED"
    );
  
    const ganados = filterForName.filter(
      (match) => match.awayTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "AWAY_TEAM"
                    ||
                    match.homeTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "HOME_TEAM"
    );
  
    const perdidos = filterForName.filter(
      (match) => match.awayTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "HOME_TEAM"
                    ||
                    match.homeTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "AWAY_TEAM"
    )
  
    const empatados = filterForName.filter(
      (match) => match.score.winner === "DRAW"
    )
  
    const proximos = filterForName.filter(
      (match) => match.status !== "FINISHED"
    )

    const arrayOfFilters = [todosLosPartidosPorNombre, ganados, perdidos, empatados, proximos];
  
    for (let k = 0; k < radioButtons.length; k++) {
      radioButtons[k].addEventListener("click", () => {
        // error message
        if (filterForName.length < 1) {
          callError(filterForName, todosLosPartidosPorNombre, ganados, perdidos, empatados, proximos);
        } 
        // end error message
        else getMatches(arrayOfFilters[k]);
      });
    }
  
  });
}
