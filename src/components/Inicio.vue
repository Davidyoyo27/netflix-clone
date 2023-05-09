<template>
  <div v-on:scroll="handleScroll" class="container_principal">
    <div class="cont_video">
      <EmbedVideoPlayer></EmbedVideoPlayer>
    </div>
    <div class="cont_carousels">
      <div class="carousels">
        <SeriesEmocionantes></SeriesEmocionantes>
        <TopDramas></TopDramas>
      </div>
    </div>
  </div>
</template>

<script>
// RECOMENDACION: al importar un componente no usar la extension .vue, ya que
// al traer 2 componentes de la misma ruta con la extension .vue este generara un error
// si bien el error no afecta el funcionamiento del modulo es molesto visualmente dentro del modulo
import EmbedVideoPlayer from "@/components/EmbedVideoPlayer";
import SeriesEmocionantes from "@/components/categoria_peliculas/SeriesEmocionantes";
import TopDramas from "@/components/categoria_peliculas/TopDramas";

export default {
  // En caso de querer llamar a algun componente con el Composition API
  // es de esta manera, fuera del setup()
  components: {
    SeriesEmocionantes,
    EmbedVideoPlayer,
    TopDramas,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.container_principal {
  position: relative;
}

.cont_video {
  width: 100%;
  height: 50vw;
}

.cont_carousels {
  background-color: #000;
  width: 100%;
  height: 100vh;
  box-shadow: rgb(0, 0, 0) 0px -50px 100px 30px;
  position: absolute;
  z-index: 1;
}

.carousels {
  position: relative;
  bottom: 9rem;
}

@media screen and (min-width: 390px) and (max-width: 889px) {
  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -30px 100px 20px;
  }
  
  .carousels {
    bottom: 5rem;
  }
}

@media screen and (min-width: 890px) and (max-width: 1129px) {
  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -30px 100px 20px;
  }
  
  .carousels {
    bottom: 6rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -50px 100px 20px;
  }

  .carousels {
    bottom: 7rem;
  }
}
</style>