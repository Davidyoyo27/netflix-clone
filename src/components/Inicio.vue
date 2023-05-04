<template>
  <div class="container_principal">
    <div class="cont_video">
      <EmbedVideoPlayer></EmbedVideoPlayer>
    </div>
    <div class="cont_carousels">
        <div class="carousels">
            <VolverAVer></VolverAVer>
        </div>
    </div>
  </div>
</template>

<script>
import EmbedVideoPlayer from "@/components/EmbedVideoPlayer.vue";
import VolverAVer from "@/components/VolverAVer.vue";

export default {
  // En caso de querer llamar a algun componente con el Composition API
  // es de esta manera, fuera del setup()
  components: {
    VolverAVer,
    EmbedVideoPlayer,
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
  box-shadow: rgb(0, 0, 0) 0px -50px 200px 100px;
  position: absolute;
  z-index: 1;
}

.carousels {
  position: relative;
  bottom: 9rem;
}
</style>