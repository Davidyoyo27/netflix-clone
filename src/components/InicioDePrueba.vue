<template>
  <p>este es el inicio de prueba</p>
  <p>este es el inicio de prueba</p>
  <p>este es el inicio de prueba</p>
  <p>este es el inicio de prueba</p>
  <p>este es el inicio de prueba</p>
  <p>este es el inicio de prueba</p>
  <p>este es el inicio de prueba</p>
  <p>este es el inicio de prueba</p>
  <div v-if="!flagPromiseData">
    <componenteCarrusel :title="title1" :arrayData="dataResp1"></componenteCarrusel>
    <componenteCarrusel :title="title2" :arrayData="dataResp2"></componenteCarrusel>
    <componenteCarrusel :title="title3" :arrayData="dataResp3"></componenteCarrusel>
    <componenteCarrusel :title="title4" :arrayData="dataResp4"></componenteCarrusel>
    <componenteCarrusel :title="title5" :arrayData="dataResp5"></componenteCarrusel>
    <componenteCarrusel :title="title6" :arrayData="dataResp6"></componenteCarrusel>
    <componenteCarrusel :title="title7" :arrayData="dataResp7"></componenteCarrusel>
    <componenteCarrusel :title="title8" :arrayData="dataResp8"></componenteCarrusel>
    <componenteCarrusel :title="title9" :arrayData="dataResp9"></componenteCarrusel>
    <componenteCarrusel :title="title10" :arrayData="dataResp10"></componenteCarrusel>
    <componenteCarrusel :title="title11" :arrayData="dataResp11"></componenteCarrusel>
    <componenteCarrusel :title="title12" :arrayData="dataResp12"></componenteCarrusel>
    <componenteCarrusel :title="title13" :arrayData="dataResp13"></componenteCarrusel>
    <componenteCarrusel :title="title14" :arrayData="dataResp14"></componenteCarrusel>
    <componenteCarrusel :title="title15" :arrayData="dataResp15"></componenteCarrusel>
    <componenteCarrusel :title="title16" :arrayData="dataResp16"></componenteCarrusel>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import componenteCarrusel from "@/components/categoria_peliculas/ComponenteCarruselPeliculas";
import services from "@/helpers/services/services";
import { numMin } from "@/helpers/js/variables.js";
import { getPageRandom } from "@/helpers/js/functions.js";
import { getDateMovieReleaseLastYear } from "@/helpers/js/functions";

export default {
  components: {
    componenteCarrusel,
  },
  setup() {
    const flagPromiseData = ref(true);
    // titulos de carrusels
    const title1 = ref("Series emocionantes aclamadas por la crítica");
    const title2 = ref("Sugerencias de hoy");
    const title3 = ref("Series de suspenso");
    const title4 = ref("Películas de anime");
    const title5 = ref("Películas de Hollywood para reír");
    const title6 = ref("Ciencia Ficción y Fantasía imaginativa de acción");
    const title7 = ref("Lanzamientos del último año");
    const title8 = ref("Proximos estrenos");
    const title9 = ref("Películas de animación");
    const title10 = ref("Películas de acción");
    const title11 = ref("Películas documentales");
    const title12 = ref("Películas documentales de EEUU");
    const title13 = ref("Películas sobre crimenes");
    const title14 = ref("Películas de romance");
    const title15 = ref("Películas de misterio");
    const title16 = ref("Películas de música");
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

    // consultamos la cantidad de paginas maxima por endpoint puesto que cada uno es diferente
    onMounted(async () => {
      const response = await Promise.all([
        services.get_movie_services(getPageRandom(10, numMin),'/tv/top_rated?&language=es-MX'),
        services.get_movie_services(getPageRandom(10, numMin),'/tv/popular?&language=es-MX'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/tv?&language=es-MX&sort_by=popularity.desc&with_genres=9648&primary_release_date.gte=2000'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&language=es-MX&with_genres=16&with_keywords=210024|287501&primary_release_date.gte=2000'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=35&language=es-MX&without_genres=16&primary_release_date.gte=2010'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=14 | 878&language=es-MX&without_keywords=210024&primary_release_date.gte=2010&without_genres=16|27'),
        services.get_movie_services(getPageRandom(10, numMin),`/discover/movie?&sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&language=es-MX&primary_release_date.gte=${getDateMovieReleaseLastYear()}`),
        services.get_movie_services(getPageRandom(10, numMin),'/movie/upcoming?&language=es-MX'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=16&language=es-MX&without_keywords=210024&primary_release_date.gte=2010'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=28&language=es-MX&primary_release_date.gte=2000'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=99&language=es-MX&primary_release_date.gte=2000'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&language=es-MX&sort_by=popularity.desc&primary_release_year=2020&with_original_language=au|ca|gb|ie|nz|us'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=80&language=es-MX&primary_release_date.gte=2000'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=10749&language=es-MX&without_genres=16&primary_release_date.gte=2010'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=9648&language=es-MX&without_genres=27&primary_release_date.gte=2010'),
        services.get_movie_services(getPageRandom(10, numMin),'/discover/movie?&with_genres=10402&language=es-MX&primary_release_date.gte=2010'),
      ]);
      console.log("response", response);
      //                                                      () encapsular todo el objeto con el parentesis es lo mismo que usar el return
      // dataResp6.value = response[0].data.results.filter((item) =>({poster_path: item.poster_path, name: item.name}));
      // tomamos la respuesta del servicio de response y 
      dataResp1.value = response[0].data.results.filter((item) => item.poster_path !== null).map((item) => { return { poster_path: item.poster_path, name: item.name }; });      
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

      flagPromiseData.value = false;
    });

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
    };
  },
};
</script>

<style>
</style>