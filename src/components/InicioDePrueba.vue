<template>
  <div class="container" v-if="!flagPromiseData">
    <!-- los numeros solo representan la variable y su orden de creacion -->
    <!-- NO SU ORDER O POSICION a la hora de mostrar cada componente de peliculas/series -->

    <!-- Series emocionantes aclamadas por la crítica -->
    <componenteCarrusel :title="title1" :arrayData="dataResp1"></componenteCarrusel>
    <!-- Sugerencias de hoy -->
    <componenteCarrusel :title="title2" :arrayData="dataResp2"></componenteCarrusel>
    <!-- Series de suspenso -->
    <componenteCarrusel :title="title3" :arrayData="dataResp3"></componenteCarrusel>
    <!-- Películas de anime -->
    <componenteCarrusel :title="title4" :arrayData="dataResp4"></componenteCarrusel>
    <!-- Películas de Hollywood para reír -->
    <componenteCarrusel :title="title5" :arrayData="dataResp5"></componenteCarrusel>
    <!-- Series anime shonen -->
    <componenteCarrusel :title="title26" :arrayData="dataResp26"></componenteCarrusel>
    <!-- Ciencia Ficción y Fantasía imaginativa de acción -->
    <componenteCarrusel :title="title6" :arrayData="dataResp6"></componenteCarrusel>
    <!-- Lanzamientos del último año -->
    <componenteCarrusel :title="title7" :arrayData="dataResp7"></componenteCarrusel>
    <!-- Las 10 películas más populares en Chile hoy -->
    <componenteCarruselTop10 :title="titleTopMovie" :arrayData="dataResp43"></componenteCarruselTop10>
    <!-- Proximos estrenos -->
    <componenteCarrusel :title="title8" :arrayData="dataResp8"></componenteCarrusel>
    <!-- Telenovelas -->
    <componenteCarrusel :title="title34" :arrayData="dataResp34"></componenteCarrusel>
    <!-- Películas de animación -->
    <componenteCarrusel :title="title9" :arrayData="dataResp9"></componenteCarrusel>
    <!-- Películas de acción -->
    <componenteCarrusel :title="title10" :arrayData="dataResp10"></componenteCarrusel>
    <!-- Series anime comedia -->
    <componenteCarrusel :title="title27" :arrayData="dataResp27"></componenteCarrusel>
    <!-- Películas documentales -->
    <componenteCarrusel :title="title11" :arrayData="dataResp11"></componenteCarrusel>
    <!-- Series anime de crimen -->
    <componenteCarrusel :title="title28" :arrayData="dataResp28"></componenteCarrusel>
    <!-- Películas documentales de EEUU -->
    <componenteCarrusel :title="title12" :arrayData="dataResp12"></componenteCarrusel>
    <!-- Películas de romance -->
    <componenteCarrusel :title="title14" :arrayData="dataResp14"></componenteCarrusel>
    <!-- Series anime de drama -->
    <componenteCarrusel :title="title29" :arrayData="dataResp29"></componenteCarrusel>
    <!-- TV infantil y familiar -->
    <componenteCarrusel :title="title35" :arrayData="dataResp35"></componenteCarrusel>
    <!-- Películas de misterio -->
    <componenteCarrusel :title="title15" :arrayData="dataResp15"></componenteCarrusel>
    <!-- Series de Sci-Fi y Fantasía -->
    <componenteCarrusel :title="title33" :arrayData="dataResp33"></componenteCarrusel>
    <!-- Películas de música -->
    <componenteCarrusel :title="title16" :arrayData="dataResp16"></componenteCarrusel>
    <!-- Las 10 series más populares en Chile hoy -->
    <componenteCarruselTop10 :title="titleTopSerie" :arrayData="dataResp44"></componenteCarruselTop10>
    <!-- Películas de terror -->
    <componenteCarrusel :title="title17" :arrayData="dataResp17"></componenteCarrusel>
    <!-- Series anime de misterio -->
    <componenteCarrusel :title="title30" :arrayData="dataResp30"></componenteCarrusel>
    <!-- Series anime de sci-fi y fantasía -->
    <componenteCarrusel :title="title31" :arrayData="dataResp31"></componenteCarrusel>
    <!-- Películas de historia -->
    <componenteCarrusel :title="title18" :arrayData="dataResp18"></componenteCarrusel>
    <!-- Películas sobre crimenes -->
    <componenteCarrusel :title="title13" :arrayData="dataResp13"></componenteCarrusel>
    <!-- Series de guerra y politica -->
    <componenteCarrusel :title="title42" :arrayData="dataResp42"></componenteCarrusel>
    <!-- Películas para ver en familia -->
    <componenteCarrusel :title="title19" :arrayData="dataResp19"></componenteCarrusel>
    <!-- Películas de drama -->
    <componenteCarrusel :title="title20" :arrayData="dataResp20"></componenteCarrusel>
    <!-- Series de crimen -->
    <componenteCarrusel :title="title39" :arrayData="dataResp39"></componenteCarrusel>
    <!-- Películas de anime romanticas -->
    <componenteCarrusel :title="title21" :arrayData="dataResp21"></componenteCarrusel>
    <!-- Series documentales -->
    <componenteCarrusel :title="title40" :arrayData="dataResp40"></componenteCarrusel>
    <!-- Películas de TV -->
    <componenteCarrusel :title="title22" :arrayData="dataResp22"></componenteCarrusel>
    <!-- Películas de suspenso -->
    <componenteCarrusel :title="title23" :arrayData="dataResp23"></componenteCarrusel>
    <!-- Series occidentales de acción y aventura -->
    <componenteCarrusel :title="title37" :arrayData="dataResp37"></componenteCarrusel>
    <!-- Series anime japonesas -->
    <componenteCarrusel :title="title32" :arrayData="dataResp32"></componenteCarrusel>
    <!-- Películas occidentales -->
    <componenteCarrusel :title="title25" :arrayData="dataResp25"></componenteCarrusel>
    <!-- Series de comedia -->
    <componenteCarrusel :title="title38" :arrayData="dataResp38"></componenteCarrusel>
    <!-- Películas belicas/guerra -->
    <componenteCarrusel :title="title24" :arrayData="dataResp24"></componenteCarrusel>
    <!-- Series de misterio -->
    <componenteCarrusel :title="title41" :arrayData="dataResp41"></componenteCarrusel>
    <!-- Series de animacion occidental -->
    <componenteCarrusel :title="title36" :arrayData="dataResp36"></componenteCarrusel>
  </div>
</template>

<script>
import { ref, onMounted, provide } from "vue";
import componenteCarrusel from "@/components/categoria_peliculas/ComponenteCarruselPeliculas";
import componenteCarruselTop10 from "@/components/categoria_peliculas/CarruselTop10"
import services from "@/helpers/services/services";
import { numMin, numMax500, numMax290, numMax200, numMax100, numMax40, numMax20, numMax10 } from "@/helpers/js/variables.js";
import { getPageRandom } from "@/helpers/js/functions.js";
import { getDateMovieReleaseLastYear } from "@/helpers/js/functions";

export default {
  components: {
    componenteCarrusel,
    componenteCarruselTop10,
  },
  setup() {
    const flagPromiseData = ref(true);
    const cantNumbersXComponents = ref(null);
    // titulos de carrusels
    const title1 = ref("Series emocionantes aclamadas por la crítica");
    const title2 = ref("Sugerencias de hoy");
    const title3 = ref("Series de suspenso");
    const title4 = ref("Películas de anime");
    const title5 = ref("Películas de Hollywood para reír");
    const title26 = ref("Series anime shonen");
    const title6 = ref("Ciencia Ficción y Fantasía imaginativa de acción");
    const title7 = ref("Lanzamientos del último año");
    const title8 = ref("Proximos estrenos");
    const title34 = ref("Telenovelas");
    const title9 = ref("Películas de animación");
    const title10 = ref("Películas de acción");
    const title27 = ref("Series anime comedia");
    const title11 = ref("Películas documentales");
    const title28 = ref("Series anime de crimen");
    const title12 = ref("Películas documentales de EEUU");
    const title14 = ref("Películas de romance");
    const title29 = ref("Series anime de drama");
    const title35 = ref("TV infantil y familiar");
    const title15 = ref("Películas de misterio");
    const title33 = ref("Series de Sci-Fi y Fantasía");
    const title16 = ref("Películas de música");
    const title17 = ref("Películas de terror");
    const title30 = ref("Series anime de misterio");
    const title31 = ref("Series anime de sci-fi y fantasía");
    const title18 = ref("Películas de historia");
    const title13 = ref("Películas sobre crimenes");
    const title42 = ref("Series de guerra y politica");
    const title19 = ref("Películas para ver en familia");
    const title20 = ref("Películas de drama");
    const title39 = ref("Series de crimen");
    const title21 = ref("Películas de anime romanticas");
    const title40 = ref("Series documentales");
    const title22 = ref("Películas de TV");
    const title23 = ref("Películas de suspenso");
    const title37 = ref("Series occidentales de acción y aventura");
    const title32 = ref("Series anime japonesas");
    const title25 = ref("Películas occidentales");
    const title38 = ref("Series de comedia");
    const title24 = ref("Películas belicas/guerra");
    const title41 = ref("Series de misterio");
    const title36 = ref("Series de animacion occidental");
    const titleTopMovie = ref("Las 10 películas más populares en Chile hoy");
    const titleTopSerie = ref("Las 10 series más populares en Chile hoy");
    // data con los elementos que contienen las peliculas que seran consumidos por el componente carrusel
    const dataResp1 = ref(null);
    const dataResp2 = ref(null);
    const dataResp3 = ref(null);
    const dataResp4 = ref(null);
    const dataResp5 = ref(null);
    const dataResp6 = ref(null);
    const dataResp7 = ref(null);
    const dataResp8 = ref(null);
    const dataResp9 = ref(null);
    const dataResp10 = ref(null);
    const dataResp11 = ref(null);
    const dataResp12 = ref(null);
    const dataResp13 = ref(null);
    const dataResp14 = ref(null);
    const dataResp15 = ref(null);
    const dataResp16 = ref(null);
    const dataResp17 = ref(null);
    const dataResp18 = ref(null);
    const dataResp19 = ref(null);
    const dataResp20 = ref(null);
    const dataResp21 = ref(null);
    const dataResp22 = ref(null);
    const dataResp23 = ref(null);
    const dataResp24 = ref(null);
    const dataResp25 = ref(null);
    const dataResp26 = ref(null);
    const dataResp27 = ref(null);
    const dataResp28 = ref(null);
    const dataResp29 = ref(null);
    const dataResp30 = ref(null);
    const dataResp31 = ref(null);
    const dataResp32 = ref(null);
    const dataResp33 = ref(null);
    const dataResp34 = ref(null);
    const dataResp35 = ref(null);
    const dataResp36 = ref(null);
    const dataResp37 = ref(null);
    const dataResp38 = ref(null);
    const dataResp39 = ref(null);
    const dataResp40 = ref(null);
    const dataResp41 = ref(null);
    const dataResp42 = ref(null);
    const dataResp43 = ref(null);
    const dataResp44 = ref(null);

    // "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&language=es-ES"
    // `/movie/${idSorted.value}/videos?sort_by=popularity.desc`
    // `/movie/${idSorted.value}/release_dates?`

    // consultamos la cantidad de paginas maxima por endpoint puesto que cada uno es diferente
    onMounted(async () => {
      const response = await Promise.all([
        // UNA VEZ COMPLETO LO DE LOS SERVICIOS VER LO DE LA SEPARACION DE ELLOS POR PAGINAS
        // cant paginas max
        // 144
        services.get_movie_services(getPageRandom(numMax100, numMin),'/tv/top_rated?language=es-MX'),
        // 7504
        services.get_movie_services(getPageRandom(numMax500, numMin),'/tv/popular?language=es-MX'),
        // 239
        services.get_movie_services(getPageRandom(numMax200, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=9648&primary_release_date.gte=2000'),
        // 56
        services.get_movie_services(getPageRandom(numMax40, numMin),'/discover/movie?language=es-MX&with_genres=16&with_keywords=210024|287501&primary_release_date.gte=2000'),
        // 2176
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=35&language=es-MX&without_genres=16&primary_release_date.gte=2010'),
        // 574
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=14 | 878&language=es-MX&without_keywords=210024&primary_release_date.gte=2010&without_genres=16|27'),
        // 12
        services.get_movie_services(getPageRandom(numMax10, numMin),`/discover/movie?sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&language=es-MX&primary_release_date.gte=${getDateMovieReleaseLastYear()}`),
        // 12
        services.get_movie_services(getPageRandom(numMax10, numMin),'/movie/upcoming?language=es-MX'),
        // 945
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=16&language=es-MX&without_keywords=210024&primary_release_date.gte=2010'),
        // 957
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=28&language=es-MX&primary_release_date.gte=2000'),
        // 4727
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=99&language=es-MX&primary_release_date.gte=2000'),
        // 3
        services.get_movie_services(getPageRandom(3, numMin),'/discover/movie?language=es-MX&sort_by=popularity.desc&primary_release_year=2020&with_original_language=au|ca|gb|ie|nz|us'),
        // 666
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=80&language=es-MX&primary_release_date.gte=2000'),
        // 909
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=10749&language=es-MX&without_genres=16&primary_release_date.gte=2010'),
        // 296
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/movie?with_genres=9648&language=es-MX&without_genres=27&primary_release_date.gte=2010'),
        // 734
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=10402&language=es-MX&primary_release_date.gte=2010'),
        // 1131
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=27&language=es-MX&primary_release_date.gte=2010'),
        // 301
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/movie?with_genres=36&language=es-MX&primary_release_date.gte=2010'),
        // 453
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/movie?with_genres=10751&language=es-MX&primary_release_date.gte=2010'),
        // 4013
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=18&language=es-MX&primary_release_date.gte=2010'),
        // 6
        services.get_movie_services(getPageRandom(6, numMin),'/discover/movie?with_genres=10749&language=es-MX&with_keywords=210024&primary_release_date.gte=2010'),
        // 1020
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=10770&language=es-MX'),
        // 1945
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/movie?with_genres=53&language=es-MX'),
        // 463
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/movie?with_genres=10752&language=es-MX'),
        // 46
        services.get_movie_services(getPageRandom(numMax40, numMin),'/discover/movie?with_genres=37&language=es-MX&primary_release_date.gte=2010'),
        // 61
        services.get_movie_services(getPageRandom(numMax40, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10759&with_keywords=210024|287501'),
        // 50
        services.get_movie_services(getPageRandom(numMax40, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=35&with_keywords=210024|287501&without_genres=10759'),
        // 4
        services.get_movie_services(getPageRandom(4, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=80&with_keywords=210024|287501'),
        // 28
        services.get_movie_services(getPageRandom(numMax20, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=18&with_keywords=210024|287501&without_genres=10759'),
        // 12
        services.get_movie_services(getPageRandom(numMax10, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=9648&with_keywords=210024|287501'),
        // 25
        services.get_movie_services(getPageRandom(numMax20, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10765&with_keywords=210024|287501&without_genres=10759'),
        // 152
        services.get_movie_services(getPageRandom(numMax100, numMin),'/discover/tv?language=es-MX&with_keywords=210024'),
        // 291
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10765'),
        // 20
        services.get_movie_services(getPageRandom(numMax20, numMin),'/discover/tv?language=es-MX&with_keywords=199262'),
        // 9
        services.get_movie_services(getPageRandom(9, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10751|10762&with_keywords=210024|287501&primary_release_date.gte=2000'),
        // 300
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|16&without_genres=10759&without_keywords=210024'),
        // 290
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|10759&without_keywords=210024'),
        // 1018
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|35&without_keywords=210024'),
        // 316
        services.get_movie_services(getPageRandom(numMax290, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|80&without_genres=10765&without_keywords=210024'),
        // 901
        services.get_movie_services(getPageRandom(numMax500, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|99&without_genres=10765|18|10762|10751|16|10759|35|10767&without_keywords=210024'),
        // 243
        services.get_movie_services(getPageRandom(numMax200, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=37|9648&without_keywords=210024'),
        // 77
        services.get_movie_services(getPageRandom(numMax40, numMin),'/discover/tv?language=es-MX&sort_by=popularity.desc&with_genres=10768&without_keywords=210024'),
        // 2
        services.get_movie_services(getPageRandom(2, numMin),'/discover/movie?region=CL&language=es-MX&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=5000'),
        // 2
        services.get_movie_services(getPageRandom(2, numMin),'/discover/tv?region=CL&language=es-MX&sort_by=popularity.desc&vote_average.gte=8&vote_count.gte=5000'),
      ]);

      // asignamos el valor del largo de la respuesta a las consultas para saber cuantas peticiones a distintos endpoints se hicieron
      // y por ende cuantos componentes de carruseles se generaron por ello
      cantNumbersXComponents.value = response.length;
      
      // tomamos la respuesta del servicio de response y 
      dataResp1.value = response[0].data.results
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
      dataResp2.value = response[1].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp3.value = response[2].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp4.value = response[3].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp5.value = response[4].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp6.value = response[5].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp7.value = response[6].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp8.value = response[7].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp9.value = response[8].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp10.value = response[9].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp11.value = response[10].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp12.value = response[11].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp13.value = response[12].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp14.value = response[13].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp15.value = response[14].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp16.value = response[15].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp17.value = response[16].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp18.value = response[17].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp19.value = response[18].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp20.value = response[19].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp21.value = response[20].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp22.value = response[21].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp23.value = response[22].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp24.value = response[23].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp25.value = response[24].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp26.value = response[25].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp27.value = response[26].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp28.value = response[27].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp29.value = response[28].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp30.value = response[29].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp31.value = response[30].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp32.value = response[31].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp33.value = response[32].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp34.value = response[33].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp35.value = response[34].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp36.value = response[35].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp37.value = response[36].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp38.value = response[37].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp39.value = response[38].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp40.value = response[39].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp41.value = response[40].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
      dataResp42.value = response[41].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });
      dataResp43.value = response[42].data.results.filter((item) => item.poster_path !== null).slice(0, 10)
      .map((item) => { return { poster_path: item.poster_path, name: item.title }; });
      dataResp44.value = response[43].data.results.filter((item) => item.poster_path !== null).slice(0, 10)
      .map((item) => { return { poster_path: item.poster_path, name: item.title }; });

      flagPromiseData.value = false;
    });

    // utilizamos el provide/inject para enviar variables hacia otro componente que no sea pasandolo como prop directamente al componente hijo
    // provide: Envio de la informacion (provee de la data a enviar)
    // inject: Recibe la informacion  (se injecta la data recibida)
    //      nombre de la data enviada
    //                                variable que contiene la data a enviar
    //                      IMPORTANTE: al enviar la data notar que no se debe usar el .value que se usa en el setup(), ya que esto genera un error
    // NOTA: no se necesita pasar al return la variable que se usara con provide
    provide('cantElementsNavigation', cantNumbersXComponents);

    return {
      flagPromiseData,
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
      title7,
      title8,
      title9,
      title10,
      title11,
      title12,
      title13,
      title14,
      title15,
      title16,
      title17,
      title18,
      title19,
      title20,
      title21,
      title22,
      title23,
      title24,
      title25,
      title26,
      title27,
      title28,
      title29,
      title30,
      title31,
      title32,
      title33,
      title34,
      title35,
      title36,
      title37,
      title38,
      title39,
      title40,
      title41,
      title42,
      titleTopMovie,
      titleTopSerie,
      dataResp1,
      dataResp2,
      dataResp3,
      dataResp4,
      dataResp5,
      dataResp6,
      dataResp7,
      dataResp8,
      dataResp9,
      dataResp10,
      dataResp11,
      dataResp12,
      dataResp13,
      dataResp14,
      dataResp15,
      dataResp16,
      dataResp17,
      dataResp18,
      dataResp19,
      dataResp20,
      dataResp21,
      dataResp22,
      dataResp23,
      dataResp24,
      dataResp25,
      dataResp26,
      dataResp27,
      dataResp28,
      dataResp29,
      dataResp30,
      dataResp31,
      dataResp32,
      dataResp33,
      dataResp34,
      dataResp35,
      dataResp36,
      dataResp37,
      dataResp38,
      dataResp39,
      dataResp40,
      dataResp41,
      dataResp42,
      dataResp43,
      dataResp44,
    };
  },
};
</script>

<style scoped>
</style>