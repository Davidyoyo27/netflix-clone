<template>
  <!-- <iframe
    width="660"
    height="315"
    src="https://www.youtube.com/embed/F5ApJc5sSkk"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe> -->
  <!-- class="ytplayer" -->
  <div class="container">
    <iframe 
    v-bind:src="getLink"
    v-bind:type="type"
    v-bind:class="clase"
    v-bind:width="width"
    v-bind:height="height"
    v-bind:id="id"
    v-bind:frameborder="frameborder" 
    > 
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: 'https://www.youtube-nocookie.com/embed/',
      ID_video: '6JnN1DmbqoU?autoplay=1&controls=0&mute=1&disablekb=1&rel=0&showinfo=0&enablejsapi=1&origin=https://www.youtube.com/',
      type: 'text/html',
      // esta propiedad permite conectarla al iframe con el v-bind y 
      // usarla de igual manera en el css como una propidad class normal
      clase: 'youtube-player',
      id: "ytplayer",
      frameborder: '0',
    };
  },
  computed: {
    getLink(){
      return this.link + this.ID_video
    }
  },
};
</script>

<style scoped>
.youtube-player {
  /* desactiva la pausa del video y ademas el click derecho correspondiente 
  a las opciones que muestra normalmente en un video en la pagina */
  pointer-events: none;
  position: absolute;
  left: 0;
  width: 100%;
  height: 47.25vw;
  top: -4.2rem;
  z-index: -1;
}

.container{
  position: relative;
}
</style>