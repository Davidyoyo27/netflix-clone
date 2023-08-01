import services from "../services/services";
import { numMax500, numMax290, numMax200, numMax100, numMax40, numMax20, numMax10 } from "@/helpers/js/variables.js";

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

// funcion que corta el texto segun el maximo de palabras que se especifique
// a la funcion se le pasa como argumento 2 variables
// text: el texto a evaluar
// maxWords: cantidad maxima de palabras que se desea que el texto tenga
function cutText(text, maxWords) {
  // tomamos el texto y con el .split(" ") lo separamos por cada espacio
  // dando como resultado a cada palabra del texto separada en un array
  const words = text.split(" ");
  // variable donde se guardara el resultado final
  let textCuted;
  // si la cantidad de words es mayor a maxWords
  if (words.length > maxWords) {
    // usamos el metodo .slice() para asignarle un inicio(0) y donde este terminara (maxWords)
    // y finalmente usamos el .join(" ") para unir las palabras y separandola por espacio
    textCuted = words.slice(0, maxWords).join(" ");
  }

  // retornamos el texto final con un ...
  return textCuted + "...";
}

// creamos la funcion para convertir la duracion del video que viene en la API de Youtube
// desde el formato ISO 8601 a segundos
function convertDurationToSeconds(duration) {
  // usamos el .match() para devolver las coindidencias en una cadena de texto con una expresion regular, 
  // en este caso la cadena debe comenzar con "PT", seguido de un numero opcional de digitos con la letra "H"(horas),
  // luego un numero opcional de digitos con la letra "M"(minutos), y finalmente un numero opcional de digitos con la letra "S"(segundos)
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  // evaluamos el match[1] para convertirlo en un numero entero con el parseInt, si no encuentra ninguna hora
  // match[1] arrojara "undefined", para evitar esto usamos el operador logico || para asignar 0 en caso de que
  // match[1] sea "undefined" o no sea un numero valido
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  // retornamos el valor final haciendo la conversion de horas y minutos a segundos
  // 1 hora = 3600 segundos
  // 1 minuto = 60 segundos
  // para ello solo multiplicamos la variable por el valor numerico correspondiente
  // luego se suma todo para retornar el valor final en segundos
  return hours * 3600 + minutes * 60 + seconds;
}

// funcion que toma los endpoints para extraer los datos necesarios para enviarlos al componente ComponenteVideoInicio.vue
// y crear el video del inicio de la aplicacion
async function getDataMovieStartVideo() {
  try {
    // tomamos el endpoint para extraer los datos de una pelicula extraida de una pagina al azar
    const response = await services.get_movie_services(getPageRandom(500, 1), "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&language=es-ES");
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
      // usamos el .split(' ') para separar el texto de la sinopsis por cada espacio que tenga y obtener la cantidad de palabras que contiene
      const wordsOfOverview = dataSorted[0].overview.split(' ');

      let movieOverview;
      // evaluamos si la sinopsis posee mas de 50 palabras
      if (wordsOfOverview.length > 50) {
        // si es asi la pasamos a la funcion para cortarla y solo guardar las primeras 50 palabras
        movieOverview = cutText(dataSorted[0].overview, 50);
      } else {
        // en caso de que la sinopsis tenga menos de 50 palabras se guarda eso
        movieOverview = dataSorted[0].overview;
      }

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
      if (Array.isArray(resultServiceOne) && resultServiceOne.length > 0) {
        // si se cumple la condicion pasamos el contenido de la key a la variable
        keyTrailer = responsePromise[0].data.results[0].key;
      } else {
        // en caso de que no exista una key o esta este vacio se enviara esa informacion a la variable
        keyTrailer = "No hay key del trailer";
      }

      // obtenemos la info de la certificacion(+18, 16, 14, etc.)
      const resultServiceTwo = responsePromise[1].data.results;
      // variable que contendra la certificacion
      let certification;

      if (Array.isArray(resultServiceTwo) && resultServiceTwo.length > 0) {
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

// funcion que consulta a los distintos endpoints para obtener la data que sera enviada al componente CarruselPelicula.vue
async function getDataServicesMovies() {
  // utilizamos el Promise.all([]) al cual le pasaremos todos los endpoints, que en este caso seria el mismo endpoint con sus respectivos filtros
  // que apuntan a un endpoint diferente segun el tipo de pelicula/serie al cual se desea acceder, el resultado final seria todas las peticiones de 
  // estos servicios en un array que se almacenarian en la variable response
  const response = await Promise.all([
    // cant paginas max
    // 144
    services.get_movie_services(getPageRandom(numMax100, 1), '/tv/top_rated?language=es-MX'),
    // 7504
    services.get_movie_services(getPageRandom(numMax500, 1), '/tv/popular?language=es-MX'),
    // 239
    services.get_movie_services(getPageRandom(numMax200, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=9648&primary_release_date.gte=2000'),
    // 56
    services.get_movie_services(getPageRandom(numMax40, 1), '/discover/movie?language=es-MX&with_genres=16&with_keywords=210024|287501&primary_release_date.gte=2000'),
    // 2176
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=35&language=es-MX&without_genres=16&primary_release_date.gte=2010'),
    // 574
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=14 | 878&language=es-MX&without_keywords=210024&primary_release_date.gte=2010&without_genres=16|27'),
    // 12
    services.get_movie_services(getPageRandom(numMax10, 1), `/discover/movie?sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&language=es-MX&primary_release_date.gte=${getDateMovieReleaseLastYear()}`),
    // 12
    services.get_movie_services(getPageRandom(numMax10, 1), '/movie/upcoming?language=es-MX'),
    // 945
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=16&language=es-MX&without_keywords=210024&primary_release_date.gte=2010'),
    // 957
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=28&language=es-MX&primary_release_date.gte=2000'),
    // 4727
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=99&language=es-MX&primary_release_date.gte=2000'),
    // 3
    services.get_movie_services(getPageRandom(3, 1), '/discover/movie?language=es-MX&sort_by=popularity.desc&primary_release_year=2020&with_original_language=au|ca|gb|ie|nz|us'),
    // 666
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=80&language=es-MX&primary_release_date.gte=2000'),
    // 909
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=10749&language=es-MX&without_genres=16&primary_release_date.gte=2010'),
    // 296
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/movie?with_genres=9648&language=es-MX&without_genres=27&primary_release_date.gte=2010'),
    // 734
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=10402&language=es-MX&primary_release_date.gte=2010'),
    // 1131
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=27&language=es-MX&primary_release_date.gte=2010'),
    // 301
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/movie?with_genres=36&language=es-MX&primary_release_date.gte=2010'),
    // 453
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/movie?with_genres=10751&language=es-MX&primary_release_date.gte=2010'),
    // 4013
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=18&language=es-MX&primary_release_date.gte=2010'),
    // 6
    services.get_movie_services(getPageRandom(6, 1), '/discover/movie?with_genres=10749&language=es-MX&with_keywords=210024&primary_release_date.gte=2010'),
    // 1020
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=10770&language=es-MX'),
    // 1945
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/movie?with_genres=53&language=es-MX'),
    // 463
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/movie?with_genres=10752&language=es-MX'),
    // 46
    services.get_movie_services(getPageRandom(numMax40, 1), '/discover/movie?with_genres=37&language=es-MX&primary_release_date.gte=2010'),
    // 61
    services.get_movie_services(getPageRandom(numMax40, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10759&with_keywords=210024|287501'),
    // 50
    services.get_movie_services(getPageRandom(numMax40, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=35&with_keywords=210024|287501&without_genres=10759'),
    // 4
    services.get_movie_services(getPageRandom(4, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=80&with_keywords=210024|287501'),
    // 28
    services.get_movie_services(getPageRandom(numMax20, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=18&with_keywords=210024|287501&without_genres=10759'),
    // 12
    services.get_movie_services(getPageRandom(numMax10, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=9648&with_keywords=210024|287501'),
    // 25
    services.get_movie_services(getPageRandom(numMax20, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10765&with_keywords=210024|287501&without_genres=10759'),
    // 152
    services.get_movie_services(getPageRandom(numMax100, 1), '/discover/tv?language=es-MX&with_keywords=210024'),
    // 291
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10765'),
    // 20
    services.get_movie_services(getPageRandom(numMax20, 1), '/discover/tv?language=es-MX&with_keywords=199262'),
    // 9
    services.get_movie_services(getPageRandom(9, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10751|10762&with_keywords=210024|287501&primary_release_date.gte=2000'),
    // 300
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|16&without_genres=10759&without_keywords=210024'),
    // 290
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|10759&without_keywords=210024'),
    // 1018
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|35&without_keywords=210024'),
    // 316
    services.get_movie_services(getPageRandom(numMax290, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|80&without_genres=10765&without_keywords=210024'),
    // 901
    services.get_movie_services(getPageRandom(numMax500, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|99&without_genres=10765|18|10762|10751|16|10759|35|10767&without_keywords=210024'),
    // 243
    services.get_movie_services(getPageRandom(numMax200, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|9648&without_keywords=210024'),
    // 77
    services.get_movie_services(getPageRandom(numMax40, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10768&without_keywords=210024'),
    // 2
    services.get_movie_services(getPageRandom(2, 1), '/discover/movie?region=CL&language=es-MX&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=5000'),
    // 2
    services.get_movie_services(getPageRandom(2, 1), '/discover/tv?region=CL&language=es-MX&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=5000'),
  ]);

  // retornamos la data rescatada en la variable response a la funcion
  return response;
}

export {
  getPageRandom,
  getNumberRandom,
  getDateMovieReleaseLastYear,
  getDataMovieStartVideo,
  getDataServicesMovies,
  cutText,
  convertDurationToSeconds,
};
