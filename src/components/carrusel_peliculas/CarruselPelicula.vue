<template>
  <div v-if="flagRenderShadow" class="container">
    <div class="cont_info_carousel">
      <div class="cont_title">
        <div class="text">
          <h3 class="title">{{ title }}</h3>
        </div>
        <div class="hover_text">
          <div class="cont_icon">
            <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
          </div>
          <p class="sub_text">Explorar todos</p>
        </div>
      </div>
    </div>
    <div class="container_carousel">
      <div class="cont_pagination">
        <div class="pagination_elements"></div>
      </div>
      <!-- NOTA: solo el "navigation" es lo mismo que decir navigation="true" -->
      <swiper
        :slides-per-view="9"
        :slides-per-group="5"
        :loop="true"
        :speed="500"
        navigation
        pagination
        :breakpoints="cont_breakpoints"
        :modules="imp_modules"
        id="mySlider"
      >
        <swiper-slide v-for="item in data" :key="item">
          <img :src="link_img + item.poster_path" :alt="item.name" />
        </swiper-slide>
      </swiper>
      <!-- SOMBRAS DE LAS FLECHAS DEL CARRUSEL -->
      <div class="cont_buttons">
        <div class="cont_shadow">
          <div class="box_shadow"></div>
          <div class="box_shadow"></div>
        </div>
      </div>
      <!-- SOMBRAS DE LAS FLECHAS DEL CARRUSEL -->
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default {
  props: {
    title: String,
    arrayData: Array,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    const data = ref(null);
    const flagRenderShadow = ref(false);
    const link_img = ref("https://image.tmdb.org/t/p/w500");
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
      760: { slidesPerView: 6 },
      590: { slidesPerView: 4 },
      300: { slidesPerView: 3 },
    });

    onMounted(() => {
      data.value = props.arrayData;
      (data.value.length != 0) ? flagRenderShadow.value = true : flagRenderShadow.value = false;
    });

    return {
      imp_modules: [Navigation, Pagination, Scrollbar],
      cont_pagination,
      cont_breakpoints,
      flagRenderShadow,
      data,
      link_img,
      title: props.title,
      arrayData: props.arrayData,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 0rem 0rem 4rem 4rem;
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

.container_carousel:hover .pagination_elements,
.container_carousel:hover .icon_right,
.container_carousel:hover .icon_left {
  visibility: visible;
}

.cont_info_carousel {
  display: flex;
  align-items: center;
  margin-left: .7rem;
}

.title {
  position: relative;
  color: #d0cfcf;
  font-size: 1.8rem;
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
  margin-left: 1rem;
  transition: 1s;
  opacity: 1;
}

.cont_title {
  display: flex;
  z-index: 1;
}

.cont_title:hover .icon {
  margin-left: 8rem;
  font-size: 15px;
}

.cont_title:hover .title {
  color: #fff;
}

.hover_text {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
}

.cont_icon {
  position: relative;
  display: flex;
  align-items: center;
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
  height: 250px;
  box-shadow: rgb(0, 0, 0) -5px 25px 45px 40px;
  background: #fff;
  visibility: visible;
}

@media (min-width: 380px) and (max-width: 590px){
  .container {
    margin: 0rem 0rem 4rem .3rem;
  }

  img {
    height: 11.30rem;
  }

  .title {
    font-size: 15px;
  }

  .sub_text {
    font-size: 0.8rem;
  }

  .text {
    max-width: 15rem;
  }

  .cont_title:hover .icon {
    margin-left: 6.7rem;
  }

  .box_shadow {
    box-shadow: rgb(0, 0, 0) -5px 20px 55px 20px;
  }
}

@media (min-width: 591px) and (max-width: 889px){
  .container {
    margin: 0rem 0rem 4rem .3rem;
  }

  img {
    height: 11.30rem;
  }

  .title {
    font-size: 18px;
  }

  .sub_text {
    font-size: 0.8rem;
  }

  .cont_title:hover .icon {
    margin-left: 6.7rem;
  }

  .box_shadow {
    box-shadow: rgb(0, 0, 0) -5px 20px 55px 20px;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .container {
    margin: 0rem 0rem 4rem 1.5rem;
  }

  img {
    height: 12.75rem;
  }

  .title {
    font-size: 20px;
  }

  .sub_text {
    font-size: .8rem;
  }

  .cont_title:hover .icon {
    margin-left: 6.7rem;
  }

  .box_shadow {
    height: 160px;
    box-shadow: rgb(0, 0, 0) 0px -5px 50px 35px;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .container {
    margin: 0rem 0rem 4rem 1.5rem;
  }

  img {
    height: 15.75rem;
  }

  .title {
    font-size: 25px;
  }

  .box_shadow {
    height: 210px;
    box-shadow: rgb(0, 0, 0) 0px -5px 50px 35px;
  }
}
</style>