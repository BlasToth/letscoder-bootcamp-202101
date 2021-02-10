// Montar funciones en JavaScript para crear
// distintas tablas dinámicamente utilizando los
// datos de los JSON.:
// Partidos de la temporada
// Clasificación de la temporada

const partidos = matchesData.matches;

function getMatches(partidos) {
  let tbody = document.getElementById("tbody-partidos");

  for (let i = 0; i < partidos.length; i++) {
    let tr = document.createElement("tr"); // crear tr

    let tdLocal = document.createElement("td"); // crear 3 td
    tdLocal.innerText = partidos[i].homeTeam.name; // homeTeam - 1.

    let tdResult = document.createElement("td"); // resultado - 2. | 0 - 0 |
    if (partidos[i].score.fullTime.awayTeam === null) {
      tdResult.innerText = partidos[i].status;
    } else {
      tdResult.innerText = `${partidos[i].score.fullTime.homeTeam} - ${partidos[i].score.fullTime.awayTeam}`;
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
