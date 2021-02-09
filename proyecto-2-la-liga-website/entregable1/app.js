// Montar funciones en JavaScript para crear
// distintas tablas dinámicamente utilizando los
// datos de los JSON.:
// Partidos de la temporada
// Clasificación de la temporada

// const table = document.createElement("table");

//     for (let i = 0; i < 10; i++) {
//         let tr = document.createElement('tr');
//         let td = document.createElement('td');
//         tr.appendChild(td);
//         table.appendChild(tr);
//     }
//     target.appendChild(table);

// function generateTableHead(table) {
//   let thead = table.createTHead();
// }

// let table = document.querySelector("table");
// generateTableHead(table);



let data = matchesData;
let partidos = matchesData.matches;

function getMatches(partidos) {
    console.log(partidos)
}
getMatches(partidos);
