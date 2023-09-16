<template>
  <div>
    <EmbedVideoPlayer
      :idMovie="id"
      :titleMovie="title"
      :overviewMovie="overview"
      :backgroundImageMovie="backdrop"
      :certificationMovie="certification"
      :videoId="keyTrailer"
      :timeVideoId="dataTimeVideoKey"
    ></EmbedVideoPlayer>
  </div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { getDataMovieStartVideo, convertDurationToSeconds } from "@/helpers/js/functions";
import services from "@/helpers/services/services";

export default {
  components: {
    EmbedVideoPlayer: defineAsyncComponent(() => import(/* webpackChunkName: "EmbedVideoPlayer.vue" */ "@/components/EmbedVideoPlayer")),
  },
  setup() {
    const id = ref(0);
    const title = ref("");
    const overview = ref("");
    const backdrop = ref("");
    const certification = ref("");
    const keyTrailer = ref("");
    const dataTimeVideoKey = ref(0);
    const movieBackdropLink = ref("https://image.tmdb.org/t/p/original");

    onMounted(async () => {
      // usamos la funcion creada en el archivo externo y la pasamos a una variable para poder usarla,
      // en este caso siendo un array solo se captura los datos segun su posicion
      const dataMovie = await getDataMovieStartVideo();
      id.value = dataMovie[0];
      title.value = dataMovie[2];
      overview.value = dataMovie[3];
      backdrop.value = movieBackdropLink.value + dataMovie[1];
      certification.value = dataMovie[5];
      keyTrailer.value = dataMovie[4];

      // evaluamos si keyTrailer no tiene una key de video
      if (keyTrailer.value === "No hay key del trailer") {
        // si es asi la duracion del video sera de 0
        dataTimeVideoKey.value = 0;
        // en caso contrario y que si tenga key
      } else {
        // realizamos la peticion al endpoint que conecta con la api de youtube para obtener los datos de dicho video
        const respYoutubeData = await services.get_data_youtube_data_v3(keyTrailer.value);
        // hay ocasiones en que el objeto respYoutubeData.data.items[0] esta vacio o el indice 0 en el arragle no existe
        // por lo que arroja el siguiente error "respYoutubeData.data.items[0] is undefined", para ello
        // validamos si el objeto respYoutubeData.data.items existe y si al menos tiene un elemento antes de intentar acceder al indice 0
        if (respYoutubeData.data.items && respYoutubeData.data.items.length > 0) {
          // accedemos al índice 0 de respYoutubeData.data.items para obtener la duracion del video
          const duration = respYoutubeData.data.items[0].contentDetails.duration;
          // pasamos el resultado de duration a la funcion para obtener su valor en segundos
          dataTimeVideoKey.value = convertDurationToSeconds(duration);
        } else {
          // en el caso en que respYoutubeData.data.items no existe o está vacío el valor de la duracion de tiempo del video sera de 0
          dataTimeVideoKey.value = 0;
        }
      }
    });

    return {
      id,
      title,
      overview,
      backdrop,
      certification,
      keyTrailer,
      dataTimeVideoKey,
    };
  },
};
</script>

<style>
</style>