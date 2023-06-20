<template>
  <div>
    <!-- componente donde se le pasan las props para reproducir el video -->
    <EmbedVideoPlayer></EmbedVideoPlayer>
  </div>
</template>

<script>
import EmbedVideoPlayer from "./EmbedVideoPlayer.vue";

export default {
  components: {
    EmbedVideoPlayer,
  },
  setup() {

    return {
    };
  },
};
</script>

<style>
</style>