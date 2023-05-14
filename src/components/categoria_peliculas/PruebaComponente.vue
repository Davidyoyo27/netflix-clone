<template>
    <h3>asdadsdasdsa</h3>
    <h3>asdadsdasdsa</h3>
    <h3>asdadsdasdsa</h3>
    <h3>asdadsdasdsa</h3>
    <h3>asdadsdasdsa</h3>
    <h3>asdadsdasdsa</h3>
    <h3>asdadsdasdsa</h3>
  <div v-if="flagRenderShadow" class="container">
    <div class="cont_info_carousel">
      <div class="cont_title">
        <h3 class="title">PRUEBA COMPONENTE</h3>
        <div class="cont_icon">
          <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        </div>
        <p class="sub_text">Explorar todos</p>
      </div>
    </div>
    <!-- NOTA: solo el "navigation" es lo mismo que decir navigation="true" -->
    <div class="container_carousel">
      <div class="cont_pagination">
        <div class="pagination_elSS"></div>
      </div>
      <swiper
        :slides-per-view="9"
        :slides-per-group="5"
        :loop="true"
        :speed="500"
        :navigation="cont_navigation"
        :pagination="cont_pagination"
        :breakpoints="cont_breakpoints"
        :modules="imp_modules"
        id="mySlider"
      >
        <swiper-slide v-for="item in data" :key="item">
          <img :src="link_img + item.poster_path" :alt="item.original_title" />
        </swiper-slide>
      </swiper>
      <div class="cont_buttons">
        <div class="button-pSS">
          <font-awesome-icon
            class="icon_right"
            icon="fa-solid fa-chevron-left"
          />
        </div>
        <div class="button-nSS">
          <font-awesome-icon
            class="icon_left"
            icon="fa-solid fa-chevron-right"
          />
        </div>
        <div v-if="flagRenderShadow" class="cont_shadow">
          <div class="box_shadow"></div>
          <div class="box_shadow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
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
    const flagRenderShadow = ref(false);
    // variable contenedora de las propiedades de la paginacion del carousel
    const cont_pagination = reactive({
      clickable: false,
      el: ".pagination_elSS",
      type: "bullets",
    });
    // variable contenedora de los tamaños de pantalla (responsive de el slider) y
    // la cantidad de elementos visibles segun el tamaño
    const cont_breakpoints = reactive({
      1870: { slidesPerView: 9 },
      1680: { slidesPerView: 8 },
      1480: { slidesPerView: 7 },
      1250: { slidesPerView: 6 },
      1040: { slidesPerView: 5 },
      840: { slidesPerView: 4 },
      640: { slidesPerView: 3 },
      400: { slidesPerView: 2 },
    });
    // variable contenedora de los botones que permiten avanzar o retroceder al carrusel
    // dejando :navigation="true" o solo navigation permite usar las flechas de direccion por default
    const cont_navigation = reactive({
      nextEl: ".button-nSS",
      prevEl: ".button-pSS",
    });

    return {
      imp_modules: [Navigation, Pagination, Scrollbar, A11y],
      cont_pagination,
      cont_breakpoints,
      cont_navigation,
      flagRenderShadow,
    };
  },
};
</script>

<style scoped>
</style>