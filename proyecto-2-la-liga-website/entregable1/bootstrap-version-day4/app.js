const partidos = matchesData.matches;
const radioButtons = document.getElementsByName("filter");

// TODO filter for names first
  const mySearchInput = document.getElementById("search");
  const searchBtn = document.getElementById("searchBtn");
  let searchedExpression = [];

  searchBtn.addEventListener('click', function () {
    searchedExpression = mySearchInput.value;
   
    console.log(searchedExpression)

    
  })

// function getKeyWord(partidos) {
//   const mySearchInput = document.getElementById("search");
  
//   let filteredMatches = [];
//   mySearchInput.addEventListener("keyup", () => {
    
//     let filterForName = partidos.filter((matches) => {
//       if (!mySearchInput.value) {
//          console.log("I NEED DATA");
//       }
//       else if (matches.homeTeam.name.toLowerCase().includes(mySearchInput.value) ||
//           matches.awayTeam.name.toLowerCase().includes(mySearchInput.value)) {
//             return true
//       }
//       console.log(filterForName);
        
//     });
//   });
 
// }

// getKeyWord(partidos);

const ganados = partidos.filter(
  (partidos) => 
  partidos.score.winner === "HOME_TEAM" || partidos.score.winner === "AWAY_TEAM"
);


const perdidos = partidos.filter(
(partidos) => partidos.score.winner === "AWAY_TEAM"
);

const empatados = partidos.filter(
(partidos) => partidos.score.winner === "DRAW"
);
// filter for name ends

const arrayOfFilters = [partidos, ganados, perdidos, empatados];

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
    
    const searchInput = document.getElementById("search");
    
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



for (let k = 0; k < radioButtons.length; k++) {
  radioButtons[k].addEventListener("click", () => {
    getMatches(arrayOfFilters[k]);
  });
}

