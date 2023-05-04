<template>
    <div class="container">
      <div class="cont_info_carousel">
        <div class="cont_title">
          <h3 class="title">Volver a verlo</h3>
          <p class="sub_text">Explorar todos</p>
          <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        </div>
      </div>
      <!-- NOTA: solo el "navigation" es lo mismo que decir navigation="true" -->
      <div class="container_carousel">
        <div class="cont_pagination">
          <div class="pagination_elements"></div>
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
          <div class="button-prev">
            <font-awesome-icon class="icon_right" icon="fa-solid fa-chevron-left" />
          </div>
          <div class="button-next">
            <font-awesome-icon class="icon_left" icon="fa-solid fa-chevron-right" />
          </div>
          <div v-if="flagRenderShadow" class="cont_shadow">
            <div class="box_shadow"></div>
            <div class="box_shadow"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- solucion del gradient del menu inicio -->
    <!-- <div class="prueba"></div> -->
    <!-- /* .prueba {
      background-color: teal;
      height: 100px;
      box-shadow: 0 0 100px #000000;
      background: #fff;
    } */ -->
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
      const flagRenderShadow = ref(false);
      // variable contenedora del formato del tamaño de imagen de la caratula
      const link_img = ref("https://image.tmdb.org/t/p/w500");
      //
      const cont_pagination = reactive({
        clickable: false,
        el: ".pagination_elements",
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
        nextEl: ".button-next",
        prevEl: ".button-prev",
      });
  
      onMounted(async () => {
        await services
          .movie_info(getPageRandom(numMax, numMin))
          .then((response) => {
            // pasamos el array de objetos que contiene las peliculas y su informacion
            // para luego ser recorrida en el v-for de mas arriba y tener las caratulas
            // de las peliculas
            data.value = response.data.results;
            flagRenderShadow.value = true;
          })
          .catch((error) => {
            throw error.message;
          });
      });
  
      return {
        data,
        link_img,
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
  img {
    height: 18.75rem;
    border-radius: 0.3rem;
  }
  
  img:hover {
    cursor: pointer;
  }
  
  .container:hover .icon {
    display: block;
    left: 16rem;
  }
  
  .container_carousel {
    position: relative;
    /* NOTA: el z-index tambien puede ser 0(cero), que en este caso
      es para que las imagenes del carrusel no esten por encima del submenu 
      de la derecha (Menu Principal) */
    z-index: 0;
  }
  
  .container_carousel:hover .pagination_elements,
  .container_carousel:hover .icon_right, 
  .container_carousel:hover .icon_left {
    visibility: visible;
  }
  
  .cont_info_carousel {
    display: flex;
    align-items: center;
    margin-left: 4rem;
  }
  
  .title {
    color: #e6dfdf;
    font-size: 30px;
  }
  
  .title:hover {
    color: #fff;
    cursor: pointer;
  }
  
  .sub_text {
    padding-left: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #00d9ff;
    position: absolute;
    left: 15rem;
    opacity: 0;
    transition: 1s;
    cursor: pointer;
  }
  
  .cont_title {
    display: flex;
    align-items: center;
    z-index: 1;
  }
  
  /* NOTA: para que al hacer hover sobre el titulo se vea el texto, 
   el texto que se desea visualizar debe estar dentro del mismo contenedor */
  .cont_title:hover .sub_text {
    display: block;
    left: 16rem;
    transition: 0.8s;
    opacity: 1;
  }
  
  .cont_title:hover .icon {
    left: 24rem;
    font-size: 15px;
    display: block;
  }
  
  .cont_title:hover .title {
    color: #fff;
  }
  
  .icon {
    color: #00d9ff;
    font-size: 20px;
    display: none;
    margin-left: 0.2rem;
    position: absolute;
    left: 16.3rem;
    transition: 0.8s;
    cursor: pointer;
  }
  
  .cont_pagination {
    margin-right: 4rem;
    margin-bottom: 0.5rem;
    /* posicionamiento usado para que la propiedad z-index funcione */
    position: relative;
    z-index: 1;
  }
  
  .pagination_elements {
    display: flex;
    justify-content: flex-end;
    visibility: hidden;
  }
  
  .cont_buttons {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .button-prev,
  .button-next {
    font-size: 2rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0);
    height: 100%;
    min-width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: pointer;
    transition: .2s;
  }
  
  .button-prev {
    border-radius: 0px 5px 5px 0px;
  }
  
  .button-next {
    border-radius: 5px 0px 0px 5px;
  }
  
  .button-prev:hover,
  .button-next:hover {
    font-size: 2.5rem;
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .icon_right,
  .icon_left {
    visibility: hidden;
  }
  
  .cont_shadow {
    display: flex;
    justify-content: space-between;
    width: 100%;
    visibility: hidden;
    position: absolute;
    z-index: 1;
  }
  
  .box_shadow {
    position: relative;
    height: 270px;
    box-shadow: rgb(0, 0, 0) 0px -5px 50px 40px;
    background: #fff;
    visibility: visible;
  }
  </style>