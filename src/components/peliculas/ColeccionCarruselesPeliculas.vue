<template>
  <!-- una vez que la data esta lista se muestran los componentes (carruseles peliculas) -->
  <div v-if="!flagPromiseData">
    <!-- los numeros solo representan la variable y su orden de creacion -->
    <!-- NO SU ORDEN O POSICION a la hora de mostrar cada componente de peliculas/series -->    
    
    <!-- Películas de anime -->
    <CarruselPelicula :title="title1" :arrayData="dataResp1"></CarruselPelicula>
    <!-- Películas de hollywood para reír -->
    <CarruselPelicula :title="title2" :arrayData="dataResp2"></CarruselPelicula>
    <!-- Ciencia Ficción y Fantasía imaginativa de acción -->
    <CarruselPelicula :title="title3" :arrayData="dataResp3"></CarruselPelicula>
    <!-- Lanzamientos del último año -->
    <CarruselPelicula :title="title4" :arrayData="dataResp4"></CarruselPelicula>
    <!-- Las 10 películas más populares en Chile hoy -->
    <CarruselTop10 :title="title5" :arrayData="dataResp5"></CarruselTop10>
    <!-- Proximos estrenos -->
    <CarruselPelicula :title="title6" :arrayData="dataResp6"></CarruselPelicula>
    <!-- Películas de animación -->
    <CarruselPelicula :title="title7" :arrayData="dataResp7"></CarruselPelicula>
    <!-- Películas de acción -->
    <CarruselPelicula :title="title8" :arrayData="dataResp8"></CarruselPelicula>
    <!-- Películas documentales -->
    <CarruselPelicula :title="title9" :arrayData="dataResp9"></CarruselPelicula>
    <!-- Películas documentales de EEUU -->
    <CarruselPelicula :title="title10" :arrayData="dataResp10"></CarruselPelicula>
    <!-- Películas sobre crimenes -->
    <CarruselPelicula :title="title11" :arrayData="dataResp11"></CarruselPelicula>
    <!-- Películas de romance -->
    <CarruselPelicula :title="title12" :arrayData="dataResp12"></CarruselPelicula>
    <!-- Películas de misterio -->
    <CarruselPelicula :title="title13" :arrayData="dataResp13"></CarruselPelicula>
    <!-- Películas de música -->
    <CarruselPelicula :title="title14" :arrayData="dataResp14"></CarruselPelicula>
    <!-- Películas de terror -->
    <CarruselPelicula :title="title15" :arrayData="dataResp15"></CarruselPelicula>
    <!-- Películas de historia -->
    <CarruselPelicula :title="title16" :arrayData="dataResp16"></CarruselPelicula>
    <!-- Películas para ver en familia -->
    <CarruselPelicula :title="title17" :arrayData="dataResp17"></CarruselPelicula>
    <!-- Películas de drama -->
    <CarruselPelicula :title="title18" :arrayData="dataResp18"></CarruselPelicula>
    <!-- Películas de anime romanticas -->
    <CarruselPelicula :title="title19" :arrayData="dataResp19"></CarruselPelicula>
    <!-- Películas de TV -->
    <CarruselPelicula :title="title20" :arrayData="dataResp20"></CarruselPelicula>
    <!-- Películas de suspenso -->
    <CarruselPelicula :title="title21" :arrayData="dataResp21"></CarruselPelicula>
    <!-- Películas belicas/guerra -->
    <CarruselPelicula :title="title22" :arrayData="dataResp22"></CarruselPelicula>
    <!-- Películas occidentales -->
    <CarruselPelicula :title="title23" :arrayData="dataResp23"></CarruselPelicula>
  </div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { getDataServicesMovies } from "@/helpers/js/functions";

export default {
  components: {
    // LazyLoad: al realizar el import del componente dentro del defineAsyncComponent() ya no es necesario que este el import del mismo mas arriba,
    // puesto que este lo reemplaza
    CarruselPelicula: defineAsyncComponent(/* webpackChunkName: "CarruselPelicula.vue" */ () => import("@/components/carrusel_peliculas/CarruselPelicula")),
    CarruselTop10: defineAsyncComponent(/* webpackChunkName: "CarruselTop10.vue" */ () => import("@/components/carrusel_peliculas/CarruselTop10")),
  },
  setup() {
    // bandera para mostrar u ocultar los carruseles
    const flagPromiseData = ref(true);
    // titulos de carrusels
    const title1 = ref("Películas de anime");
    const title2 = ref("Películas de hollywood para reír");
    const title3 = ref("Ciencia Ficción y Fantasía imaginativa de acción");
    const title4 = ref("Lanzamientos del último año");
    const title5 = ref("Las 10 películas más populares en Chile hoy");
    const title6 = ref("Proximos estrenos");
    const title7 = ref("Películas de animación");
    const title8 = ref("Películas de acción");
    const title9 = ref("Películas documentales");
    const title10 = ref("Películas documentales de EEUU");
    const title11 = ref("Películas sobre crimenes");
    const title12 = ref("Películas de romance");
    const title13 = ref("Películas de misterio");
    const title14 = ref("Películas de música");
    const title15 = ref("Películas de terror");
    const title16 = ref("Películas de historia");
    const title17 = ref("Películas para ver en familia");
    const title18 = ref("Películas de drama");
    const title19 = ref("Películas de anime romanticas");
    const title20 = ref("Películas de TV");
    const title21 = ref("Películas de suspenso");
    const title22 = ref("Películas belicas/guerra");
    const title23 = ref("Películas occidentales");

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

    // consultamos la cantidad de paginas maxima por endpoint puesto que cada uno es diferente
    onMounted(async () => {
      // recibimos la data que viene desde la funcion en el archivo externo
      const response = await getDataServicesMovies();
      // asignamos cada valor a una variable dependiendo de la posicion en la que se encuentra cada data el array
      dataResp1.value = response[3];
      dataResp2.value = response[4];
      dataResp3.value = response[5];
      dataResp4.value = response[6];
      dataResp5.value = response[42];
      dataResp6.value = response[7];
      dataResp7.value = response[8];
      dataResp8.value = response[9];
      dataResp9.value = response[10];
      dataResp10.value = response[11];
      dataResp11.value = response[12];
      dataResp12.value = response[13];
      dataResp13.value = response[14];
      dataResp14.value = response[15];
      dataResp15.value = response[16];
      dataResp16.value = response[17];
      dataResp17.value = response[18];
      dataResp18.value = response[19];
      dataResp19.value = response[20];
      dataResp20.value = response[21];
      dataResp21.value = response[22];
      dataResp22.value = response[23];
      dataResp23.value = response[24];

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
    };
  },
};
</script>