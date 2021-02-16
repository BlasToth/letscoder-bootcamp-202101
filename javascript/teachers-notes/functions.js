
console.log(data.standings);


let standingsTotal = data.standings.find(clasificacion => {
    let condicion = clasificacion.type == "TOTAL";
    return condicion;
});

console.log(standingsTotal.table);


standingsTotal.table.forEach(equipo => {
    // console.log(i, equipo.team.name);
});



let nuevaArray = standingsTotal.table.map(equipo => {
    return {
        name: equipo.team.name,
        goles: equipo.goalsFor
    };
});

// console.log(nuevaArray);



let equiposMasGolesDiferencia = standingsTotal.table.filter(equipo => {
    return equipo.goalDifference > 10;
});

// console.log(equiposMasGolesDiferencia);


let golesTotalTemporada = standingsTotal.table.reduce((acc, { goalsFor }) => {
    return acc + goalsFor;
}, 0);

console.log(golesTotalTemporada);