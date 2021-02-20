const partidos = matchesData.matches;
const radioButtons = document.getElementsByName("filter");

// TODO filter for names first
const mySearchBtn = document.getElementById("searchBtn");
const mySearchInput = document.getElementById("search");
let searchedExpression;

mySearchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchedExpression = mySearchInput.value;
  console.log(searchedExpression);

  let filterForName = partidos.filter(
    (partidos) => partidos.awayTeam.name.toLowerCase().includes(searchedExpression) 
                  ||
                  partidos.homeTeam.name.toLowerCase().includes(searchedExpression)
  );

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
  
  const arrayOfFilters = [todosLosPartidosPorNombre, ganados, perdidos, empatados];

  for (let k = 0; k < radioButtons.length; k++) {
    radioButtons[k].addEventListener("click", () => {
      getMatches(arrayOfFilters[k]);
    });
  }
  
});




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
    
    // const searchInput = document.getElementById("search");
    
    // search
    
    // TODO
    // if radio button is clicked use the corresponding array to search
    
    // for (let l = 0; l < radioButtons.length; l++) {
    //   console.log(typeof arrayOfFilters)
    //   if (radioButtons[l].value === arrayOfFilters[l]) {
    //   }
    // }

// TODO function
    // if (radioButtons[0].value === "partidos") {
    //   const rows = document.querySelectorAll("tbody tr");

    //   searchInput.addEventListener("keyup", function (event) {
    //     const q = event.target.value.toLowerCase();
    //     rows.forEach((row) => {
    //       row.querySelector("td").textContent.toLowerCase().indexOf(q) != -1
    //         ? (row.style.display = "table-row")
    //         : (row.style.display = "none");
    //     });
    //   });
    // } else if (radioButtons[1].value === "ganados") {
    //   const rows = document.querySelectorAll("tbody tr");

    //   searchInput.addEventListener("keyup", function (event) {
    //     const q = event.target.value.toLowerCase();
    //     rows.forEach((row) => {
    //       row.querySelector("td").textContent.toLowerCase().indexOf(q) != -1
    //         ? (row.style.display = "table-row")
    //         : (row.style.display = "none");
    //     });
    //   });
    // } else if (radioButtons[2].value === "perdidos") {
    //   const rows = document.querySelectorAll("tbody tr");

    //   searchInput.addEventListener("keyup", function (event) {
    //     const q = event.target.value.toLowerCase();
    //     rows.forEach((row) => {
    //       row.querySelector("td").textContent.toLowerCase().indexOf(q) != -1
    //         ? (row.style.display = "table-row")
    //         : (row.style.display = "none");
    //     });
    //   });
    // } else if (radioButtons[3].value === "empatados") {
    //   const rows = document.querySelectorAll("tbody tr");

    //   searchInput.addEventListener("keyup", function (event) {
    //     const q = event.target.value.toLowerCase();
    //     rows.forEach((row) => {
    //       row.querySelector("td").textContent.toLowerCase().indexOf(q) != -1
    //         ? (row.style.display = "table-row")
    //         : (row.style.display = "none");
    //     });
    //   });
    // }
    // end search
  }
}

// getMatches(partidos);
