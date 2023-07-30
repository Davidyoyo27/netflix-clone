<template>
  <div class="wrapper">
    <div class="container">
      <div class="container_data">
        <!-- flagDataRenderized es para que mientras la data aun no sea visible 
                tanto los botones como, titulo, sinopsis o la certificacion no sera visible -->
        <div v-if="flagDataRenderized" class="data_movie">
          <div class="box_left">
            <div class="upper_data">
              <div class="title_movie">
                <h1>{{ titleMovie }}</h1>
              </div>
              <div class="cont_sinopsis">
                <p id="sinopsis">{{ overviewMovie }}</p>
              </div>
            </div>
            <div class="down_data">
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
          </div>
          <div class="box_right">
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
              <p>{{ certificationMovie }}</p>
            </div>
          </div>
        </div>
        <img id="background_image" :src="backgroundImageMovie" alt="" />
        <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
        <div class="video" ref="youtube" :id="playerId"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  // aca se reciben mediante las props la data que viene desde el componente padre
  // NOTA: si se desea exponer inmediatamente la data al template una vez que el componente padre ya la envio
  //       solo debe pasarse directamente al template, sin necesidad de que se pase al return{} o pasarlas a
  //       una variable en el onMounted para luego exponerla en el return, para ello ver el ejemplo de titleMovie o overviewMovie
  //       que una vez recibidas en el props se exponen inmediatamente en el template
  props: {
    // recibe la key del video desde el componente padre
    videoId: {
      type: String,
      required: true,
    },
    // objecto que contiene los parametros del reproductor de YouTube
    playerVars: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    // recibe el titulo del video desde el componente padre
    titleMovie: {
      type: String,
      required: true,
    },
    // recibe la sinopsis del video desde el componente padre
    overviewMovie: {
      type: String,
      required: true,
      default: "No hay sinopsis",
    },
    // recibe la imagen de fondo del video desde el componente padre
    backgroundImageMovie: {
      type: String,
      required: true,
    },
    // recibe la certificacion(12, 16, 18+, etc.) del video desde el componente padre
    certificationMovie: {
      type: String,
      required: true,
    },
    // recibe el id del video desde el componente padre
    idMovie: {
      type: Number,
      required: true,
    },
  },
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
  // setup( { emit }) solucion al error de arriba
  setup(props, { emit }) {
    // variable contenedora del reproductor
    const player = ref(null);
    // id del <iframe>
    const playerId = ref(null);
    const sinopsis = ref(null);
    const cont_img = ref(null);
    // variables contenedoras de los botones que interactuan con el video
    const reproducir = ref(null);
    const volume_on = ref(null);
    const volume_off = ref(null);
    // variables con la cantidad de segundos en que inicia y termina el trailer de la pelicula
    const startSecondsVideo = ref(7);
    const endSecondsVideo = ref(65);
    // bandera para tener el estado global de reproduccion del video
    const flagEstateVideo = ref(null);
    // bandera para ocultar la certificacion y los botones mientras aun no esta la carga completa de la data
    const flagDataRenderized = ref(false);

    onMounted(async () => {
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
        // key del trailer que viene por props
        videoId: props.videoId,
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

    function loadAPI() {
      if (document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
        // Youtube API script already added
        return Promise.resolve();
      }
      // 2. This code loads the IFrame Player API code asynchronously.
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      console.info("Youtube API script added to the HTML document.");
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
        // agregamos el setTimeout() con 2seg para evitar el problema de recursividad con las funciones
        setTimeout(() => {
          checkIfYTLoaded().then(() => {
            resolve();
          });
        }, 500); // cambio de 100 a 500 ms, anterior 2000
      });
    }

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    function createPlayer() {
      const playerElement = playerId.value;
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
      // cambiamos el estado de la bandera a true una vez se finalize la carga de todos los elementos con la data
      // y estos sean visibles
      flagDataRenderized.value = true;
      player.value = new YT.Player(playerElement, {
        videoId: props.videoId,
        playerVars: {
          start: startSecondsVideo.value,
          end: endSecondsVideo.value,
          mute: 1,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enableapi: 1,
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
      // player.value = event.target;
      // establecemos el nivel de volumen en 70 ya que este se mide de 0 a 100
      setVolume(70);
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
          // capturamos el id contenedor de la sinopsis
          sinopsis.value = document.getElementById("sinopsis");
          // settimeout para que cuando se reprodusca el trailer, luego de 3 seg se
          // quite la sinopsis de la pelicula
          setTimeout(() => {
            sinopsis.value.style.fontSize = "0vw";
            sinopsis.value.style.opacity = "0";
          }, 3000);
          // SE OCULTA LA IMAGEN DE FONDO DE LA PELICULA AL REPRODUCIRSE EL VIDEO
          // capturamos el elemento que contiene la imagen de fondo de la pelicula
          cont_img.value = document.getElementById("background_image");
          // pasamos el estilo de CSS ocultando el contenedor con la imagen de la pelicula
          cont_img.value.style.visibility = "hidden";
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
          // el texto de la sinopsis vuelve a hacerse grande una vez finalizado el video
          sinopsis.value.style.fontSize = "1.5vw";
          // es visible el texto de la sinopsis
          sinopsis.value.style.opacity = "1";
          // una vez finalizado la pre-visualizacion volvemos a mostrar la imagen de fondo
          cont_img.value.style.visibility = "visible";
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
     * @param {Number} volume
     *
     * @see https://developers.google.com/youtube/iframe_api_reference#setVolume
     */
    function setVolume(volume) {
      player.value.setVolume(volume);
    }

    /**
     * @param {String} videoId
     * @param {Number} startSeconds
     * @param {Number} endSeconds
     *
     * @returns void
     * @see https://developers.google.com/youtube/iframe_api_reference#loadVideoById
     */
    function loadVideoById({ videoId, startSeconds, endSeconds }) {
      return player.value.loadVideoById({ videoId, startSeconds, endSeconds });
    }

    return {
      player,
      playerId,
      playVideo,
      pauseVideo,
      mute,
      unMute,
      isMuted,
      setVolume,
      loadVideoById,
      playVideoAgain,
      deactivateVolumeVideo,
      activateVolumeVideo,
      flagDataRenderized,
    };
  },
};
</script>

<style scoped>
.container_data {
  position: relative;
}

.container_data .video {
  position: absolute;
}

#background_image {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  pointer-events: none;
}

.data_movie {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.box_right {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 1;
}

.box_left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 50%;
  color: #fff;
  margin-left: 4rem;
  z-index: 1;
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

.upper_data {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: left;
  margin-bottom: 1.5rem;
  width: 100%;
  height: 100%;
}

.title_movie h1 {
  font-size: 50px;
  margin-bottom: 1.5rem;
  text-shadow: 0.1em 0.1em 0.3em rgb(28, 27, 27);
  cursor: default;
}

.cont_sinopsis p {
  cursor: default;
}

#sinopsis {
  font-size: 1.4vw;
  overflow: hidden;
  transition: font-size 1.5s;
  text-shadow: 0.1em 0.1em 0.1em rgb(65, 64, 64);
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

@media (min-width: 390px) and (max-width: 889px) {
  #cont_buttons button {
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-style: none;
    font-weight: 600;
    font-size: 0.7rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
  }

  .box_left {
    margin-left: 2rem;
  }

  .title_movie h1 {
    font-size: 30px;
  }

  .cont-cert {
    padding: 0.3rem 1.5rem 0.3rem 1rem;
  }

  .cont-cert p {
    color: #fff;
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
    border-style: none;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .box_left {
    height: 60%;
    margin-left: 2rem;
  }

  .box_right {
    height: 60%;
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
    border-style: none;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  #sinopsis {
    font-size: 18px;
  }

  .box_left {
    height: 60%;
    margin-left: 2rem;
  }

  .box_right {
    height: 60%;
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