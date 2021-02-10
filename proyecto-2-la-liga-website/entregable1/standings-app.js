const tableData = standingsData.standings[0].table;
const tbodyStandings = document.getElementById("tbody-standings");

for (let i = 0; i < tableData.length; i++) {
    let clubName = tableData[i].team.name;
    let partidosJugados = tableData[0].playedGames;
    let victorias = tableData[i].won;
    let empates = tableData[i].draw;
    let derrotados = tableData[i].lost;
    let puntos = tableData[i].points;
    let golesAFavor = tableData[i].goalsFor;
    let golesEnContra = tableData[i].goalsAgainst;
    let diferenciaDeGoles = tableData[i].goalDifference;
    let ultimosCinco = tableData[i].form;

    let tr = document.createElement("tr");

    let tdClubName = document.createElement("td");
    tdClubName.innerText = clubName;
    let tdPartidosJugados = document.createElement("td");
    tdPartidosJugados.innerText = partidosJugados;
    let tdVictorias = document.createElement("td");
    tdVictorias.innerText = victorias;
    let tdEmpates = document.createElement("td");
    tdEmpates.innerText = empates;
    let tdDerrotados = document.createElement("td");
    tdDerrotados.innerText = derrotados;
    let tdPuntos = document.createElement("td");
    tdPuntos.innerText = puntos;
    tdPuntos.style.fontWeight = "bolder";
    let tdGolesAFavor = document.createElement("td");
    tdGolesAFavor.innerText = golesAFavor;
    let tdGolesEnContra = document.createElement("td");
    tdGolesEnContra.innerText = golesEnContra;
    let tdDiferenciaDeGoles = document.createElement("td");
    tdDiferenciaDeGoles.innerText = diferenciaDeGoles;
    let tdUltimosCinco = document.createElement("td");
    tdUltimosCinco.innerText = ultimosCinco;

    tr.append(tdClubName);
    tr.append(tdPartidosJugados);
    tr.append(tdVictorias);
    tr.append(tdEmpates);
    tr.append(tdDerrotados);
    tr.append(tdPuntos);
    tr.append(tdGolesAFavor);
    tr.append(tdGolesEnContra);
    tr.append(tdDiferenciaDeGoles);
    tr.append(tdUltimosCinco);

    tbodyStandings.append(tr);

}
