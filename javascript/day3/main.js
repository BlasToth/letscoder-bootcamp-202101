// document.getElementById()
let div1 = document.getElementById("div1");

// document.getElementsByClassName(), document.getElementsByName()  (Array.from())
let genericDivs = document.getElementsByClassName("generic_div");;
let divs = document.getElementsByTagName("div");

for (let i = 0; i < genericDivs.length; i++) {
    // console.log(genericDivs[i]);
}


// document.querySelector(), document.querySelectorAll()
let query = document.querySelector(".generic_div");;

let queries = document.querySelectorAll(".generic_div");;



//element.innerHTML
let texto = div1.innerHTML;

div1.innerHTML = `nuevo div`;



// document.createElement()
let elemento = document.createElement("div");;




// element.addEventListener(,)
let boton = document.getElementById("boton_enviar");;

let contador = 0;
boton.addEventListener("click", function () {
    document.getElementById("div1").classList.toggle("red");
});;



// element.classList() add remove toggle



//element.style
div1.style.backgroundColor = "green";;




//element.setAttribute(,)
let image = document.createElement("img");

image.setAttribute("src", "https://crests.football-data.org/558.svg");
image.setAttribute("alt", "escudo equipo");
console.log(image);

div1.appendChild(image);


div1.setAttribute("class", "test");