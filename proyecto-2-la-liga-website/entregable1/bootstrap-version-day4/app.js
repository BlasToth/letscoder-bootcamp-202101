let searchedExpression;

// autocomplete 
var countries = ["Club Atlético de Madrid", "Real Madrid CF", "Sevilla FC", "FC Barcelona", "Real Sociedad de Fútbol", "Villarreal CF", "Real Betis Balompié", "Levante UD", "Granada CF", "Athletic Club"];


function autocomplete(inp, arr) {
    /*the autocomplete function takes 
    two arguments,
    the text field element and an array of possible 
    autocompleted values:*/
    var currentFocus;
    /*execute a 
    function when someone writes in the text field:*/
    
    inp.addEventListener("input", function(e) {
        
    var a, b, i, val = this.value;
        /*close any 
    already open lists of autocompleted values*/
        
    closeAllLists();
        if (!val) { return false;}
        
    currentFocus = -1;
        /*create a DIV element 
    that will contain the items (values):*/
        a = 
    document.createElement("DIV");
        
    a.setAttribute("id", this.id + "autocomplete-list");
        
    a.setAttribute("class", "autocomplete-items");
        
    /*append the DIV element as a child of the autocomplete container:*/
        
    this.parentNode.appendChild(a);
        /*for each 
    item in the array...*/
        for (i = 0; i < 
    arr.length; i++) {
          /*check if 
    the item starts with the same letters as the text field value:*/
          
    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
      console.log(val);
            
    /*create a DIV element for each matching element:*/
            
    b = document.createElement("DIV");
            
    /*make the matching letters bold:*/
            
    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            
    b.innerHTML += arr[i].substr(val.length);
            
    /*insert a input field that will hold the current array item's value:*/
            
    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            
    /*execute a function when someone clicks on the item value (DIV element):*/
                
    b.addEventListener("keyup", function(e) {
                
    /*insert the value for the autocomplete text field:*/
    inp.value = this.getElementsByTagName("input")[0].value;
    const insertedValue = inp.value; 
         console.log(insertedValue)   
    /*close the list of autocompleted values,
    
    (or any other open lists of autocompleted values:*/
      
      closeAllLists();
    });
            
    a.appendChild(b);
          }
        
    }
    });
    /*execute a function presses a key on the 
    keyboard:*/
    inp.addEventListener("keydown", function(e) {
        
    var x = document.getElementById(this.id + "autocomplete-list");
        
    if (x) x = x.getElementsByTagName("div");
        if 
    (e.keyCode == 40) {
          /*If the 
    arrow DOWN key is pressed,
          
    increase the currentFocus variable:*/
          
    currentFocus++;
          /*and and make 
    the current item more visible:*/
          
    addActive(x);
        } else if (e.keyCode == 38) { 
    //up
          /*If the arrow UP key is 
    pressed,
          decrease the 
    currentFocus variable:*/
          
    currentFocus--;
          /*and and make 
    the current item more visible:*/
          
    addActive(x);
        } else if (e.keyCode == 13) {
          
    /*If the ENTER key is pressed, prevent the form from being submitted,*/
          
    e.preventDefault();
          if (currentFocus 
    > -1) {
            /*and 
    simulate a click on the "active" item:*/
            
    if (x) x[currentFocus].click();
          
    }
        }
    });
    function 
    addActive(x) {
      /*a function to classify an item as 
    "active":*/
      if (!x) return false;
      
    /*start by removing the "active" class on all items:*/
      
    removeActive(x);
      if (currentFocus >= x.length) 
    currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length 
    - 1);
      /*add class "autocomplete-active":*/
      
    x[currentFocus].classList.add("autocomplete-active");
    }
    
    function removeActive(x) {
      /*a function to remove the 
    "active" class from all autocomplete items:*/
      for (var i 
    = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      
    }
    }
    function closeAllLists(elmnt) {
      
    /*close all autocomplete lists in the document,
      except 
    the one passed as an argument:*/
      var x = 
    document.getElementsByClassName("autocomplete-items");
      
    for (var i = 0; i < x.length; i++) {
        if (elmnt 
    != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      
    }
    }
  }
  /*execute a function when someone clicks in the document:*/
  
    document.addEventListener("click", function (e) {
      
    closeAllLists(e.target);
  });
  } 

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);
//autocomplete ends
// getDataFetch();

// // fetch start
// function getDataFetch() {
//   const url = "https://api.football-data.org/v2/competitions/2014/matches";
//   fetch(url, {
//       method: "GET",
//       headers: {
//           "X-Auth-Token": `${api_key}`
//       }
//   }).then(response => {
//       if (response.ok) {
//           console.log(response);
//           return response.json();
//       }
//   }).then((data) => {
//       let partidos = data.matches;
//       getMatches(partidos);
//       search(partidos);
//       // const spinnerWrapper = document.querySelector('.spinner-wrapper');
//       // spinnerWrapper.parentElement.removeChild(spinnerWrapper);
//   })
// }
// // fetch end


// function getMatches(partidos) {
//   let tbody = document.querySelector(".partidos-body");
//   tbody.innerHTML = "";

//   for (let i = 0; i < partidos.length; i++) {
//     let awayTeamID = partidos[i].awayTeam.id;
//     let homeTeamID = partidos[i].homeTeam.id;

//     let urlAwayTeam = "https://crests.football-data.org/" + awayTeamID + ".svg";
//     let urlHomeTeam = "https://crests.football-data.org/" + homeTeamID + ".svg";

//     let awayTeamName = partidos[i].awayTeam.name;
//     let homeTeamName = partidos[i].homeTeam.name;

//     let tr = document.createElement("tr"); // crear tr

//     let tdLocal = document.createElement("td"); // crear 3 td
//     tdLocal.innerText = partidos[i].homeTeam.name; // homeTeam - 1.

//     let tdResult = document.createElement("td"); // resultado - 2. | 0 - 0 |
//     if (partidos[i].score.fullTime.awayTeam === null) {
//       tdResult.innerText = partidos[i].status;
//       tdResult.classList.add("scheduled");
//     } else {
//       tdResult.style.textAlign = "center";
//       tdResult.innerHTML = `
//       <span><img src="${urlHomeTeam}" alt="${homeTeamName}" width="40px" title="${homeTeamName}"></span>
//       <span>${partidos[i].score.fullTime.homeTeam}</span>
//       <span>-<span>
//       <span>${partidos[i].score.fullTime.awayTeam}</span>
//       <span><img src="${urlAwayTeam}" alt="${awayTeamName}" width="40px" title="${awayTeamName}"></span>
//       `;
//     }

//     let tdVisitante = document.createElement("td"); // awayTeam -3.
//     tdVisitante.innerText = partidos[i].awayTeam.name;
//     tdVisitante.style.textAlign = "right";
    
//     tr.append(tdLocal); // append td to tr
//     tr.append(tdResult);
//     tr.append(tdVisitante);
//     tbody.append(tr); // append  tr to tbody
    
//   }
// }

// function callError(filterForName, todosLosPartidosPorNombre, ganados, perdidos, empatados, proximos) {
//   const inputs = document.getElementsByName("filter");
//   let tbody = document.querySelector(".partidos-body");
//   tbody.innerHTML = "";
//   let newP = document.createElement("p");
//   if (inputs[1].checked) {
//     newP.innerText = `Entre los partidos GANADOS no hay nada con la palabra: ${searchedExpression}`;
//   newP.style.textAlign = "center";
//   newP.style.color = "red";
//   newP.style.fontSize = "1.1em";
//   tbody.append(newP);
//   } else if (inputs[2].checked) {
//     newP.innerText = `Entre los partidos PERDIDOS no hay nada con la palabra: ${searchedExpression}`;
//     newP.style.textAlign = "center";
//     newP.style.color = "red";
//     newP.style.fontSize = "1.1em";
//     tbody.append(newP);
//   } else if (inputs[3].checked) {
//     newP.innerText = `Entre los partidos EMPATADOS no hay nada con la palabra: ${searchedExpression}`;
//     newP.style.textAlign = "center";
//     newP.style.color = "red";
//     newP.style.fontSize = "1.1em";
//     tbody.append(newP);
//   } else if (inputs[4].checked) {
//     newP.innerText = `Entre los partidos PRÓXIMOS no hay nada con la palabra: ${searchedExpression}`;
//     newP.style.textAlign = "center";
//     newP.style.color = "red";
//     newP.style.fontSize = "1.1em";
//     tbody.append(newP);
//   }
//    else {
//     newP.innerText = `No hemos encontrado nada con la palabra: ${searchedExpression}`
//     newP.style.textAlign = "center";
//     newP.style.color = "red";
//     newP.style.fontSize = "1.1em";
//     tbody.append(newP);
//   }
// }

// function search(partidos) {
//   const mySearchInput = document.getElementById("search");
//   const radioButtons = document.getElementsByName("filter");

//   mySearchInput.addEventListener('keyup', () => {
  
//     searchedExpression = mySearchInput.value;
  
//     const filterForName = partidos.filter(
//       (partido) => partido.awayTeam.name.toLowerCase().includes(searchedExpression) 
//                     ||
//                     partido.homeTeam.name.toLowerCase().includes(searchedExpression)
//     );

//     console.log(filterForName)
  
//     // getMatches(filterForName);
  
//     const todosLosPartidosPorNombre = filterForName.filter(
//       (match) => match.score.winner === "HOME_TEAM" || match.score.winner === "AWAY_TEAM" || match.score.winner === "DRAW" || match.status !== "FINISHED"
//     );
  
//     const ganados = filterForName.filter(
//       (match) => match.awayTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "AWAY_TEAM"
//                     ||
//                     match.homeTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "HOME_TEAM"
//     );
  
//     const perdidos = filterForName.filter(
//       (match) => match.awayTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "HOME_TEAM"
//                     ||
//                     match.homeTeam.name.toLowerCase().includes(searchedExpression) && match.score.winner === "AWAY_TEAM"
//     )
  
//     const empatados = filterForName.filter(
//       (match) => match.score.winner === "DRAW"
//     )
  
//     const proximos = filterForName.filter(
//       (match) => match.status !== "FINISHED"
//     )

//     const arrayOfFilters = [todosLosPartidosPorNombre, ganados, perdidos, empatados, proximos];
  
//     for (let k = 0; k < radioButtons.length; k++) {
//       radioButtons[k].addEventListener("click", () => {
//         // error message
//         if (filterForName.length < 1) {
//           callError(filterForName, todosLosPartidosPorNombre, ganados, perdidos, empatados, proximos);
//         } 
//         // end error message
//         else getMatches(arrayOfFilters[k]);
//       });
//     }
  
//   });
// }
