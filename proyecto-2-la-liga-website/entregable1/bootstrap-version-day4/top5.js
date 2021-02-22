getDataFetch();

function getDataFetch() {
    const url = "https://api.football-data.org/v2/competitions/2014/matches";
    fetch(url, {
        method: "GET",
        headers: {
            "X-Auth-Token": `${api_key}`
        }
    }).then(response => {
        if (response.ok) {
            console.log(response);
            return response.json();
        }
    }).then((data) => {
        let partidos = data.matches;
        countStats(partidos);
        countStats2(partidos);
        const spinnerWrapper = document.querySelector('.spinner-wrapper');
        spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    })
}

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
 
  createTop5Table(statistics);
}

function createTop5Table(statistics) {
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

function countStats2(partidos) {
  let statisticsLeastGoals = [];

  for (let i = 0; i < partidos.length; i++) {
    if (partidos[i].status !== "FINISHED") continue;

    let awayTeamFound;

    for (let j = 0; j < statisticsLeastGoals.length; j++) {
      // statisticsLeastGoals.length is going to increase from 0 to 20

      if (statisticsLeastGoals[j].id === partidos[i].awayTeam.id) {
        awayTeamFound = statisticsLeastGoals[j];
      }
    }

    if (awayTeamFound == undefined) {
      // if there is no team, it will be added
      statisticsLeastGoals.push({
        id: partidos[i].awayTeam.id,
        name: partidos[i].awayTeam.name,
        numberOfGoalsTotal: partidos[i].score.fullTime.awayTeam,
        matches: 1,
      });
    } else {
      // otherwise modification is needed only
      awayTeamFound.matches++;
      awayTeamFound.numberOfGoalsTotal += partidos[i].score.fullTime.awayTeam;
    }
  }

  // create the table to show top5 with the least goals

  createTop5Table2(statisticsLeastGoals);
}

function createTop5Table2(statisticsLeastGoals) {
  const headerArray = ["Posición", "Club", "Goles recibidos como visitante"];
  let theadTop5Least = document.querySelector(".thead-top-5-least");
  let tbodyTop5Least = document.querySelector(".top-5-least-body");
  let trTop5HeadLeast = document.createElement("tr");

  // Sort obj by average asc
  let statObj = statisticsLeastGoals.sort(
    (a, b) => a.numberOfGoalsTotal - b.numberOfGoalsTotal
  );
  let top5Team = [];

  for (let k = 0; k < 5; k++) {
    top5Team.push(statObj[k]);
  }

  for (let j = 0; j < headerArray.length; j++) {
    let th = document.createElement("th");

    th.innerText = headerArray[j];

    if (j === 1) {
      th.style.textAlign = "center";
    } else {
      th.style.textAlign = "left";
    }

    theadTop5Least.append(trTop5HeadLeast);
    trTop5HeadLeast.append(th);
  }

  for (let i = 0; i < top5Team.length; i++) {
    const crests =
      "https://crests.football-data.org/" +
      statisticsLeastGoals[i].id +
      ".svg";

    let trTop5Least = document.createElement("tr");

    let tdIndexLeast = document.createElement("td");
    tdIndexLeast.innerText = i + 1;

    let tdTop5NameLeast = document.createElement("td");
    tdTop5NameLeast.innerHTML = `
                  <span>
                      ${statisticsLeastGoals[i].name}
                  </span>
                  <span>
                      <img src="${crests}" alt="${statisticsLeastGoals[i].name}" width="40px" title="${statisticsLeastGoals[i].name}">
                  </span>
              `;
    tdTop5NameLeast.style.textAlign = "center";

    let tdTop5NumberofGoalsLeast = document.createElement("td");
    tdTop5NumberofGoalsLeast.innerText =
      statisticsLeastGoals[i].numberOfGoalsTotal;
    tdTop5NumberofGoalsLeast.style.textAlign = "center";

    trTop5Least.append(tdIndexLeast);
    trTop5Least.append(tdTop5NameLeast);
    trTop5Least.append(tdTop5NumberofGoalsLeast);

    tbodyTop5Least.append(trTop5Least);
  }
}


