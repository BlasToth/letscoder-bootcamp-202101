// Montar funciones en JavaScript para crear
// distintas tablas dinámicamente utilizando los
// datos de los JSON.:
// Partidos de la temporada
// Clasificación de la temporada

const partidos = matchesData.matches;

function getMatches(partidos) {
  let tbody = document.getElementById("tbody-partidos");

  for (let i = 0; i < partidos.length; i++) {

    let awayTeamID = partidos[i].awayTeam.id;
    let homeTeamID = partidos[i].homeTeam.id;

    let urlAwayTeam = "https://crests.football-data.org/" + awayTeamID + ".svg";
    let urlHomeTeam = "https://crests.football-data.org/" + homeTeamID + ".svg";

    let tr = document.createElement("tr"); // crear tr

    let tdLocal = document.createElement("td"); // crear 3 td
    tdLocal.innerText = partidos[i].homeTeam.name; // homeTeam - 1.

    let tdResult = document.createElement("td"); // resultado - 2. | 0 - 0 |
    if (partidos[i].score.fullTime.awayTeam === null) {
      tdResult.innerText = partidos[i].status;
      tdResult.classList.add("tdresult");
      tdResult.classList.add("red");
    } else {
       tdResult.classList.add("tdresult");

      // tdResult.setAttribute("class", "tdresult");

      // tdResult.style.textAlign = "center";

      tdResult.innerHTML = `
      <span><img src="${urlHomeTeam}" alt="PICS" width="40px"></span>
      <span>${partidos[i].score.fullTime.homeTeam}</span>
      <span>-<span>
      <span>${partidos[i].score.fullTime.awayTeam}</span>
      <span><img src="${urlAwayTeam}" alt="PICS" width="40px"></span>
      `
    }

    let tdVisitante = document.createElement("td"); // awayTeam -3.
    tdVisitante.innerText = partidos[i].awayTeam.name;

    tr.append(tdLocal); // append td to tr
    tr.append(tdResult);
    tr.append(tdVisitante);
    tbody.append(tr); // append  tr to tbody

  }
}

getMatches(partidos);


