<template>
  <div>
    <!-- ejemplo de como pasar las props hacia el componente -->
    <!-- componente donde se le pasan las props para reproducir el video -->
    <EmbedVideoPlayer
      :title_movie="array[2]"
      :sinopsis_movie="array[3]"
      :certification_movie="array[5]"
      :background_image_movie="array[1]"
      :key_trailer_movie="array[4]"
    ></EmbedVideoPlayer>
  </div>
</template>

<script>
import { reactive } from "vue";
import EmbedVideoPlayer from "./EmbedVideoPlayer.vue";

export default {
  components: {
    EmbedVideoPlayer,
  },
  setup() {
    // array contenedor de las props que seran pasadas al componente hijo
    const array = reactive([
      479626,
      "/eiBXqcjxrw9osXatNfqTGmibhTC.jpg",
      "Avicii: True Stories",
      "Documental que sigue los pasos del famoso DJ desde sus comienzos hasta sus éxitos mundiales, y su posterior lucha contra la enfermedad. True Stories, que incluye comentarios de compañeros artistas como Tiesto, David Guetta y Nile Rodgers, es un testimonio de investigación acerca del coste y la intensa presión que supone la fama para los artistas.",
      "DgqLGgEghyw",
      "Btl",
    ]);

    return {
      array
    }
  },
};
</script>

<style>
</style>