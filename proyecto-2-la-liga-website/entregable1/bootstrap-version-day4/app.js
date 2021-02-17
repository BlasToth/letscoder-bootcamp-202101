const partidos = matchesData.matches;
const radioButtons = document.getElementsByName("filter");

const ganados = partidos.filter(partidos => partidos.score.winner === "HOME_TEAM");

const perdidos = partidos.filter(partidos => partidos.score.winner === "AWAY_TEAM");

const empatados = partidos.filter(partidos => partidos.score.winner === "DRAW");

const arrayOfFilters = [partidos, ganados, perdidos, empatados];


function getMatches(partidos) {
  let tbody = document.querySelector(".partidos-body");
  
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
      `
    }
    
    let tdVisitante = document.createElement("td"); // awayTeam -3.
    tdVisitante.innerText = partidos[i].awayTeam.name;
    tdVisitante.style.textAlign = "right";
    
    tr.append(tdLocal); // append td to tr
    tr.append(tdResult);
    tr.append(tdVisitante);
    tbody.append(tr); // append  tr to tbody
    
    // TO DO
    // filter by name, radiobuttons
    // search
    
    const searchInput = document.getElementById("search");
    const rows = document.querySelectorAll("tbody tr");
    
    searchInput.addEventListener('keyup', function(event) {
      const q = event.target.value.toLowerCase();
        rows.forEach(row => {
          row.querySelector('td').textContent.toLowerCase().startsWith(q) ? (row.style.display = "table-row") : (row.style.display = "none");
        })
      });
      
      // end search
      
    }
  }


//   radioButtons[0].addEventListener('click', () => {
//     radioButtons[0].checked="checked";
//       getMatches(partidos);
//   })
//   radioButtons[1].addEventListener('click', () => {
//     radioButtons[1].checked="checked";
//       getMatches(ganados);
//   })

//   radioButtons[2].addEventListener('click', () => {
//     radioButtons[2].checked="checked";
//     getMatches(perdidos);
// })

//   radioButtons[3].addEventListener('click', () => {
//     radioButtons[3].checked="checked";
//     getMatches(empatados);
// })

for (let k = 0; k < radioButtons.length; k++) {
  radioButtons[k].addEventListener('click', () => {
      getMatches(arrayOfFilters[k])
      
  });

}


// radioButtons[1].addEventListener('click', () => {
//   getMatches(arrayOfFilters[1])
    
// });

// radioButtons[2].addEventListener('click', () => {
//   getMatches(arrayOfFilters[2])
    
// });

// radioButtons[3].addEventListener('click', () => {
//   getMatches(arrayOfFilters[3])
    
// });

