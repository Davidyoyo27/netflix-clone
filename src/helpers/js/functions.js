import services from "../services/services";
import { numMin } from "@/helpers/js/variables.js";
import { ref } from "vue";

// const idMovie = ref(null);

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
function getDateMovieReleaseLastYear(){
  const date = new Date();
  const dateYear = (date.getFullYear()) - 1;
  return dateYear;
}

async function getDataMovie(){
  // /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&language=es-ES
  // const response = await services.movie_info(getPageRandom(500, numMin));
  const response = await services.get_movie_services(getPageRandom(500, numMin), '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&language=es-ES');
  let resp = response.data.results;
  let dataArray = resp.filter((item) => {
    return item.backdrop_path;
  });
  const dataSorted = dataArray.sort(getNumberRandom);
  const movieId = dataSorted[0].id;
  const movieBackdropKey = dataSorted[0].backdrop_path;
  const movieTitle = dataSorted[0].title;
  const movieOverview = dataSorted[0].overview;
  console.log(dataSorted);
  console.log(movieId);
  console.log(movieBackdropKey);
  console.log(movieTitle);
  console.log(movieOverview);
  
  const response2 = await Promise.all([
    services.get_data_movie_video_start(getPageRandom(10, numMin),`/movie/${movieId}/videos?sort_by=popularity.desc`),
    services.get_data_movie_video_start(getPageRandom(10, numMin),`/movie/${movieId}/release_dates?`),
  ]);

  const movieKey = response2[0].data.results[0].key;
  let movieCertification = null;
  const movieCertValue = response2[1].data.results[0].release_dates[0].certification;
  (movieCertValue === '') ? movieCertification = 'Vacío' : movieCertification = movieCertValue;

  console.log(response2);
  console.log(movieKey);
  console.log(movieCertification);

  return [ movieId, movieBackdropKey, movieTitle, movieOverview, movieKey, movieCertification ];
}

export { getPageRandom, getNumberRandom, getDateMovieReleaseLastYear, getDataMovie }