<template>
  <div class="cont_carrusels" v-if="flagPromiseData">
    <CarruselPelicula :title="title1" :arrayData="dataResp1"></CarruselPelicula>
    <CarruselPelicula :title="title2" :arrayData="dataResp2"></CarruselPelicula>
    <CarruselTop10 :title="title3" :arrayData="dataResp3"></CarruselTop10>
    <CarruselPelicula :title="title4" :arrayData="dataResp4"></CarruselPelicula>
    <CarruselTop10 :title="title5" :arrayData="dataResp5"></CarruselTop10>
    <div class="cont_footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { getDataMoviePopularNews, getDataServicesMovies } from "@/helpers/js/functions";

export default {
  components: {
    CarruselPelicula: defineAsyncComponent(/* webpackChunkName: "CarruselPelicula.vue" */ () => import("@/components/carrusel_peliculas/CarruselPelicula")),
    CarruselTop10: defineAsyncComponent(/* webpackChunkName: "CarruselTop10.vue" */ () => import("@/components/carrusel_peliculas/CarruselTop10")),
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Footer.vue" */ "@/components/Footer")),
  },
  setup(){
    const flagPromiseData = ref(false);
    const title1 = ref("Lo nuevo en Netflix");
    const title2 = ref("Estrenos de este año");
    const title3 = ref("Las 10 series más populares en Chile hoy");
    const title4 = ref("Bien valen la espera");
    const title5 = ref("Las 10 películas más populares en Chile hoy");
    const dataResp1 = ref(null);
    const dataResp2 = ref(null);
    const dataResp3 = ref(null);
    const dataResp4 = ref(null);
    const dataResp5 = ref(null);

    onMounted(async () => {
      const dataMoviesCarrusel = await getDataMoviePopularNews();
      dataResp1.value = dataMoviesCarrusel[0];
      dataResp2.value = dataMoviesCarrusel[1];
      dataResp4.value = dataMoviesCarrusel[2];

      const dataMoviesTop10 = await getDataServicesMovies();
      dataResp3.value = dataMoviesTop10[42];
      dataResp5.value = dataMoviesTop10[43];

      flagPromiseData.value = true;
    });

    return{
      // NOTA IMPORTANTE: para que se vea la data que se manda a los carruseles hay que pasarle una bandera
      // para que esta no sea visible hasta que este todo listo, si no es de esta manera arroja un error
      // que la data que esta recibiendo el <CarrusePeliculas> es null, esto quiere decir que al estar listo el
      // componente antes de la data arroja el error de que la data no llega al componente
      flagPromiseData,
      title1,
      title2,
      title3,
      title4,
      title5,
      dataResp1,
      dataResp2,
      dataResp3,
      dataResp4,
      dataResp5,
    }
  }
}
</script>

<style scoped>
.cont_carrusels{
  padding-top: 9rem;
}

.cont_footer{
  padding-top: 6rem;
}
</style>