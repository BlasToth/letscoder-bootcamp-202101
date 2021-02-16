const partidos = matchesData.matches;

function countStats(partidos) {
    let statistics = [];
    

    for (let i = 0; i < partidos.length; i++) {
        if (partidos[i].status !== "FINISHED") continue;

       let homeTeamFound;
       let awayTeamFound;

       for (let j = 0; j < statistics.length; j++) { // statistics.length is going to increase from 0 to 20

            if (statistics[j].id === partidos[i].homeTeam.id) {  // if the ids are the same, the array is being populated
                homeTeamFound = statistics[j];
            }
            if (statistics[j].id === partidos[i].awayTeam.id) {
                awayTeamFound = statistics[j];
            }
        }

        // console.log(partidos[i].homeTeam.name, homeTeamFound);
        // console.log(partidos[i].awayTeam.name, awayTeamFound);

        if (homeTeamFound == undefined){ // if there is no team, it will be added
          //  console.log("add new HOME team")
            statistics.push({
                id: partidos[i].homeTeam.id,
                name: partidos[i].homeTeam.name,
                numberOfGoalsTotal: partidos[i].score.fullTime.homeTeam,
                matches: 1
            });
        }
        else {  // otherwise modification is needed only
          //  console.log("modify existing HOME team")
            homeTeamFound.matches++;
            homeTeamFound.numberOfGoalsTotal += partidos[i].score.fullTime.homeTeam;
        }    

        if (awayTeamFound == undefined){ // if there is no team, it will be added
          //  console.log("add new AWAY team")
            statistics.push({
                id: partidos[i].awayTeam.id,
                name: partidos[i].awayTeam.name,
                numberOfGoalsTotal: partidos[i].score.fullTime.awayTeam,
                matches: 1
            });
        }
        else {  // otherwise modification is needed only
           // console.log("modify existing AWAY team")
            awayTeamFound.matches++;
            awayTeamFound.numberOfGoalsTotal += partidos[i].score.fullTime.awayTeam;
        }    
    }

    for (let k = 0; k < statistics.length; k++) {
        let average = statistics[k].numberOfGoalsTotal / statistics[k].matches;
        let newObject = {
            avg: average
        };
        Object.assign(statistics[k], newObject);
    }
   
    console.table(statistics);

    // create the table to show top5

    function createTop5Table() {
        let theadTop5 = document.querySelector(".thead");
        let tbodyTop5 = document.querySelector(".top-5-body");
        let trTop5Head = document.createElement("tr");
        const headerArray = ["Posición", "Club", "Avg", "PJ", "GT"];
        
        // Sort obj by average desc
        let statObj = statistics.sort(((a, b) => b.avg - a.avg));
        let top5Team = [];

        for (let k = 0; k < 5; k++) {
            top5Team.push(statObj[k]);
        }
        
        for (let j = 0; j < headerArray.length; j++) {
            let th = document.createElement("th");
            
            th.innerText = headerArray[j];
            
            if ( j === 1) {
                th.style.textAlign = "center";
            } else {
                th.style.textAlign = "left";
            }
            
            theadTop5.append(trTop5Head);
            trTop5Head.append(th);
        }
        
        for (let i = 0; i < top5Team.length; i++) {
            
            const crests = "https://crests.football-data.org/" + statistics[i].id + ".svg";
            

            let trTop5 = document.createElement("tr");

                let tdIndex = document.createElement("td");
                tdIndex.innerText = i + 1;

                let tdTop5Name = document.createElement("td");
                tdTop5Name.innerHTML = `
                    <span>
                        ${statistics[i].name}
                    </span>
                    <span>
                        <img src="${crests}" alt="${statistics[i].name}" width="40px" title="${statistics[i].name}">
                    </span>
                `
                tdTop5Name.style.textAlign = "center";

                let tdTop5GoalAverage = document.createElement("td");
                tdTop5GoalAverage.innerText = statistics[i].avg.toFixed(3);
                tdTop5GoalAverage.style.fontWeight = "bold";

                let tdTop5MatchesPlayed = document.createElement("td");
                tdTop5MatchesPlayed.innerText = statistics[i].matches;

                let tdTop5NumberofGoals = document.createElement("td");
                tdTop5NumberofGoals.innerText = statistics[i].numberOfGoalsTotal;
                
    
            trTop5.append(tdIndex);
            trTop5.append(tdTop5Name);
            trTop5.append(tdTop5GoalAverage);
            trTop5.append(tdTop5MatchesPlayed);
            trTop5.append(tdTop5NumberofGoals);

    
            tbodyTop5.append(trTop5);

        }
    }

    createTop5Table(statistics);

}

countStats(partidos);

// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos

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
