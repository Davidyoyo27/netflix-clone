import services from "../services/services";
import { numMin } from "@/helpers/js/variables.js";

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

// funcion que obtiene la fecha de año anterior para pasarsela al endpoint
function getDateMovieReleaseLastYear() {
  const date = new Date();
  const dateYear = date.getFullYear() - 1;
  return dateYear;
}

// funcion que toma los endpoints para extraer los datos necesarios para enviarlos al componente EmbedVideoPlayer
// y crear el video del inicio de la aplicacion
async function getDataMovie() {
  try {
    // tomamos el endpoint para extraer los datos de una pelicula extraida de una pagina al azar
    const response = await services.get_movie_services(getPageRandom(500, numMin),"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&language=es-ES");
    // si la peticion no es exitosa se mostrara el error
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    } else {
      // si es exitosa la peticion pasamos los datos a una variable
      let resp = response.data.results;
      // pasamos el array a un .filter() ya que este contiene elementos con el poster_path en null, asi que para que no muestre una
      // imagen vacia en el carrusel se quitaran estos elementos con null
      let dataArray = resp.filter((item) => {
        // retornamos todos los elementos que contengan datos en el poster_path, esto es lo mismo que decir
        // return item.poster_path != null que serian todos los elementos que no tengan datos null
        return item.backdrop_path;
      });
      // tomamos los resultados del filter y usamos el .sort(getNumberRandom) para mezclar el array y tener un elemento aleatorio
      const dataSorted = dataArray.sort(getNumberRandom);
      // capturamos el primer elemento del array el cual es el id de la pelicula
      const movieId = dataSorted[0].id;
      // poster o imagen de fondo de la pelicula
      const movieBackdropKey = dataSorted[0].backdrop_path;
      // titulo de la pelicula
      const movieTitle = dataSorted[0].title;
      // sinopsis de la pelicula
      const movieOverview = dataSorted[0].overview;

      // utilizamos el Promise.all([]) para pasarle un array con los servicios a consultar, esto para realizar de una vez
      // y no por separado mas de una consulta a un endpoint
      const responsePromise = await Promise.all([
        // endpoint que contiene la key del trailer de la pelicula
        services.get_data_movie_video_start(`/movie/${movieId}/videos?sort_by=popularity.desc`),
        // endpoint que contiene la certificacion de la pelicula
        services.get_data_movie_video_start(`/movie/${movieId}/release_dates?`),
      ]);

      // pasamos el resultado de la peticion a la variable
      const resultServiceOne = responsePromise[0].data.results;
      // variable que contendra la key del trailer
      let keyTrailer;

      // usamos Array.isArray() para saber si la variable que se consulta es un arreglo
      // resultServiceOne.length > 0 es para verificar que el arreglo no este vacio
      if(Array.isArray(resultServiceOne) && resultServiceOne.length > 0){
        // si se cumple la condicion pasamos el contenido de la key a la variable
        keyTrailer = responsePromise[0].data.results[0].key;
      }else{
        // en caso de que no exista una key o esta este vacio se enviara esa informacion a la variable
        keyTrailer = "No hay key del trailer";
      }

      // obtenemos la info de la certificacion(+18, 16, 14, etc.)
      const resultServiceTwo = responsePromise[1].data.results;
      // variable que contendra la certificacion
      let certification;

      if(Array.isArray(resultServiceTwo) && resultServiceTwo.length > 0){
        const respCertification = responsePromise[1].data.results[0].release_dates[0].certification;
        // si la key certification no esta vacia se envia a la variable "certification", en caso de que 
        // este vacia se enviara "Vacío" a la variable
        certification = (respCertification != '') ? respCertification : "Vacío";
      }

      // finalmente retornamos todas las variables con los datos de los endpoints para ser consumidos en el EmbedVideoPlayer
      // y generar el video en el inicio de la pagina de Netflix
      return [movieId, movieBackdropKey, movieTitle, movieOverview, keyTrailer, certification];
    }
  } catch (error) {
    throw error.message;
  }
}

export {
  getPageRandom,
  getNumberRandom,
  getDateMovieReleaseLastYear,
  getDataMovie,
};
