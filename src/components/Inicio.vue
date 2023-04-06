<template>
  <h1>este es el inicio de la pagina</h1>
  <p>texto para hacer el commit</p>
  <img v-bind:src="imagen" alt="" />
  <iframe
    width="560"
    height="315"
    v-bind:src="video"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
  <!-- <iframe
    width="640"
    height="360"
    src="https://player.vimeo.com/video/401102477"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
  ></iframe> -->
</template>

<script>
import service from "@/helpers/services/services.js";
import img_poster from "@/assets/poster-oficial-spider-man-no-way-home.jpg";

export default {
  props: {},
  data() {
    return {
      // pagina: 500,
      valor_min: 1,
      valor_max: 501,
      imagen: null,
      url_img: "https://www.themoviedb.org/t/p/w220_and_h330_face",
      // url_img: 'https://image.tmdb.org/t/p/original'
      video: "https://www.youtube-nocookie.com/embed/F5ApJc5sSkk",
      img_poster,
    };
  },
  computed: {

  },
  async mounted() {
    // axios
    //   .get(
    //     // "https://api.themoviedb.org/3/movie/100/videos?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=en-US"
    //     "https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate"
    //   )
    //   .then((response) => console.log(response.data));

    try {
      // recibe la respuesta de la API que contiene la pelicula
      let respAxios = await service.movie_info(
        this.getPageRandom(this.valor_max, this.valor_min)
      );
      // muestra todos los resultados contenidos en la pagina X con sus correspondientes peliculas Array(20)
      const dataArray = respAxios.data.results;
      // utilizamos el sort con la funcion getNumbeRandom para que nos mezcle el array con los 20 elementos
      let dataSorted = dataArray.sort(this.getNumberRandom);
      // tomamos la el primer elemento con sus datos correspondiente a la posicion con la primera pelicula
      let unicData = dataSorted[0];
      let key_imagen = unicData.poster_path;
      this.imagen = this.url_img + key_imagen;
      console.log(unicData);
      console.log(this.imagen);
    } catch (err) {
      return err;
    }
  },
  methods: {
    // generamos un numero random entre una cantidad especifica
    // max: 500, min: 1
    // estos valores son la cantidad de paginas de la API
    getPageRandom(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // funcion para mezclar el array aleatoriamente con el sort
    getNumberRandom() {
      return 0.5 - Math.random();
    },
  },
};
</script>

<style scoped>
</style>