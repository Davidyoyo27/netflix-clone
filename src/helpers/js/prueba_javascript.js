// importacion de los servicios contenedores de los endpoints
import services from "../services/services";

// variables inicializadas con la cantidad max de paginas por endpoint
export let cantPagesMax1 = 0;
export let cantPagesMax2 = 0;
export let cantPagesMax3 = 0;

// Promesa que retornara la cantidad de paginas maxima que contenga cada endpoint
// series emocionantes
function consultaEndpoint1() {
  return new Promise((resolve, reject) => {
    services.serie_top_rated()
      .then((resp) => {
        let valorX = resp.data.total_pages;
        // si la cantidad de paginas exceden las 500 se aplicara la siguiente condicion
        // si es mayor a 500 valorX sera de 500 por el contrario si es menor a 500 ese sera el valor de valorX
        valorX > 500 ? (valorX = 500) : (valorX = valorX);
        resolve(valorX); // Resuelve el Promise con el valor obtenido
      })
      .catch((error) => {
        reject(error); // Rechaza el Promise con el error obtenido
      });
  });
}

consultaEndpoint1()
  .then((valorResultado) => {
    // pasamos el valor del resultado a una variable para que esta sea exportada al componente
    cantPagesMax1 = valorResultado;
  })
  .catch((error) => {
    throw error.message; // Maneja cualquier error que pueda ocurrir
  });

// Sugerencias de hoy
function consultaEndpoint2() {
  return new Promise((resolve, reject) => {
    services.serie_popular()
      .then((resp) => {
        let valorX = resp.data.total_pages;
        // si la cantidad de paginas exceden las 500 se aplicara la siguiente condicion
        // si es mayor a 500 valorX sera de 500 por el contrario si es menor a 500 ese sera el valor de valorX
        valorX > 500 ? (valorX = 500) : (valorX = valorX);
        resolve(valorX); // Resuelve el Promise con el valor obtenido
      })
      .catch((error) => {
        reject(error); // Rechaza el Promise con el error obtenido
      });
  });
}

consultaEndpoint2()
  .then((valorResultado) => {
    // pasamos el valor del resultado a una variable para que esta sea exportada al componente
    cantPagesMax2 = valorResultado;
  })
  .catch((error) => {
    throw error.message; // Maneja cualquier error que pueda ocurrir
  });


// Sugerencias de hoy
function consultaEndpoint3() {
  return new Promise((resolve, reject) => {
    services.serie_suspense()
      .then((resp) => {
        let valorX = resp.data.total_pages;
        // si la cantidad de paginas exceden las 500 se aplicara la siguiente condicion
        // si es mayor a 500 valorX sera de 500 por el contrario si es menor a 500 ese sera el valor de valorX
        valorX > 500 ? (valorX = 500) : (valorX = valorX);
        resolve(valorX); // Resuelve el Promise con el valor obtenido
      })
      .catch((error) => {
        reject(error); // Rechaza el Promise con el error obtenido
      });
  });
}

consultaEndpoint3()
  .then((valorResultado) => {
    // pasamos el valor del resultado a una variable para que esta sea exportada al componente
    cantPagesMax3 = valorResultado;
  })
  .catch((error) => {
    throw error.message; // Maneja cualquier error que pueda ocurrir
  });
