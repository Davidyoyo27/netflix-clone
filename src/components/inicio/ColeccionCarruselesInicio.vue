<template>
  <!-- una vez que la data esta lista se muestran los componentes (carruseles peliculas) -->
  <div v-if="!flagPromiseData">
    <!-- los numeros solo representan la variable y su orden de creacion -->
    <!-- NO SU ORDEN O POSICION a la hora de mostrar cada componente de peliculas/series -->

    <!-- Series emocionantes aclamadas por la crítica -->
    <CarruselPelicula :title="title1" :arrayData="dataResp1"></CarruselPelicula>
    <!-- Sugerencias de hoy -->
    <CarruselPelicula :title="title2" :arrayData="dataResp2"></CarruselPelicula>
    <!-- Series de suspenso -->
    <CarruselPelicula :title="title3" :arrayData="dataResp3"></CarruselPelicula>
    <!-- Películas de anime -->
    <CarruselPelicula :title="title4" :arrayData="dataResp4"></CarruselPelicula>
    <!-- Películas de Hollywood para reír -->
    <CarruselPelicula :title="title5" :arrayData="dataResp5"></CarruselPelicula>
    <!-- Series anime shonen -->
    <CarruselPelicula :title="title26" :arrayData="dataResp26"></CarruselPelicula>
    <!-- Ciencia Ficción y Fantasía imaginativa de acción -->
    <CarruselPelicula :title="title6" :arrayData="dataResp6"></CarruselPelicula>
    <!-- Lanzamientos del último año -->
    <CarruselPelicula :title="title7" :arrayData="dataResp7"></CarruselPelicula>
    <!-- Las 10 películas más populares en Chile hoy -->
    <CarruselTop10 :title="titleTopMovie" :arrayData="dataResp43"></CarruselTop10>
    <!-- Proximos estrenos -->
    <CarruselPelicula :title="title8" :arrayData="dataResp8"></CarruselPelicula>
    <!-- Telenovelas -->
    <CarruselPelicula :title="title34" :arrayData="dataResp34"></CarruselPelicula>
    <!-- Películas de animación -->
    <CarruselPelicula :title="title9" :arrayData="dataResp9"></CarruselPelicula>
    <!-- Películas de acción -->
    <CarruselPelicula :title="title10" :arrayData="dataResp10"></CarruselPelicula>
    <!-- Series anime comedia -->
    <CarruselPelicula :title="title27" :arrayData="dataResp27"></CarruselPelicula>
    <!-- Películas documentales -->
    <CarruselPelicula :title="title11" :arrayData="dataResp11"></CarruselPelicula>
    <!-- Series anime de crimen -->
    <CarruselPelicula :title="title28" :arrayData="dataResp28"></CarruselPelicula>
    <!-- Películas documentales de EEUU -->
    <CarruselPelicula :title="title12" :arrayData="dataResp12"></CarruselPelicula>
    <!-- Películas de romance -->
    <CarruselPelicula :title="title14" :arrayData="dataResp14"></CarruselPelicula>
    <!-- Series anime de drama -->
    <CarruselPelicula :title="title29" :arrayData="dataResp29"></CarruselPelicula>
    <!-- TV infantil y familiar -->
    <CarruselPelicula :title="title35" :arrayData="dataResp35"></CarruselPelicula>
    <!-- Películas de misterio -->
    <CarruselPelicula :title="title15" :arrayData="dataResp15"></CarruselPelicula>
    <!-- Series de Sci-Fi y Fantasía -->
    <CarruselPelicula :title="title33" :arrayData="dataResp33"></CarruselPelicula>
    <!-- Películas de música -->
    <CarruselPelicula :title="title16" :arrayData="dataResp16"></CarruselPelicula>
    <!-- Las 10 series más populares en Chile hoy -->
    <CarruselTop10 :title="titleTopSerie" :arrayData="dataResp44"></CarruselTop10>
    <!-- Películas de terror -->
    <CarruselPelicula :title="title17" :arrayData="dataResp17"></CarruselPelicula>
    <!-- Series anime de misterio -->
    <CarruselPelicula :title="title30" :arrayData="dataResp30"></CarruselPelicula>
    <!-- Series anime de sci-fi y fantasía -->
    <CarruselPelicula :title="title31" :arrayData="dataResp31"></CarruselPelicula>
    <!-- Películas de historia -->
    <CarruselPelicula :title="title18" :arrayData="dataResp18"></CarruselPelicula>
    <!-- Películas sobre crimenes -->
    <CarruselPelicula :title="title13" :arrayData="dataResp13"></CarruselPelicula>
    <!-- Series de guerra y politica -->
    <CarruselPelicula :title="title42" :arrayData="dataResp42"></CarruselPelicula>
    <!-- Películas para ver en familia -->
    <CarruselPelicula :title="title19" :arrayData="dataResp19"></CarruselPelicula>
    <!-- Películas de drama -->
    <CarruselPelicula :title="title20" :arrayData="dataResp20"></CarruselPelicula>
    <!-- Series de crimen -->
    <CarruselPelicula :title="title39" :arrayData="dataResp39"></CarruselPelicula>
    <!-- Películas de anime romanticas -->
    <CarruselPelicula :title="title21" :arrayData="dataResp21"></CarruselPelicula>
    <!-- Series documentales -->
    <CarruselPelicula :title="title40" :arrayData="dataResp40"></CarruselPelicula>
    <!-- Películas de TV -->
    <CarruselPelicula :title="title22" :arrayData="dataResp22"></CarruselPelicula>
    <!-- Películas de suspenso -->
    <CarruselPelicula :title="title23" :arrayData="dataResp23"></CarruselPelicula>
    <!-- Series occidentales de acción y aventura -->
    <CarruselPelicula :title="title37" :arrayData="dataResp37"></CarruselPelicula>
    <!-- Series anime japonesas -->
    <CarruselPelicula :title="title32" :arrayData="dataResp32"></CarruselPelicula>
    <!-- Películas occidentales -->
    <CarruselPelicula :title="title25" :arrayData="dataResp25"></CarruselPelicula>
    <!-- Series de comedia -->
    <CarruselPelicula :title="title38" :arrayData="dataResp38"></CarruselPelicula>
    <!-- Películas belicas/guerra -->
    <CarruselPelicula :title="title24" :arrayData="dataResp24"></CarruselPelicula>
    <!-- Series de misterio -->
    <CarruselPelicula :title="title41" :arrayData="dataResp41"></CarruselPelicula>
    <!-- Series de animacion occidental -->
    <CarruselPelicula :title="title36" :arrayData="dataResp36"></CarruselPelicula>  
    <!-- Series románticas -->
    <CarruselPelicula :title="title45" :arrayData="dataResp45"></CarruselPelicula>  
  </div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { getDataServicesMovies } from '@/helpers/js/functions';

export default {
  components: {
    // LazyLoad: al realizar el import del componente dentro del defineAsyncComponent() ya no es necesario que este el import del mismo mas arriba,
    // puesto que este lo reemplaza
    CarruselPelicula: defineAsyncComponent( /* webpackChunkName: "carrusel_de_peliculas.vue" */ () => import("@/components/carrusel_peliculas/CarruselPelicula")),
    CarruselTop10: defineAsyncComponent( /* webpackChunkName: "carrusel_top_10.vue" */ () => import("@/components/carrusel_peliculas/CarruselTop10")),
  },
  setup() {
    // bandera para mostrar u ocultar los carruseles
    const flagPromiseData = ref(true);
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
    const title45 = ref("Series románticas");
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
    const dataResp45 = ref(null);

    // consultamos la cantidad de paginas maxima por endpoint puesto que cada uno es diferente
    onMounted(async () => {
      // recibimos la data que viene desde la funcion en el archivo externo
      const response = await getDataServicesMovies();
      // asignamos cada valor a una variable dependiendo de la posicion en la que se encuentra cada data el array
      dataResp1.value = response[0];
      dataResp2.value = response[1];
      dataResp3.value = response[2];
      dataResp4.value = response[3];
      dataResp5.value = response[4];
      dataResp6.value = response[5];
      dataResp7.value = response[6];
      dataResp8.value = response[7];
      dataResp9.value = response[8];
      dataResp10.value = response[9];
      dataResp11.value = response[10];
      dataResp12.value = response[11];
      dataResp13.value = response[12];
      dataResp14.value = response[13];
      dataResp15.value = response[14];
      dataResp16.value = response[15];
      dataResp17.value = response[16];
      dataResp18.value = response[17];
      dataResp19.value = response[18];
      dataResp20.value = response[19];
      dataResp21.value = response[20];
      dataResp22.value = response[21];
      dataResp23.value = response[22];
      dataResp24.value = response[23];
      dataResp25.value = response[24];
      dataResp26.value = response[25];
      dataResp27.value = response[26];
      dataResp28.value = response[27];
      dataResp29.value = response[28];
      dataResp30.value = response[29];
      dataResp31.value = response[30];
      dataResp32.value = response[31];
      dataResp33.value = response[32];
      dataResp34.value = response[33];
      dataResp35.value = response[34];
      dataResp36.value = response[35];
      dataResp37.value = response[36];
      dataResp38.value = response[37];
      dataResp39.value = response[38];
      dataResp40.value = response[39];
      dataResp41.value = response[40];
      dataResp42.value = response[41];
      dataResp43.value = response[42];
      dataResp44.value = response[43];
      dataResp45.value = response[44];
      // cambiamos el estado de la bandera a false, esto representa que la data si llego al componente padre
      // y que esta fue asignada a cada variable segun corresponda
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
      title45,
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
      dataResp45,
    };
  },
};
</script>