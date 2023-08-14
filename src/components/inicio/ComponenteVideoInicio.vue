<template>
  <div class="container">
    <div id="container_image">
      <div id="container_info_movie">
        <div v-if="flagDataRenderized" class="info_movie">
          <div class="box-left">
            <div class="title_movie">
              <h1>{{ movie_title }}</h1>
            </div>
            <div class="cont_sinopsis">
              <p id="sinopsis">{{ movie_overview }}</p>
            </div>
            <div id="cont_buttons">
              <button class="button_rep">
                <font-awesome-icon class="icon" icon="fa-solid fa-play" />
                <span>Reproducir</span>
              </button>
              <button class="button_info">
                <font-awesome-icon
                  class="icon"
                  icon="fa-solid fa-circle-info"
                />
                <span>Más información</span>
              </button>
            </div>
          </div>
          <div class="box-right">
            <div class="cont-play-mute">
              <button id="button-mute" v-on:click="deactivateVolumeVideo">
                <font-awesome-icon icon="fa-solid fa-volume-xmark" />
              </button>
              <button id="button-unMute" v-on:click="activateVolumeVideo">
                <font-awesome-icon icon="fa-solid fa-volume-high" />
              </button>
              <button id="button-playVideo" v-on:click="playVideoAgain">
                <font-awesome-icon icon="fa-solid fa-rotate-right" />
              </button>
            </div>
            <div class="cont-cert">
              <p>{{ resp_cert }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div ref="youtube" :id="playerId"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getDataMovieStartVideo } from "@/helpers/js/functions";

export default {
  emits: [
    "ready",
    "playing",
    "paused",
    "ended",
    "stateChange",
    "playbackQualityChange",
    "playbackRateChange",
    "error",
    "apiChange",
  ],
  // Uncaught ReferenceError: emit is not defined
  // setup( props, { emit }) solucion al error de arriba
  setup(props, { emit }) {
    /// inicializacion de las variables a usar
    // variable contenedora del reproductor
    const player = ref(null);
    // id del <iframe>
    const playerId = ref(null);
    // variables que contienen los datos de la API
    const id_movie = ref(null);
    const movie_key = ref("");
    const movie_title = ref("");
    const movie_overview = ref("");
    const movie_backdrop_link = ref("https://image.tmdb.org/t/p/original");
    const movie_backdrop_image = ref("");
    // variables que muestran los datos en pantalla
    const resp_cert = ref("");
    const flagVisualizationState = ref(false);
    // contenido de info de las peliculas
    const cont_info_movie = ref(null);
    const cont_img = ref(null);
    const sinopsis = ref(null);
    // botones de accion de silenciar/activar sonido/reproducir
    const volume_off = ref(null);
    const volume_on = ref(null);
    const reproducir = ref(null);
    // bandera para tener el estado de reproduccion del video
    const flagEstateVideo = ref(null);
    // variables con la cantidad de segundos en que inicia y termina el trailer de la pelicula
    const startSecondsVideo = ref(7);
    const endSecondsVideo = ref(65);
    const flagDataRenderized = ref(false);

    onMounted( async () => {
      // usamos la funcion creada en el archivo externo y la pasamos a una variable para poder usarla,
      // en este caso siendo un array solo se captura los datos segun su posicion
      const dataMovie = await getDataMovieStartVideo();
      // id de la pelicula
      id_movie.value = dataMovie[0];
      // imagen de fondo de la pelicula
      const backdrop_key_movie = dataMovie[1];
      // tomamos el link anterior y lo unimos al resto de la ruta para generar el link de la imagen completa
      movie_backdrop_image.value = movie_backdrop_link.value + backdrop_key_movie;
      // titulo de la pelicula
      movie_title.value = dataMovie[2];
      // sinopsis de la pelicula
      movie_overview.value = dataMovie[3];
      // key del trailer de la pelicula
      movie_key.value = dataMovie[4];
      // certificacion de la pelicula
      resp_cert.value = dataMovie[5];
      getImageBackground();
      // bandera que muestra la data cuando esta disponible para mostrarse
      flagDataRenderized.value = true;
      
      // asignar el id al <iframe>
        playerId.value = "reproductor";
        loadAPI().then(() => {
          checkIfYTLoaded().then(() => {
            setTimeout(() => {
              createPlayer();
          }, 2000);
        });
      });
    });

    function loadAPI() {
      if (document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
        // Youtube API script already added
        return Promise.resolve();
      }
      // 2. This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      return Promise.resolve();
    }

    function checkIfYTLoaded() {
      if (window.YT && window.YT.Player) {
        return Promise.resolve();
      }
      // recursively check if the YT object is loaded
      //R: The JavaScript exception "too much recursion" or "Maximum call stack size exceeded"
      //occurs when there are too many function calls, or a function is missing a base case.
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve) => {
        // agregamos el setTimeout() con 1seg para evitar el problema de recursividad con las funciones
        setTimeout(() => {
          checkIfYTLoaded().then(() => {
            resolve();
          });
        }, 500); //100
      });
    }

    // creamos el elemento img que es el que contendra la imagen de fondo
    function getImageBackground() {
      let url = movie_backdrop_image.value;
      let image = new Image();
      image.src = url;
      document.getElementById("container_image").appendChild(image);
      // le asignamos el id a la imagen una vez que se crea
      image.setAttribute("id", "img_poster");
      // caputaramos el id de la etiqueta <img> una vez que esta se creo
      let img_poster = document.getElementById("img_poster");
      // le asignamos el ancho y alto correspondiente a la imagen
      img_poster.style.width = "100%";
      img_poster.style.height = "100%";
      // desactivamos las interacciones con el mouse cuando este el fondo de la imagen
      img_poster.style.pointerEvents = "none";
    }

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    function createPlayer() {
      const playerElement = playerId.value;
      // creamos videoID que es la variable que contendra la key del video
      const videoID = movie_key.value;
      // capturamos el id del iframe cuando este se crea
      let video_style = document.getElementById("reproductor");
      // le pasamos el estilo de css mediante JS cuando el video ya este renderizado
      // desactivamos la interaccion con el reproductor del video click derecho e izquierdo
      video_style.style.pointerEvents = "none";
      video_style.style.width = "100%";
      // asignamos el style con el heigh con viewport width, esto quiere decir que su "altura"
      // cambiara cuando se haga mas pequeña el tamaño de la ventana en base al ancho de la pantalla
      // como se especifica con el vw(viewport width)
      video_style.style.height = "50.25vw";
      player.value = new YT.Player(playerElement, {
        videoId: videoID,
        playerVars: {
          start: startSecondsVideo.value,
          end: endSecondsVideo.value,
          mute: 1,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onPlaybackQualityChange: onPlaybackQualityChange,
          onPlaybackRateChange: onPlaybackRateChange,
          onError: onError,
          onApiChange: onApiChange,
        },
      });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      emit("ready", event.target);
      // esperamos 5 segundos a visualizar el fondo de la pelicula
      // para luego reproducir el trailer
      setTimeout(() => {
        // se reproduce el video
        playVideo();
      }, 5000);
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    function onPlayerStateChange(event) {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          emit("playing", event.target);
          // SE OCULTA LA INFO DE LA PELICULA AL REPRODUCIRSE EL VIDEO
          // capturamos el elemento contenedor con los datos de la pelicula visualizada
          cont_info_movie.value = document.getElementById("container_info_movie");
          // pasamos el estilo de CSS ocultando el contenedor con la info mientras el video se reproduce
          cont_info_movie.value.style.visibility = "visible";
          // SE OCULTA LA IMAGEN DE FONDO DE LA PELICULA AL REPRODUCIRSE EL VIDEO
          // capturamos el elemento que contiene la imagen de fondo de la pelicula
          cont_img.value = document.getElementById("container_image");
          // pasamos el estilo de CSS ocultando el contenedor con la imagen de la pelicula
          cont_img.value.style.visibility = "hidden";
          sinopsis.value = document.getElementById("sinopsis");

          // settimeout para que cuando se reprodusca el trailer, luego de 3 seg se
          // quite el texto informativo de la pelicula
          setTimeout(() => {
            sinopsis.value.style.fontSize = "0vw";
            sinopsis.value.style.opacity = "0";
          }, 3000);

          // se oculta el reproducir de nuevo del video mientras este se reproduce
          reproducir.value = document.getElementById("button-playVideo");
          reproducir.value.style.display = "none";
          // capturamos el id del boton mutear
          volume_off.value = document.getElementById("button-mute");
          // usamos el metodo isMuted() el cual arrojara un true si el video reproducido esta en muteado
          //  y false si el video reproduciendose no esta muteado, esto para mostrar el mutear o desmutear
          // segun corresponda
          if (isMuted() === true) {
            volume_on.value = document.getElementById("button-unMute");
            volume_on.value.style.display = "block";
          } else {
            volume_off.value.style.display = "block";
          }
          // asignamos el valor de reproduciendo del estado del reproductor a la variable para
          // usarla en la funcion pauseVideoIfNotActivePage()
          flagEstateVideo.value = window.YT.PlayerState.PLAYING;
          pauseVideoIfNotActivePage();
          break;
        case window.YT.PlayerState.PAUSED:
          emit("paused", event.target);
          // asignamos el valor de pausa del estado del reproductor a la variable para
          // usarla en la funcion pauseVideoIfNotActivePage()
          flagEstateVideo.value = window.YT.PlayerState.PAUSED;
          break;
        case window.YT.PlayerState.ENDED:
          emit("ended", event.target);
          // una vez finalizado la pre-visualizacion volvemos a mostrar la imagen de fondo
          cont_img.value.style.visibility = "visible";
          // el texto de la sinopsis vuelve a hacerse grande
          sinopsis.value.style.fontSize = "1.5vw";
          // es visible el texto de la sinopsis
          sinopsis.value.style.opacity = "1";
          // al finalizar el video no importa cual de los dos botones de volumen este activo
          // ambos se ocultan
          volume_on.value.style.display = "none";
          volume_off.value.style.display = "none";
          // es visible el boton de volver a reproducir al finalizar el video
          reproducir.value.style.display = "block";
          // asignamos el valor de pausa del estado del reproductor a la variable para
          // usarla en la funcion pauseVideoIfNotActivePage()
          flagEstateVideo.value = window.YT.PlayerState.ENDED;
          break;
      }
      emit("stateChange", event.target);
    }

    // desmutea el video reproducido y oculta el mismo boton
    function activateVolumeVideo() {
      unMute();
      volume_on.value.style.display = "none";
      volume_off.value.style.display = "block";
    }

    // mutea el video reproducido y oculta el mismo boton
    function deactivateVolumeVideo() {
      mute();
      volume_on.value.style.display = "block";
      volume_off.value.style.display = "none";
    }

    // reproducimos el video de manera manual
    function playVideoAgain() {
      loadVideoById({
        videoId: movie_key.value,
        // establecemos el inicio del video en el segundo 7
        startSeconds: startSecondsVideo.value,
        // y su finalizacion al minuto y 5 segundos
        endSeconds: endSecondsVideo.value,
      });
    }

    // pausa la reproduccion del trailer del video si no esta activa la pagina
    // esto quiere decir que si se mueve a otra pestaña se pausara el video, en su
    // defecto cuando se vuelva a la pestaña el video continuara su reproduccion
    function pauseVideoIfNotActivePage() {
      document.addEventListener("visibilitychange", () => {
        // estado del video 0
        // cuando se cambie de pestaña si el video ya finalizo este no se reproduzca
        // a no ser que el usuario realize la accion con el boton
        if (flagEstateVideo.value == 0) {
          null;
        } else {
          // si la pestaña es visible se reproducira el video, en caso contrario
          // el video se pausara automaticamente al cambiar de pestaña, que es como
          // funciona actualmente la visualizacion en Netflix
          document.visibilityState === "visible" ? playVideo() : pauseVideo();
        }
      });
    }

    function onPlaybackQualityChange(event) {
      emit("playbackQualityChange", event.target);
    }

    function onPlaybackRateChange(event) {
      emit("playbackRateChange", event.target);
    }

    function onError(event) {
      emit("error", event.target);
    }

    function onApiChange(event) {
      emit("apiChange", event.target);
    }

    /**
     * @see https://developers.google.com/youtube/iframe_api_reference#playVideo
     */
    function playVideo() {
      player.value.playVideo();
    }
    /**
     * @see https://developers.google.com/youtube/iframe_api_reference#pauseVideo
     */
    function pauseVideo() {
      player.value.pauseVideo();
    }
    /**
     * @see https://developers.google.com/youtube/iframe_api_reference#mute
     */
    function mute() {
      player.value.mute();
    }
    /**
     * @see https://developers.google.com/youtube/iframe_api_reference#unMute
     */
    function unMute() {
      player.value.unMute();
    }
    /**
     * @returns {Boolean}
     * @see https://developers.google.com/youtube/iframe_api_reference#isMuted
     */
    function isMuted() {
      return player.value.isMuted();
    }
    /**
     * @param {String} videoId
     * @param {Number} startSeconds
     * @param {Number} endSeconds
     *
     * @returns void
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById
     */
    function loadVideoById({ videoId, startSeconds, endSeconds } = {}) {
      player.value.loadVideoById({ videoId, startSeconds, endSeconds });
    }

    return {
      flagVisualizationState,
      movie_title,
      movie_overview,
      playerId,
      resp_cert,
      onPlayerReady,
      onPlayerStateChange,
      onPlaybackQualityChange,
      onPlaybackRateChange,
      onError,
      onApiChange,
      deactivateVolumeVideo,
      activateVolumeVideo,
      playVideoAgain,
      flagDataRenderized,
    };
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* contenedor que se superpone */
#container_image {
  position: absolute;
  width: 100%;
  height: 50.5vw;
}

#container_info_movie {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
}

.info_movie {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.box-left {
  width: 40%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 4rem;
}

.box-right {
  height: 75%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

#cont_buttons button {
  padding: 0.9rem 1.5rem 0.9rem 1.5rem;
  border-style: none;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 3px;
  cursor: pointer;
}

#cont_buttons {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.button_rep {
  display: flex;
  align-items: center;
  background-color: #fff;
}

.button_rep:hover {
  background-color: #b4b2b2;
}

.button_info {
  display: flex;
  align-items: center;
  background-color: rgba(163, 161, 161, 0.5);
  color: #fff;
}

.button_info:hover {
  background-color: rgba(119, 117, 117, 0.5);
}

.icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.cont_sinopsis {
  text-align: left;
  color: #fff;
  /* oculta el texto cuando este se desborda */
  overflow: hidden;
  /* punto suspensivo al aplicar el overflow hidden del texto */
  text-overflow: ellipsis;
}

.cont_sinopsis p {
  font-weight: 500;
  margin-bottom: 1rem;
  cursor: default;
}

.title_movie h1 {
  color: #fff;
  font-size: 50px;
  cursor: default;
  text-align: left;
  text-shadow: 0.1em 0.1em 0.3em rgb(28, 27, 27);
}

#sinopsis {
  font-size: 1.4vw;
  transition: font-size 2.5s;
  text-shadow: 0.1em 0.1em 0.1em rgb(65, 64, 64);
}

.cont-cert {
  background-color: rgba(97, 96, 96, 0.5);
  padding: 0.7rem 4.3rem 0.7rem 1rem;
  border-left: 3px solid #bdbdbd;
}

.cont-cert p {
  color: #fff;
  font-size: 20px;
  cursor: default;
}

.cont-play-mute button {
  font-size: 20px;
  color: #fff;
  background-color: rgba(147, 146, 146, 0);
  border-style: none;
  padding: 10px;
  margin-right: 0.5rem;
  border-radius: 50%;
  border: 1px solid #c1c1c1;
}

.cont-play-mute button:hover {
  background-color: rgba(208, 206, 206, 0.2);
  cursor: pointer;
}

#button-mute {
  display: none;
}

#button-unMute {
  display: none;
}

#button-playVideo {
  display: none;
}

/* 400px aprox ya es mobile, probado con celular */
@media (min-width: 380px) and (max-width: 500px){
  #cont_buttons button {
    padding: 0.3rem .6rem 0.3rem .6rem;
    font-size: 0.6rem;
  }
  
  .icon {
    font-size: 1rem;
    margin-right: .5rem;
  }

  .box-left {
    width: 100%;
    height: 85%;
    margin-left: 1rem;
  }

  .box-right {
    height: 85%;
  }

  .info_movie {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .title_movie h1 {
    font-size: 20px;
    margin-bottom: .3rem;
  }

  .cont-cert {
    padding: 0.3rem 1.5rem 0.3rem 1rem;
  }

  .cont-cert p {
    font-size: 12px;
  }

  .cont-play-mute button {
    font-size: 10px;
  }

  .cont_sinopsis {
    display: none;
  }
}

@media (min-width: 501px) and (max-width: 889px) {
  .info_movie {
    height: 100%;
  }

  #cont_buttons button {
    padding: 0.2rem 1rem 0.2rem 1rem;
    font-size: 0.7rem;
  }

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
  }

  .box-left {
    width: 50%;
    height: 80%;
    margin-left: 2rem;
  }

  .box-right {
    height: 80%;
  }

  .title_movie h1 {
    font-size: 25px;
    margin-bottom: .5rem;
  }

  .cont-cert {
    padding: 0.3rem 1.5rem 0.3rem 1rem;
  }

  .cont-cert p {
    font-size: 18px;
  }

  .cont-play-mute button {
    font-size: 10px;
  }

  .cont_sinopsis {
    display: none;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  #cont_buttons button {
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .box-left {
    width: 50%;
    height: 80%;
    margin-left: 2rem;
  }

  .box-right {
    height: 80%;
  }

  .title_movie h1 {
    font-size: 35px;
  }

  .cont-cert {
    padding: 0.5rem 4rem 0.5rem 1rem;
  }

  .cont-play-mute button {
    font-size: 15px;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  #cont_buttons button {
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  #sinopsis {
    font-size: 18px;
  }

  .box-left {
    width: 50%;
    height: 80%;
    margin-left: 2rem;
  }

  .box-right {
    height: 80%;
  }

  .title_movie h1 {
    font-size: 40px;
  }

  .cont-cert {
    padding: 0.5rem 4rem 0.5rem 1rem;
  }

  .cont-play-mute button {
    font-size: 15px;
  }
}
</style>