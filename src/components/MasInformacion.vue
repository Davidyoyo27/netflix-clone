<template>
  <div class="overlay">
    <div class="wrapper">
      <div class="container_icon">
        <font-awesome-icon class="icon" icon="fa-solid fa-circle-xmark" @click="closeOverlay()"/>
      </div>
      <p>{{ idInject }}</p>
      <img class="background" :src="imageBackground" alt=""/>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, watch } from "vue";
import { useStore } from "vuex";
import services from "@/helpers/services/services";

export default {
  name: "Overlay",
  // RECUERDA QUE SI NO DESEAS HACER NUEVAMENTE LA CONSULTA A LOS SERVICIOS EN EL ONMOUNTED PARA OBTENER TODOS LOS PARAMETROS EL EMBEDVIDEO
  // PUEDES TOMAR TODOS LOS PARAMETROS YA EXISTENTES EN EL COMPONENTE Y PASARLOS DE LA MISMA MANERA QUE EL ID DE LA PELICULA, EN ESTE CASO
  // COMO ES MAS DE UN PARAMETRO PUEDES CREAR UN OBJETO CON ESA DATA Y PASAR ESE OBJETO AL PROVIDE
  setup() {
    const store = useStore();
    const movieId = ref(null);
    const movieTitle = ref(null);
    const movieBackground = ref(null);
    const movieVideoKey = ref(null);
    const idInject = inject("id");
    const imageBackground = ref(null);
    const movieBackdropLink = ref("https://image.tmdb.org/t/p/original");
    const keyVideo = ref(null);

    const stateShowOverlay = computed(() => store.state.showOverlay);

    function closeOverlay() {
      let flagShowOverlay = stateShowOverlay.value;
      flagShowOverlay = false;
      store.dispatch("actualizarShowOverlay", flagShowOverlay);
    }

    watch(idInject, async (newValue) => {
      const response = await services.get_data_movie_by_ID(newValue);
      imageBackground.value = movieBackdropLink.value + response.data.backdrop_path;
      const responseVideo = await services.get_data_key_movie_video(newValue);
      keyVideo.value = responseVideo.data.results[0].key;
    });

    return {
      closeOverlay,
      movieId,
      movieTitle,
      movieBackground,
      movieVideoKey,
      idInject,
      imageBackground,
      movieBackdropLink,
    };
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8); /* Fondo semitransparente para el overlay */
  z-index: 9999; /* Asegura que el overlay esté en la parte superior */
}
.wrapper {
  position: fixed;
  top: 1.7rem;
  width: 50%;
  height: 100%;
  background-color: rgba(0,0,0,0.5); /* Fondo semitransparente para el overlay */
  z-index: 9999; /* Asegura que el overlay esté en la parte superior */
  /* background-color: yellowgreen; */
  /* opacity: 0.5; */
  border-radius: 0.6rem;
  overflow: scroll;
}

.container_icon {
  display: flex;
  justify-content: flex-end;
}

.container_icon .icon {
  font-size: 1.8rem;
  cursor: pointer;
}

.background {
  width: 100%;
}
</style>