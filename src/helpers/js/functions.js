import services from "../services/services";
// luego de instalar la libreria de crypto-js procedemos a importarla para su uso
// npm install crypto-js
import CryptoJS from "crypto-js";

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

// creamos una funcion que recibe por parametro la data a encriptar
function encryptData(dataToEncrypted) {
  // usamos la libreria para encriptar la data y le proporcionamos una "secretKey"
  // la cual se usara para encriptar la data usando dicha "secretKey"
  return CryptoJS.AES.encrypt(dataToEncrypted, process.env.VUE_APP_SECRET_KEY).toString();
}

// creamos una funcion que recibe por parametro la data a desencriptar
function decryptData(dataToDecrypted) {
  // usamos la libreria para desencriptar la data
  return CryptoJS.AES.decrypt(dataToDecrypted, process.env.VUE_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

// creamos una funcion que tendra los objetos que contendran la data necesaria para pasarse a cada uno de los links
// el combobox de las Series
// pageMax: Se pasa al componente y es la pagina maxima que contendra el endpoint a la hora de llamar al servicio
// titleName: Titulo que se pasa al componente y aparece cuando se accede a cada link en el combobox Generos
// endpointFilters: filtros del endpoint que se pasan al componente para tener el servicio completo
function dataEndpointByLinkSeries() {
  return [
    { pageMax: 7, titleName: "Series de acción y aventura", endpointFilters: "with_genres=10759&without_genres=16&without_keywords=210024" },
    { pageMax: 5, titleName: "Series de anime", endpointFilters: "with_keywords=210024&with_origin_country=JP" },
    { pageMax: 13, titleName: "TV asiática", endpointFilters: "with_origin_country=JP|KR&without_genres=16" },
    { pageMax: 8, titleName: "Series británicas", endpointFilters: "without_genres=16&with_original_language=en" },
    { pageMax: 1, titleName: "TV sobre ciencia y naturaleza", endpointFilters: "with_genres=99&with_keywords=221355|284176" },
    { pageMax: 11, titleName: "Series de comedia", endpointFilters: "with_genres=35&without_genres=16&with_original_language=en" },
    { pageMax: 10, titleName: "Contenido infantil", endpointFilters: "with_genres=10762" },
    { pageMax: 1, titleName: "Series de adolescentes", endpointFilters: "without_genres=16&with_keywords=9799|304976&with_original_language=ko|ja|en" },
    { pageMax: 8, titleName: "Series de EE.UU.", endpointFilters: "without_genres=37&with_origin_country=US" },
    { pageMax: 48, titleName: "Series dramáticas", endpointFilters: "with_genres=18&without_genres=16" },
    { pageMax: 1, titleName: "Especiales de stand up", endpointFilters: "with_keywords=9716" },
    { pageMax: 3, titleName: "Series latinoamericanas", endpointFilters: "without_genres=16&with_origin_country=MX" },
    { pageMax: 13, titleName: "Series de misterio", endpointFilters: "with_genres=9648" },
    { pageMax: 2, titleName: "Series policiales", endpointFilters: "without_genres=16&with_keywords=6149" },
    { pageMax: 12, titleName: "Reality shows, variedades y entrevistas", endpointFilters: "with_genres=10764&without_genres=16" },
    { pageMax: 7, titleName: "Series románticas", endpointFilters: "with_keywords=9840" },
    { pageMax: 11, titleName: "Series de sci-fi y fantasía", endpointFilters: "with_genres=10765&without_genres=10762&without_keywords=210024" },
    { pageMax: 18, titleName: "Series documentales", endpointFilters: "with_genres=99" },
    { pageMax: 1, titleName: "Telenovelas", endpointFilters: "with_genres=10766" },
    { pageMax: 1, titleName: "Series de terror", endpointFilters: "with_keywords=315058&without_keywords=210024" },
    { pageMax: 1, titleName: "Thrillers de TV", endpointFilters: "with_keywords=316362" },
  ];
}

// creamos la funcion asincrona que obtendra todas las peliculas
// se necesita pasarle por parametro el endpoint y la cantidad deseada de resultados que se retornen (20,50,100, etc.)
 async function totalTVMoviesVisualization (endpoint, quantityResults) {
  // pagina inicial que se pasara al endpoint
  let actualPage = 1;
  // variable que contendra la cantidad de elementos(peliculas) que evaluara el ciclo while
  let totalResult = 0;
  // llamamos nuevamente a la variable movies que esta inicializada arriba y la inicializamos como array vacio 
  // ya que de no ser asi se irian sumando las peliculas encontradas en una misma busqueda en el input y el punto
  // es que genere una nueva cantidad de elementos por busqueda unica
  let movies = [];

  // iniciamos el ciclo while el cual mientras totalResult sea menor a quantityResults este seguira ejecutandose
  while (totalResult < quantityResults) {
    // obtenemos la respuesta al servicio al cual se le pasan el numero de la pagina y el "query" el cual es la data del input
    const response = await services.get_movie_services(actualPage, endpoint);
    // desestructuramos para obtener la data de las variables results y total_pages
    const { results, total_pages } = response.data;

    // El método concat() se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array.
    // usamos el metodo concat para unir el array de results con los elementos que este contiene (peliculas) para ser almacenados en la variable
    // movies
    movies = movies.concat(results);
    // usamos results.length para saber el largo del array que contiene los resultados (results: 20 elementos) y por cada vuelta del while 
    // ser iran añadiendo 20 elementos hasta llegar al quantityResults(cantidad deseada) y esos resultados son los
    // que se almacenaran en totalResult, la cual sera evaluada en la condicion del while
    totalResult += results.length;

    // sumamos 1 a la pagina actual por cada vuelta del while
    actualPage += 1;

    // si la pagina actual es mayor a la cantidad de paginas "total_pages" entregada por el servicio tambien se detiene el ciclo
    if (actualPage > total_pages) {
      break;
    }
  }

  // finalmente usamos la variable movies que contiene todos los elementos(peliculas) para obtener con el .filter() todos los 
  // posters que existen en las peliculas
  let dataPosterMovie = movies.filter((item) => {
    return item.poster_path;
  });

  return dataPosterMovie;
};

// funcion que toma los endpoints para extraer los datos necesarios para enviarlos al componente ComponenteVideoInicio.vue
// y crear el video del inicio de la aplicacion
async function getDataMovieStartVideo() {
  try {
    // tomamos el endpoint para extraer los datos de una pelicula extraida de una pagina al azar
    const response = await services.get_movie_services(getPageRandom(162, 1), 
    "/discover/movie?language=es-MX&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL");
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
    services.get_movie_services(getPageRandom(100, 1), '/tv/top_rated?language=es-MX'),
    services.get_movie_services(getPageRandom(500, 1), '/tv/popular?language=es-MX'),
    services.get_movie_services(getPageRandom(14, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=9648&primary_release_date.gte=2000&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(3, 1), '/discover/movie?language=es-MX&with_genres=16&with_keywords=210024|287501&primary_release_date.gte=2000&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(60, 1), '/discover/movie?with_genres=35&language=es-MX&without_genres=16&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(10, 1), '/discover/movie?with_genres=14 | 878&language=es-MX&without_keywords=210024&primary_release_date.gte=2010&without_genres=16|27&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(3, 1), `/discover/movie?sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&language=es-MX&primary_release_date.gte=${getDateMovieReleaseLastYear()}&with_watch_providers=8&watch_region=CL`),
    services.get_movie_services(getPageRandom(10, 1), '/movie/upcoming?language=es-MX'),
    services.get_movie_services(getPageRandom(10, 1), '/discover/movie?with_genres=16&language=es-MX&without_keywords=210024&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(25, 1), '/discover/movie?with_genres=28&language=es-MX&primary_release_date.gte=2000&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(23, 1), '/discover/movie?with_genres=99&language=es-MX&primary_release_date.gte=2000&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(3, 1), '/discover/movie?language=es-MX&sort_by=popularity.desc&primary_release_year=2020&with_original_language=au|ca|gb|ie|nz|us'),
    services.get_movie_services(getPageRandom(18, 1), '/discover/movie?with_genres=80&language=es-MX&primary_release_date.gte=2000&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(24, 1), '/discover/movie?with_genres=10749&language=es-MX&without_genres=16&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(5, 1), '/discover/movie?with_genres=9648&language=es-MX&without_genres=27&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(8, 1), '/discover/movie?with_genres=10402&language=es-MX&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(10, 1), '/discover/movie?with_genres=27&language=es-MX&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(6, 1), '/discover/movie?with_genres=36&language=es-MX&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(14, 1), '/discover/movie?with_genres=10751&language=es-MX&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(58, 1), '/discover/movie?with_genres=18&language=es-MX&primary_release_date.gte=2010&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(6, 1), '/discover/movie?with_genres=10749&language=es-MX&with_keywords=210024&primary_release_date.gte=2010'),
    services.get_movie_services(getPageRandom(3, 1), '/discover/movie?language=es-MX&with_genres=10770&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(30, 1), '/discover/movie?with_watch_providers=8&watch_region=CL&with_genres=53&language=es-MX'),
    services.get_movie_services(getPageRandom(3, 1), '/discover/movie?with_watch_providers=8&watch_region=CL&with_genres=10752&language=es-MX'),
    services.get_movie_services(getPageRandom(1, 1), '/discover/movie?with_genres=37&language=es-MX&primary_release_date.gte=2010'),
    services.get_movie_services(getPageRandom(5, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10759&with_keywords=210024|287501&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(2, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=35&with_keywords=210024|287501&without_genres=10759&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(4, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=80&with_keywords=210024|287501'),
    services.get_movie_services(getPageRandom(2, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=18&with_keywords=210024|287501&without_genres=10759&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(2, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=9648&with_keywords=210024|287501&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(2, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10765&with_keywords=210024|287501&without_genres=10759&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(8, 1), '/discover/tv?with_watch_providers=8&watch_region=CL&language=es-MX&with_keywords=210024'),
    services.get_movie_services(getPageRandom(17, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10765&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(1, 1), '/discover/tv?with_watch_providers=8&watch_region=CL&language=es-MX&with_keywords=199262'),
    services.get_movie_services(getPageRandom(1, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10751|10762&with_keywords=210024|287501&primary_release_date.gte=2000&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(10, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|16&without_genres=10759&without_keywords=210024&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(12, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|10759&without_keywords=210024&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(28, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|35&without_keywords=210024&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(17, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|80&without_genres=10765&without_keywords=210024&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(18, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|99&without_genres=10765|18|10762|10751|16|10759|35|10767&without_keywords=210024&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(12, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|9648&without_keywords=210024&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(3, 1), '/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10768&without_keywords=210024&with_watch_providers=8&watch_region=CL'),
    services.get_movie_services(getPageRandom(2, 1), '/discover/movie?region=CL&language=es-MX&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=5000'),
    services.get_movie_services(getPageRandom(2, 1), '/discover/tv?region=CL&language=es-MX&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=5000'),
    services.get_movie_services(getPageRandom(5, 1), '/discover/tv?language=es-MX&first_air_date.gte=2010&with_keywords=9840&with_original_language=ko|ja&with_watch_providers=8&watch_region=CL'),
  ]);

  // tomamos la respuesta del servicio de response y 
  const dataSeriesEmocionantes = response[0].data.results
    // le pasamos un filter, esto ya que algunas imagenes del poster_path vienen vacias, osea null
    // por ende el filter retornara todos los items.poster_path que sean diferentes a null
    .filter((item) => item.poster_path !== null)
    // finalmente usamos el .map() para tomar esos elementos del array y crear un objeto para
    // pasarlo con las siguientes propiedades
    // {
    //   poster_path: link_imagen,
    //   name: nombre_imagen
    // }
    .map((item) => {
      // retornamos el objeto
      return { poster_path: item.poster_path, name: item.name };
    });
  const dataSugerenciasHoy = response[1].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesSuspenso = response[2].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasAnime = response[3].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasHollywood = response[4].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasFiccion = response[5].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasUltimoAnio = response[6].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasEstrenos = response[7].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasAnimacion = response[8].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasAccion = response[9].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasDocu = response[10].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasDocuEEUU = response[11].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasCrimen = response[12].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasRomance = response[13].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasMisterio = response[14].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasMusica = response[15].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasTerror = response[16].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasHistoria = response[17].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasFamilia = response[18].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasDrama = response[19].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasAnimeRom = response[20].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasTV = response[21].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasSuspenso = response[22].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasGuerra = response[23].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasOcciden = response[24].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimeShonen = response[25].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimeCom = response[26].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimeCrim = response[27].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimeDrama = response[28].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimeMist = response[29].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimeSciYFant = response[30].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimeJapo = response[31].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesSciYFant = response[32].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesTelenovelas = response[33].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesTVInfantil = response[34].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesAnimacionOcc = response[35].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesOccAccYAvent = response[36].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesComedia = response[37].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesCrimen = response[38].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesDocumentales = response[39].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesMisterio = response[40].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataSeriesGuerraYPolit = response[41].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
  const dataPeliculasTop10 = response[42].data.results.filter((item) => item.poster_path !== null).slice(0, 10)
    .map((item) => { return { poster_path: item.poster_path, name: item.title }; });
  const dataSeriesTop10 = response[43].data.results.filter((item) => item.poster_path !== null).slice(0, 10)
    .map((item) => { return { poster_path: item.poster_path, name: item.title }; });
  const dataSeriesRomance = response[44].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });

  // retornamos la data rescatada en la variable response a la funcion
  return [
    dataSeriesEmocionantes,
    dataSugerenciasHoy,
    dataSeriesSuspenso,
    dataPeliculasAnime,
    dataPeliculasHollywood,
    dataPeliculasFiccion,
    dataPeliculasUltimoAnio,
    dataPeliculasEstrenos,
    dataPeliculasAnimacion,
    dataPeliculasAccion,
    dataPeliculasDocu,
    dataPeliculasDocuEEUU,
    dataPeliculasCrimen,
    dataPeliculasRomance,
    dataPeliculasMisterio,
    dataPeliculasMusica,
    dataPeliculasTerror,
    dataPeliculasHistoria,
    dataPeliculasFamilia,
    dataPeliculasDrama,
    dataPeliculasAnimeRom,
    dataPeliculasTV,
    dataPeliculasSuspenso,
    dataPeliculasGuerra,
    dataPeliculasOcciden,
    dataSeriesAnimeShonen,
    dataSeriesAnimeCom,
    dataSeriesAnimeCrim,
    dataSeriesAnimeDrama,
    dataSeriesAnimeMist,
    dataSeriesAnimeSciYFant,
    dataSeriesAnimeJapo,
    dataSeriesSciYFant,
    dataSeriesTelenovelas,
    dataSeriesTVInfantil,
    dataSeriesAnimacionOcc,
    dataSeriesOccAccYAvent,
    dataSeriesComedia,
    dataSeriesCrimen,
    dataSeriesDocumentales,
    dataSeriesMisterio,
    dataSeriesGuerraYPolit,
    dataPeliculasTop10,
    dataSeriesTop10,
    dataSeriesRomance,
  ];
}

export {
  getPageRandom,
  getNumberRandom,
  getDateMovieReleaseLastYear,
  getDataMovieStartVideo,
  getDataServicesMovies,
  cutText,
  convertDurationToSeconds,
  encryptData,
  decryptData,
  dataEndpointByLinkSeries,
  totalTVMoviesVisualization,
};
