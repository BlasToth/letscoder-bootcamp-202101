console.log("1. Compara tu edad (o una cualquiera) con la de Fernando Simón. muestra en consola si eres menor, mayor o tienes la misma edad que él.")
//if()
let linea = "------------------------------------------";

let edadFernandoSimon = 57;
let miEdad = [15, 57, 120];
let miEdadRandom = miEdad[Math.floor(Math.random() * miEdad.length)];
let txt = "que Fernando Simón"

console.log(`Tengo ${miEdadRandom} años`);

if (miEdadRandom === edadFernandoSimon) console.log("Tengo la misma edad " + txt);
else if (miEdadRandom < edadFernandoSimon) console.log("Soy menor " + txt);
else if(miEdadRandom > edadFernandoSimon) console.log("Soy mayor " + txt);

console.log(linea);



console.log("2. Escribir el código de una función a la que se pasa como parámetro un número entero y devuelve como resultado una string que indica si el número es par o impar. Mostrar por pantalla el resultado devuelto por la función.")
//if(), %

function evenorodd(num) {
    if (num % 2 === 0) console.log("El número es par: " + num);
    if (num % 2 === 1) console.log("El número es impar: " + num);
}

evenorodd(42);
evenorodd(23);

console.log(linea);


console.log("3. recorre la array y muestra los valores múltiplos de 3 en consola");
//for(), if(), %
let numeros = [45, 2, 35, 12, 32, 45, 90, 12, 67, 87, 1, 46, 97, 49, 72, 17, 34, 2, 94, 28, 51, 31, 29, 18, 62, 2, 4, 13, 4, 98, 15, 75, 12, 43];
let multiplosDeTres = [];

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 3 === 0) {
        multiplosDeTres.push(numeros[i]);
    }
}
console.log(multiplosDeTres);

console.log(linea);

console.log("4. Dada la array, escribe una función que encuentre el número menor. (No utilizar Math.min())");
//for(), if()

let numeroMenor = numeros[0];

for (let i = 0; i < numeros.length; i++) {
    if (numeroMenor > numeros[i]) numeroMenor = numeros[i];
}

console.log(numeroMenor);

console.log(linea);

console.log("5. Utilizando la array anterior, encuentra el número más grande. (No utilizar Math.max())");
//for(), if()

let numeroMasGrande = numeros[0];

for (let i = 0; i < numeros.length; i++) {
    if (numeroMasGrande < numeros[i]) numeroMasGrande = numeros[i];
}

console.log(numeroMasGrande);

console.log(linea);

console.log("6. Utilizando la array anterior, encontrar los números que se repiten, guardarlos en una array (si aun no existen en esta) y mostrarlos en consola");
//for(), if(), push(), includes()

let numerosQueSeRepiten = [];

for (let i = 0; i < numeros.length; i++) {
    for (let j = i + 1; j < numeros.length; j++) {
        if (numeros[i] === numeros[j]) {
            if (!numerosQueSeRepiten.includes(numeros[i])) {
                numerosQueSeRepiten.push(numeros[i]);
            }
        }
    }
}

console.log(numerosQueSeRepiten);

console.log(linea);


console.log("7. Utilizando la array anterior, elimina los numeros pares");
//for(), if(), %, splice()

let nuevoArray = [];
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2) {
       nuevoArray.push(numeros[i]);
    }
}

console.log(linea);

console.log("8. Escribir un script que simule el lanzamiento de dos dados. Hacer uso de la función Math.random() para obtener números aleatorios 
//entre 1 y 6 para cada uno de los lanzamientos de los dados. Sumar el resultado de lanzar dos dados y anotar en un array el número de apariciones de dicha suma, 
//repitiendo 36.000 veces esta operación.");
//Math.random(), for(), push()

let arrayDeSumar = [];

function lanzarDados() {
    let dado1 = Math.floor(Math.random() * 6 ) +1;
    let dado2 = Math.floor(Math.random() * 6 ) +1;
    let sumar = dado1 + dado2;
    arrayDeSumar.push(sumar);
    // console.log(dado1, dado2);
    // console.log(arrayDeSumar);
}
for (let i = 0; i < 36000; i++) {
    lanzarDados();
}

console.log(linea);

console.log("9. Haz que el ejercicio anterior pase la array obtenida a la función de este ejercicio. Calcula el promedio de todos los lanzamientos de dados.");
//for()

let resultadoReduce;
let promedio;

for (let i = 0; i < arrayDeSumar.length; i++) {
    resultadoReduce = arrayDeSumar.reduce((a, b) => a + b, 0);
}
promedio = resultadoReduce / 36000;
console.log("el promedio de todos los lanzamientos de dados: " + promedio);

console.log(linea);

console.log("10. Haz una copia de la array del ejercicio 3, ordenala de forma ascendente, y coloca el siguiente número donde le corresponda.");
//Array.from(), sort(), splice(), for(), if()

let arrayCopiada = [...numeros];
let arrayAsc = [];

arrayAsc = arrayCopiada.sort((a, b) => a - b);
console.log(arrayAsc);

console.log(linea);

console.log("11. Dado el siguiente objeto, muestra en consola una string con el nombre y apellido.");

let mentor = {
    nombre: "Lluís",
    apellido: "Garcia",
    edad: 26,
    poblacion: "Sallent",
    empresa: "Let's Coder",
    hobbies: ["futbol", "codigo", "videojuegos"],
    mascotas: [{
        nombre: "Tuca",
        tipo: "perro",
        sexo: "hembra"
    },
    {
        nombre: "Tam",
        tipo: "perro",
        sexo: "macho"
    }]
};

console.log(`una string con el nombre y apellido:  ${mentor.nombre} ${mentor.apellido}`);

console.log(linea);

console.log("12. Dado el objecto anterior, crea una array con todas las keys y luego úsala para mostrar en consola todas las values");
//Object.keys(), for()

let keys = Object.keys(mentor);

for (let i = 0; i < keys.length; i++) {
    console.log(keys[i]);
}

console.log(linea);

//13. Dado el objeto anterior, añade las edades a las mascotas. Luego muestra cada una de las mascotas en consola por separado
let edadTuca = 4;
let edadTam = 2;