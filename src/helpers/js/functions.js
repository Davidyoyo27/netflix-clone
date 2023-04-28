
// generamos un numero random entre una cantidad especifica
// max: 500, min: 1
// estos valores son la cantidad de paginas de la API
function getPageRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

// funcion para mezclar el array aleatoriamente con el sort
function getNumberRandom() {
  return 0.5 - Math.random();
}

export { getPageRandom, getNumberRandom }