<template>
    <!-- una vez que la data esta lista se muestran los componentes (carruseles peliculas) -->
    <div v-if="!flagPromiseData">
      <!-- los numeros solo representan la variable y su orden de creacion -->
      <!-- NO SU ORDEN O POSICION a la hora de mostrar cada componente de peliculas/series -->
      
      <!-- Series emocionantes aclamadas por la crítica -->
      <CarruselPelicula :title="title1" :arrayData="dataResp1"></CarruselPelicula>
      <!-- Series de suspenso -->
      <CarruselPelicula :title="title2" :arrayData="dataResp2"></CarruselPelicula>
      <!-- Series anime shonen -->
      <CarruselPelicula :title="title3" :arrayData="dataResp3"></CarruselPelicula>
      <!-- Series de guerra y politica -->
      <CarruselPelicula :title="title18" :arrayData="dataResp18"></CarruselPelicula>
      <!-- Series anime de misterio -->
      <CarruselPelicula :title="title7" :arrayData="dataResp7"></CarruselPelicula>
      <!-- Series anime de crimen -->
      <CarruselPelicula :title="title5" :arrayData="dataResp5"></CarruselPelicula>
      <!-- Telenovelas -->
      <CarruselPelicula :title="title11" :arrayData="dataResp11"></CarruselPelicula>
      <!-- Series anime de sci-fi y fantasía -->
      <CarruselPelicula :title="title8" :arrayData="dataResp8"></CarruselPelicula>
      <!-- Las 10 series más populares en Chile hoy -->
      <CarruselTop10 :title="title19" :arrayData="dataResp19"></CarruselTop10>
      <!-- Series anime japonesas -->
      <CarruselPelicula :title="title9" :arrayData="dataResp9"></CarruselPelicula>
      <!-- Series de crimen -->
      <CarruselPelicula :title="title15" :arrayData="dataResp15"></CarruselPelicula>
      <!-- Series románticas -->
      <CarruselPelicula :title="title20" :arrayData="dataResp20"></CarruselPelicula>
      <!-- Series de Sci-Fi y Fantasía -->
      <CarruselPelicula :title="title10" :arrayData="dataResp10"></CarruselPelicula>
      <!-- Series anime de drama -->
      <CarruselPelicula :title="title6" :arrayData="dataResp6"></CarruselPelicula>
      <!-- Series documentales -->
      <CarruselPelicula :title="title16" :arrayData="dataResp16"></CarruselPelicula>
      <!-- Series anime comedia -->
      <CarruselPelicula :title="title4" :arrayData="dataResp4"></CarruselPelicula>
      <!-- TV infantil y familiar -->
      <CarruselPelicula :title="title12" :arrayData="dataResp12"></CarruselPelicula>
      <!-- Series de animacion occidental -->
      <CarruselPelicula :title="title13" :arrayData="dataResp13"></CarruselPelicula>
      <!-- Series de misterio -->
      <CarruselPelicula :title="title17" :arrayData="dataResp17"></CarruselPelicula>
      <!-- Series occidentales de acción y aventura -->
      <CarruselPelicula :title="title14" :arrayData="dataResp14"></CarruselPelicula>
    </div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { getDataServicesMovies } from "@/helpers/js/functions";

export default {
  components: {
    // LazyLoad: al realizar el import del componente dentro del defineAsyncComponent() ya no es necesario que este el import del mismo mas arriba,
    // puesto que este lo reemplaza
    CarruselPelicula: defineAsyncComponent(
      /* webpackChunkName: "CarruselPelicula.vue" */ () =>
        import("@/components/carrusel_peliculas/CarruselPelicula")
    ),
    CarruselTop10: defineAsyncComponent(
      /* webpackChunkName: "CarruselTop10.vue" */ () =>
        import("@/components/carrusel_peliculas/CarruselTop10")
    ),
  },
  setup() {
    // bandera para mostrar u ocultar los carruseles
    const flagPromiseData = ref(true);
    // titulos de carrusels
    const title1 = ref("Series emocionantes aclamadas por la crítica");
    const title2 = ref("Series de suspenso");
    const title3 = ref("Series anime shonen");
    const title4 = ref("Series anime comedia");
    const title5 = ref("Series anime de crimen");
    const title6 = ref("Series anime de drama");
    const title7 = ref("Series anime de misterio");
    const title8 = ref("Series anime de sci-fi y fantasía");
    const title9 = ref("Series anime japonesas");
    const title10 = ref("Series de Sci-Fi y Fantasía");
    const title11 = ref("Telenovelas");
    const title12 = ref("TV infantil y familiar");
    const title13 = ref("Series de animacion occidental");
    const title14 = ref("Series occidentales de acción y aventura");
    const title15 = ref("Series de crimen");
    const title16 = ref("Series documentales");
    const title17 = ref("Series de misterio");
    const title18 = ref("Series de guerra y politica");
    const title19 = ref("Las 10 series más populares en Chile hoy");
    const title20 = ref("Series románticas");

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

    // consultamos la cantidad de paginas maxima por endpoint puesto que cada uno es diferente
    onMounted(async () => {
      // recibimos la data que viene desde la funcion en el archivo externo
      const response = await getDataServicesMovies();
      // asignamos cada valor a una variable dependiendo de la posicion en la que se encuentra cada data el array
      dataResp1.value = response[0];
      dataResp2.value = response[2];
      dataResp3.value = response[25];
      dataResp4.value = response[26];
      dataResp5.value = response[27];
      dataResp6.value = response[28];
      dataResp7.value = response[29];
      dataResp8.value = response[30];
      dataResp9.value = response[31];
      dataResp10.value = response[32];
      dataResp11.value = response[33];
      dataResp12.value = response[34];
      dataResp13.value = response[35];
      dataResp14.value = response[36];
      dataResp15.value = response[38];
      dataResp16.value = response[39];
      dataResp17.value = response[40];
      dataResp18.value = response[41];
      dataResp19.value = response[43];
      dataResp20.value = response[44];

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
    };
  },
};
</script>