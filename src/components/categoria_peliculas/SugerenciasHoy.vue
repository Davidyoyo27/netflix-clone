<template>
  <div v-if="flagRenderShadow" class="container">
    <div class="cont_info_carousel">
      <div class="cont_title">
        <h3 class="title">Sugerencias de hoy</h3>
        <div class="cont_icon">
          <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        </div>
        <p class="sub_text">Explorar todos</p>
      </div>
    </div>
    <!-- NOTA: solo el "navigation" es lo mismo que decir navigation="true" -->
    <div class="container_carousel">
      <div class="cont_pagination">
        <div class="pagination_elSH"></div>
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
        <div class="button-pSH">
          <font-awesome-icon
            class="icon_right"
            icon="fa-solid fa-chevron-left"
          />
        </div>
        <div class="button-nSH">
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
    // variable contenedora de las propiedades de la paginacion del carousel
    const cont_pagination = reactive({
      clickable: false,
      el: ".pagination_elSH",
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
      nextEl: ".button-nSH",
      prevEl: ".button-pSH",
    });

    onMounted(async () => {
      await services.movie_popular(getPageRandom(numMax, numMin))
        .then((response) => {
          // pasamos el array de objetos que contiene las peliculas y su informacion
          // para luego ser recorrida en el v-for de mas arriba y tener las caratulas
          // de las peliculas
          let array = response.data.results;
          // pasamos el array a un .filter() ya que este contiene elementos
          // con el poster_path en null, asi que para que no muestre una
          // imagen vacia en el carrusel se quitaran estos elementos con null
          data.value = array.filter((item) => {
            // retornamos todos los elementos que contengan datos en
            // el poster_path, esto es lo mismo que decir
            // return item.poster_path != null
            // que serian todos los elementos que no tengan datos null
            return item.poster_path;
          });
          // cambiamos el estado de la bandera a true una vez que los datos se 
          // hayan consultado correctamente para visualizar el carrusel de peliculas 
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
.container {
  margin-bottom: 4rem;
}

img {
  height: 18.75rem;
  border-radius: 0.3rem;
}

img:hover {
  cursor: pointer;
}

.container:hover .icon {
  display: block;
}

.container_carousel {
  position: relative;
  /* NOTA: el z-index tambien puede ser 0(cero), que en este caso
    es para que las imagenes del carrusel no esten por encima del submenu 
    de la derecha (Menu Principal) */
  z-index: 0;
}

.container_carousel:hover .pagination_elSH,
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
  position: relative;
  color: #e6dfdf;
  font-size: 30px;
  font-weight: 600;
}

.title:hover {
  color: #fff;
  cursor: pointer;
}

.sub_text {
  font-size: 1rem;
  font-weight: 600;
  color: #00d9ff;
  position: relative;
  opacity: 0;
  transition: 1s;
  cursor: pointer;
}

/* NOTA: para que al hacer hover sobre el titulo se vea el texto, 
 el texto que se desea visualizar debe estar dentro del mismo contenedor */
.cont_title:hover .sub_text {
  /* usar margenes para mover los elementos en el :hover es mejor que left, right, etc.*/
  margin-left: 2rem;
  transition: 1s;
  opacity: 1;
}

.cont_title {
  display: flex;
  align-items: center;
}

.cont_title:hover .icon {
  margin-left: 9.2rem;
  font-size: 15px;
  display: block;
}

.cont_title:hover .title {
  color: #fff;
}

.cont_icon {
  position: relative;
  display: flex;
  align-items: center;
  background-color: tomato;
}

.icon {
  color: #00d9ff;
  font-size: 20px;
  display: none;
  margin-left: 0.2rem;
  position: absolute;
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

.pagination_elSH {
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

.button-pSH,
.button-nSH {
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
  transition: 0.2s;
}

.button-pSH {
  border-radius: 0px 5px 5px 0px;
}

.button-nSH {
  border-radius: 5px 0px 0px 5px;
}

.button-pSH:hover,
.button-nSH:hover {
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