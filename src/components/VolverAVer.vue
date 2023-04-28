<template>
  <h1>aca va el carrusel</h1>
  <h1>aca va el carrusel</h1>
  <h1>aca va el carrusel</h1>
  <h1>aca va el carrusel</h1>
  <!-- NOTA: solo el "navigation" es lo mismo que decir navigation="true" -->
  <div class="container_carousel">
    <swiper
      :slides-per-view="9"
      :slides-per-group="5"
      :loop="true"
      navigation
      :pagination="cont_pagination"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :modules="imp_modules"
      id="mySlider"
    >
      <swiper-slide v-for="item in data" :key="item">
        <img :src="link_img + item.poster_path" :alt="item.original_title" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import services from "@/helpers/services/services.js";
import { getPageRandom } from "@/helpers/js/functions.js";
import { numMax, numMin } from "@/helpers/js/variables.js";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // para lo del cambio de la cantidad de imagenes que se ven en el inicio de las peliculas
    // usar en la propiedad slides-per-group="5" una variable que vaya cambiando segun el tamaño
    // de la pantalla, usar la misma logica que en el modulo pasado controlando con js y un operador
    // ternario el tamaño de la pantalla
    const data = ref(null);
    const link_img = ref("https://image.tmdb.org/t/p/w500");
    const cont_pagination = reactive({ clickable: false, type: 'custom', bulletElement: 'span'});

    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };

    onMounted(() => {
      services
        .movie_info(getPageRandom(numMax, numMin))
        .then((response) => {
          // pasamos el array de objetos que contiene las peliculas y su informacion
          // para luego ser recorrida en el v-for de mas arriba y tener las caratulas
          // de las peliculas
          data.value = response.data.results;
          console.log("funcionaaaaa", data.value);
        })
        .catch((error) => {
          // throw error.message;
          console.log("error", error);
        });
    });

    return {
      data,
      link_img,
      onSwiper,
      onSlideChange,
      imp_modules: [Navigation, Pagination, Scrollbar, A11y],
      cont_pagination,
    };
  },
};
</script>

<style scoped>
/* #slider {
  display: flex;
  gap: 0.7rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
} */

.container_carousel {
    position: relative;
    z-index: 1;
}

img {
  height: 18.75rem;
  border-radius: 0.3rem;
}

img:hover {
  cursor: pointer;
}

#mySlider .swiper-button-prev,
#mySlider .swiper-button-next {
  color: red;
  background-color: black;
}
</style>