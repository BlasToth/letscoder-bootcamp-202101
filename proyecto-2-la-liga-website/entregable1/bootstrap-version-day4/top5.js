const partidos = matchesData.matches;

// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos

let addNumberOfGoals = [];


function countStats(partidos) {
    let statistics = [];
    

    for (let i = 0; i < partidos.length; i++) {
        if (partidos[i].status !== "FINISHED") continue;

       let homeTeamFound;

       for (let j = 0; j < statistics.length; j++) {

            if (statistics[j].id === partidos[i].homeTeam.id) {
                homeTeamFound = statistics[j];
            }
        }

        console.log(partidos[i].homeTeam.name, homeTeamFound);

        if (homeTeamFound == undefined){
            console.log("add new team")
            statistics.push({
                id: partidos[i].homeTeam.id,
                name: partidos[i].homeTeam.name,
                numberOfGoalsTotal: partidos[i].score.fullTime.homeTeam,
                matches: 1
            });
        }
        else {
            console.log("modify existing team")
            homeTeamFound.matches++;
            homeTeamFound.numberOfGoalsTotal += partidos[i].score.fullTime.homeTeam;
        }   
        
    }
}

countStats(partidos);

// 1. Crear array vacía (será array de objetos)

// 2. Iterar por todos los partidos

// 3. Condición: si el partido no está acabado, no seguir y mirar siguiente partido

// 4. Buscar en la array estadisticas el objeto con el mismo id que el homeTeam del partido

// 5. Si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
// Rellenar cada key con el valor correspondiente

// 6. Si existe, actualizar los goles y los partidos

// 7. Hacer exactamente lo mismo a partir del punto 4, pero con awayTeam

// 8. Una vez fuera del loop de partidos, iterar por el array estadisticas

// 9. Añadir la key avg a cada objeto, con el valor goals/matches

// 10. Hacer console.log() para ver que todo está correcto.
