<template>
  <div class="cont_info_carousel">
    <h3 class="title">{{ title }}</h3>
  </div>
  <div class="container_carousel">
    <div class="cont_pagination">
      <div class="pagination_elT10M"></div>
    </div>
    <swiper
      :slides-per-view="6"
      :slides-per-group="4"
      :loop="true"
      :speed="500"
      :navigation="cont_navigation"
      :pagination="cont_pagination"
      :breakpoints="cont_breakpoints"
      :modules="imp_modules"
      id="mySlider"
    >
      <swiper-slide
        v-for="item in objectArray"
        :key="item.number"
        class="cont-image"
      >
        <img class="number" :src="item.img_number" alt="" />
        <img
          class="img_movie"
          :src="link_img + item.link_image"
          :alt="item.name_movie"
        />
      </swiper-slide>
    </swiper>
    <div class="cont_buttons">
      <div class="button-pT10M">
        <font-awesome-icon class="icon_right" icon="fa-solid fa-chevron-left" />
      </div>
      <div class="button-nT10M">
        <font-awesome-icon class="icon_left" icon="fa-solid fa-chevron-right" />
      </div>
      <div class="cont_shadow">
        <div class="box_shadow"></div>
        <div class="box_shadow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import img_uno from "@/assets/1.png";
import img_dos from "@/assets/2.png";
import img_tres from "@/assets/3.png";
import img_cuatro from "@/assets/4.png";
import img_cinco from "@/assets/5.png";
import img_seis from "@/assets/6.png";
import img_siete from "@/assets/7.png";
import img_ocho from "@/assets/8.png";
import img_nueve from "@/assets/9.png";
import img_diez from "@/assets/10.png";
import { onMounted, ref, reactive } from "vue";
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
  props: {
    title: String,
    arrayData: Array,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    // variable contenedora del formato del tamaño de imagen de la caratula
    const link_img = ref("https://image.tmdb.org/t/p/w500");
    // creamos un array con todas las imagenes de los numeros
    const image_number_array = ref([
      img_uno,
      img_dos,
      img_tres,
      img_cuatro,
      img_cinco,
      img_seis,
      img_siete,
      img_ocho,
      img_nueve,
      img_diez,
    ]);
    // creamos un array con la cantidad de posiciones de todas las imagenes
    // este sera usado para crear el objeto a partir de los 2 array contenedores
    // tanto de los numeros asi como de las link de las imagenes
    const positionNumber = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // creamos le objeto vacio
    const objectArray = ref({});
    // variable contenedora de las propiedades de la paginacion del carousel
    const cont_pagination = reactive({
      clickable: false,
      el: ".pagination_elT10M",
      type: "bullets",
    });
    // variable contenedora de los tamaños de pantalla (responsive de el slider) y
    // la cantidad de elementos visibles segun el tamaño
    const cont_breakpoints = reactive({
      1870: { slidesPerView: 6 }, //6 del slides-per-view
      1250: { slidesPerView: 5 },
      1000: { slidesPerView: 4 },
      750: { slidesPerView: 3 },
      488: { slidesPerView: 2 },
      300: { slidesPerView: 1 },
    });
    // variable contenedora de los botones que permiten avanzar o retroceder al carrusel
    // dejando :navigation="true" o solo navigation permite usar las flechas de direccion por default
    const cont_navigation = reactive({
      nextEl: ".button-nT10M",
      prevEl: ".button-pT10M",
    });

    onMounted(() => {
      // tomamos el objeto traido del componente con los datos nombre_pelicula y link_imagen
      const valor = props.arrayData;
      // array vacio donde se insertaran los nombres de las peliculas
      const arrayNames = [];
      // array vacio donde se insertaran los links de los poster de las peliculas
      const arrayLinks = [];
      // utilizamos el Object.keys() para extraer los valores del objeto
      // para recorrer ese objeto usaremos el .forEach()
      Object.keys(valor).forEach((item) => {
        // llamamos al item del valor segun el valor de la key que se desea extraer, en este caso el name y el poster_path
        // finalmente tomamos cada uno de esos valores y los insertamos en los arrays vacios con el .push()
        arrayNames.push(valor[item].name);
        arrayLinks.push(valor[item].poster_path);
      });

      // finalmente creamos el objeto con los arrays con sus valores por separado
      // el cual finalmente sera usado para recorrerlo y mapear los valores mas arriba
      objectArray.value = positionNumber.value.map((currentValue, index) => {
        return {
          number: currentValue,
          link_image: arrayLinks[index],
          name_movie: arrayNames[index],
          img_number: image_number_array.value[index],
        };
      });
    });

    //NOTA: PASAR LAS VARIABLES, FUNCIONES Y DEMAS ACA PARA USAR EN EL TEMPLATE
    return {
      img_diez,
      link_img,
      imp_modules: [Navigation, Pagination, Scrollbar, A11y],
      image_number_array,
      positionNumber,
      objectArray,
      cont_pagination,
      cont_breakpoints,
      cont_navigation,
      title: props.title,
      arrayData: props.arrayData,
    };
  },
};
</script>

<style scoped>
.cont-image {
  display: flex;
  align-items: center;
  position: relative;
}

.number {
  height: 250px;
  width: 250px;
  object-fit: cover;
  display: block;
}

.img_movie {
  width: 150px;
  height: 190px;
  position: relative;
  right: 6rem;
  display: block;
  border-radius: 0rem 0.3rem 0.3rem 0rem;
}

.img_movie:hover {
  cursor: pointer;
}

.title {
  position: relative;
  color: #e6dfdf;
  font-size: 30px;
  font-weight: 600;
  cursor: default;
}

.container_carousel {
  position: relative;
  /* NOTA: el z-index tambien puede ser 0(cero), que en este caso
    es para que las imagenes del carrusel no esten por encima del submenu 
    de la derecha (Menu Principal) */
  z-index: 0;
  margin-bottom: 2rem;
}

.container_carousel:hover .pagination_elT10M,
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

.cont_pagination {
  margin-right: 4rem;
  margin-bottom: 0.5rem;
  /* posicionamiento usado para que la propiedad z-index funcione */
  position: relative;
  z-index: 1;
}

.pagination_elT10M {
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

.button-pT10M,
.button-nT10M {
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

.button-pT10M {
  border-radius: 0px 5px 5px 0px;
}

.button-nT10M {
  border-radius: 5px 0px 0px 5px;
}

.button-pT10M:hover,
.button-nT10M:hover {
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
  box-shadow: rgb(0, 0, 0) 0px -5px 50px 35px;
  background: #fff;
  visibility: visible;
}

@media (min-width: 300px) and (max-width: 889px) {
  .title {
    font-size: 20px;
  }

  .box_shadow {
    height: 160px;
    box-shadow: rgb(0, 0, 0) 0px -5px 50px 35px;
  }

  .cont_info_carousel {
    margin-left: 1rem;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .title {
    font-size: 25px;
  }

  .box_shadow {
    height: 210px;
    box-shadow: rgb(0, 0, 0) 0px -5px 50px 35px;
  }
}
</style>