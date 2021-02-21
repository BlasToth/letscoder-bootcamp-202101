

function countStats(partidos) {
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

  function createTop5Table() {
    let theadTop5 = document.querySelector(".thead-top-5-least");
    let tbodyTop5 = document.querySelector(".top-5-least-body");
    let trTop5Head = document.createElement("tr");
    const headerArray = ["Posición", "Club", "Goles recibidos como visitante"];

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

      theadTop5.append(trTop5Head);
      trTop5Head.append(th);
    }

    for (let i = 0; i < top5Team.length; i++) {
      const crests =
        "https://crests.football-data.org/" +
        statisticsLeastGoals[i].id +
        ".svg";

      let trTop5 = document.createElement("tr");

      let tdIndex = document.createElement("td");
      tdIndex.innerText = i + 1;

      let tdTop5Name = document.createElement("td");
      tdTop5Name.innerHTML = `
                    <span>
                        ${statisticsLeastGoals[i].name}
                    </span>
                    <span>
                        <img src="${crests}" alt="${statisticsLeastGoals[i].name}" width="40px" title="${statisticsLeastGoals[i].name}">
                    </span>
                `;
      tdTop5Name.style.textAlign = "center";

      let tdTop5NumberofGoals = document.createElement("td");
      tdTop5NumberofGoals.innerText =
        statisticsLeastGoals[i].numberOfGoalsTotal;
      tdTop5NumberofGoals.style.textAlign = "center";

      trTop5.append(tdIndex);
      trTop5.append(tdTop5Name);
      trTop5.append(tdTop5NumberofGoals);

      tbodyTop5.append(trTop5);
    }
  }

  createTop5Table(statisticsLeastGoals);
}

// countStats(partidos);
