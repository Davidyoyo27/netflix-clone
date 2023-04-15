<template>
  <div class="container">
    <div id="container_image">
      <div id="container_info_movie">
        <div class="info_movie">
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
            <div v-if="flagCertificacion" class="cont-cert">
              <p>{{ resp_cert }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="youtube" :id="playerId"></div>
  </div>
</template>

<script setup>
// hacer lo de pasar todos los estilos a un archivo, para luego llamar a ese archivo con sus respectivas constantes con los parametros de css
// y enviar la variable a cada punto del codigo segun se necesite
import { onMounted, ref, onBeforeMount } from "vue";
import services from "@/helpers/services/services.js";

/// inicializacion de las variables a usar
//variable contenedora del reproductor
const player = ref(null);
//id del <iframe>
const playerId = ref(null);
//variables de la cantidad de paginas existentes en la API
let numMax = 501;
let numMin = 1;
//variables que contienen los datos de la API
const respAxios = ref(null);
const dataArray = ref([]);
const dataSorted = ref([]);
const idSorted = ref(0);
const resp_video_movie = ref(null);
const params_movie = ref([]);
const movie_key = ref("");
const movie_title = ref("");
const movie_overview = ref("");
const movie_backdrop_link = ref("https://image.tmdb.org/t/p/original");
const movie_backdrop_key = ref("");
const movie_backdrop_image = ref("");
const buttons = ref(null);
const resp_certification = ref(null);
const datos = ref([]);
const resp_cert = ref("");
const flagCertificacion = ref(false);
// botones play video, subir volumen, bajar volumen
// const mutear = ref(document.getElementById("button-mute"));
// const desmutear = ref(document.getElementById("button-unMute"));
// const reproducir = ref(document.getElementById("button-playVideo"));

// utilizamos el onBeforeMount ya que es el que se renderiza primero dentro del Ciclo de Vida de los componentes
onBeforeMount(async () => {
  try {
    console.log("1-. se cargo altirooooooo");
    respAxios.value = await services.movie_info(getPageRandom(numMax, numMin));
    console.log("1.1-. prueba api", respAxios.value);
    dataArray.value = respAxios.value.data.results;
    dataSorted.value = dataArray.value.sort(getNumberRandom);
    if (dataSorted.value[0].backdrop_path === null) {
      console.log("backdrop_path vacio");
      dataSorted.value = dataArray.value.sort(getNumberRandom);
      console.log("nuevos datos", dataSorted.value);
      console.log("datos generados nuevamente");
    }
    idSorted.value = dataSorted.value[0].id;
    console.log("id", idSorted.value);
    movie_backdrop_key.value = dataSorted.value[0].backdrop_path;
    movie_backdrop_image.value =
      movie_backdrop_link.value + movie_backdrop_key.value;
    getImageBackground();
    // retrasamos 0.5seg la respuesta a los datos del titulo y la sinopsis
    // para sincronizarlo de mejor manera con el fondo de la pelicula
    setTimeout(() => {
      buttons.value = document.getElementById("cont_buttons");
      buttons.value.style.visibility = "visible";
      movie_title.value = dataSorted.value[0].title;
      movie_overview.value = dataSorted.value[0].overview;
    }, 500);
    console.log("1.2-. imagen final link -", movie_backdrop_image.value);
    resp_video_movie.value = await services.movie_video_start(idSorted.value);
    params_movie.value = resp_video_movie.value.data.results;
    movie_key.value = params_movie.value[0].key;
    console.log("1.3-. holaa", params_movie.value[0].key);

    resp_certification.value = await services.movie_certification(
      idSorted.value
    );
    datos.value = resp_certification.value.data.results[0].release_dates;
    resp_cert.value = datos.value[0].certification;
    console.log("a", resp_cert.value);
    // operador ternario
    // si el contenido de la variable resp_cert que es .certification esta vacia
    // a la variable resp_cert se le pasara el valor "vacio", por el contrario,
    // si la variable ya contiene informacion, esta se retornara con su valor correspondiente
    resp_cert.value === "" ? (resp_cert.value = "vacío") : resp_cert.value;
    flagCertificacion.value = true;

    // (screen.width >= 1330) ? window.alert("rosa") : null;
    // (screen.width <= 1329 && screen.width >= 1130) ? window.alert("verde") : null;
    // (screen.width <= 1129 && screen.width >= 890) ? window.alert("purpura") : null;
    // (screen.width <= 889) ? window.alert("amarillo") : null;

    console.log("10-. se muestra si o si");
  } catch (error) {
    console.log("error", error);
  }
});

onMounted(async () => {
  // asignar el id al <iframe>
  playerId.value = "reproductor";
  loadAPI().then(() => {
    checkIfYTLoaded().then(() => {
      // esperamos a que onBeforeMount obtenga la key
      //del video para pasarsela a la variable de videoID
      // si no es asi, la videoID siempre estara vacia, ya que
      // el reproductor se creara antes de consultar la informacion de la API
      setTimeout(() => {
        createPlayer();
      }, 4000);
    });
  });
});

function loadAPI() {
  if (
    document.querySelector("script[src='https://www.youtube.com/iframe_api']")
  ) {
    console.info("Youtube API script already added");
    return Promise.resolve();
  }
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
  console.info("Youtube API script added");
  return Promise.resolve();
}

function checkIfYTLoaded() {
  if (window.YT && window.YT.Player) {
    console.info("Youtube API loaded", window.YT);
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
    }, 1000);
  });
}

const emit = defineEmits([
  "ready",
  "playing",
  "paused",
  "ended",
  "stateChange",
  "playbackQualityChange",
  "playbackRateChange",
  "error",
  "apiChange",
]);

// generamos un numero random entre una cantidad especifica
// max: 500, min: 1
// estos valores son la cantidad de paginas de la API
function getPageRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

// funcion para mezclar el array aleatoriamente con el sort
function getNumberRandom() {
  return 0.5 - Math.random();
}

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
  console.log("2-. imagen de fondo lista");
}

function createPlayer() {
  // el platerElement con el                  playerId
  // const playerElement = document.getElementById(playerId.value);
  const playerElement = playerId.value;
  // creamos videoID que es la variable que contendra la key del video
  const videoID = movie_key.value;
  console.log("createPlayer", videoID);
  // capturamos el id del iframe cuando este se crea
  let video_style = document.getElementById("reproductor");
  // le pasamos el estilo de css mediante JS cuando el video ya este renderizado
  // desactivamos la interaccion con el reproductor del video click derecho e izquierdo
  video_style.style.pointerEvents = "none";
  video_style.style.width = "100%";
  // asignamos el style con el heigh con viewport width, esto quiere decir que su "altura"
  // cambiara cuando se haga mas pequeña el tamaño de la ventana en base al ancho de la pantalla
  // como se especifica con el vw(viewport width)
  video_style.style.height = "58.25vw";
  // eslint-disable-next-line no-undef
  player.value = new YT.Player(playerElement, {
    videoId: videoID,
    playerVars: {
      start: 10, //5
      end: 60, //65
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

function onPlayerReady(event) {
  emit("ready", event.target);
  // console.log("esta listo");
  let objeto = event.target;
  // console.log("event.target -", event.target);
  let data = objeto.h.attributes.title;
  let titulo = data.value;
  console.log("titulo del video -", titulo);
  // esperamos 5 segundos a visualizar el fondo de la pelicula
  // para luego reproducir el trailer
  setTimeout(() => {
    playVideo();
    console.log("se reprodujo aqui con el metodo despues de 5 segundos");
  }, 5000);
}

const cont_info_movie = ref(null);
const cont_img = ref(null);
const sinopsis = ref(null);
// const button_unMute = ref(null);
// const button_mute = ref(null);
// const button_playVideo = ref(null);
const mutear = ref(null);
const desmutear = ref(null);
const reproducir = ref(null);

function onPlayerStateChange(event) {
  switch (event.data) {
    case window.YT.PlayerState.PLAYING:
      emit("playing", event.target);
      // SE OCULTA LA INFO DE LA PELICULA
      // capturamos el elemento contenedor con los datos de la pelicula visualizada
      cont_info_movie.value = document.getElementById("container_info_movie");
      // pasamos el estilo de CSS ocultando el contenedor con la info mientras el video se reproduce
      cont_info_movie.value.style.visibility = "visible";
      // SE OCULTA LA IMAGEN DE FONDO DE LA PELICULA
      // capturamos el elemento que contiene la imagen de fondo de la pelicula
      cont_img.value = document.getElementById("container_image");
      // pasamos el estilo de CSS ocultando el contenedor con la imagen de la pelicula
      cont_img.value.style.visibility = "hidden";
      sinopsis.value = document.getElementById("sinopsis");
      sinopsis.value.style.fontSize = "0vw";
      sinopsis.value.style.opacity = "0";

      // FUNCA
      // button_unMute.value = document.getElementById("button-unMute");
      // button_unMute.value.style.display = "block";
      //
      // reproducir.value.style.display = "none";

      // console.log("llamando funcion isMuted", isMuted());
      reproducir.value = document.getElementById("button-playVideo");
      mutear.value = document.getElementById("button-mute");
      if (isMuted() === true) {
        desmutear.value = document.getElementById("button-unMute");
        desmutear.value.style.display = "block";
        console.log("esta muteadooo");
      } else {
        // mutear.value = document.getElementById("button-mute");
        // mutear.value.style.display = "none";
        mutear.value.style.display = "block";
        console.log("nooo esta muteadooo");
      }

      console.log("se esta reproduciendo", event.target);
      break;
    case window.YT.PlayerState.PAUSED:
      emit("paused", event.target);
      console.log("se ha pausado");
      break;
    case window.YT.PlayerState.ENDED:
      emit("ended", event.target);
      cont_img.value.style.visibility = "visible";
      sinopsis.value.style.fontSize = "1.5vw";
      sinopsis.value.style.opacity = "1";

      // FUNCA
      // button_playVideo.value = document.getElementById("button-playVideo");
      // button_playVideo.value.style.display = "block";
      // desmutear.value.style.display = "none";
      //
      // reproducir.value = document.getElementById("button-playVideo");
      // reproducir.value.style.display = "block";

      desmutear.value.style.display = "none";
      mutear.value.style.display = "none";
      reproducir.value.style.display = "block";
      // if(isMuted() === true){
      //   console.log("esta muteadooo");
      // }else{
      //   console.log("nooo esta muteadooo");
      // }

      console.log("finalizo el video");
      break;
  }
  emit("stateChange", event.target);
  // console.log("esta wea no se que es :B");
  // console.log("ver aca", isMuted());
  console.log("11-. duracion del video -", getDuration());
}

function activateVolumeVideo() {
  unMute();
  desmutear.value.style.display = "none";
  mutear.value.style.display = "block";
  // let desmutear = document.getElementById("button-unMute");
  // desmutear.style.display = "none";
  // let mutear = document.getElementById("button-mute");
  // mutear.style.display = "block";
  // desmutear.value.style.display = "none";
}

function deactivateVolumeVideo() {
  mute();
  desmutear.value.style.display = "block";
  mutear.value.style.display = "none";
  // let mutear = document.getElementById("button-mute");
  // mutear.style.display = "none";
  // let desmutear = document.getElementById("button-unMute");
  // desmutear.style.display = "block";
}

function playVideoAgain() {
  playVideo({
    startSeconds: 10,
    endSeconds: 60,
  });
  reproducir.value.style.display = "none";
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
 * @see https://developers.google.com/youtube/iframe_api_reference#stopVideo
 */
function stopVideo() {
  player.value.stopVideo();
}
/**
 * @param {Number} seconds
 * @param {Boolean} allowSeekAhead
 *
 * @see https://developers.google.com/youtube/iframe_api_reference#seekTo
 */
function seekTo(seconds, allowSeekAhead) {
  player.value.seekTo(seconds, allowSeekAhead);
}
/**
 * @param {Number} index
 * @see https://developers.google.com/youtube/iframe_api_reference#playVideoAt
 */
function playVideoAt(index) {
  player.value.playVideoAt(index);
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
 * @see https://developers.google.com/youtube/iframe_api_reference#getVolume
 * @returns {Number}
 */
function getVolume() {
  return player.value.getVolume();
}
/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getDuration
 */
function getDuration() {
  return player.value.getDuration();
}
/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getCurrentTime
 */
function getCurrentTime() {
  return player.value.getCurrentTime();
}
/**
 * @returns {String}
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode
 */
function getVideoEmbedCode() {
  return player.value.getVideoEmbedCode();
}
/**
 * @returns {Number} Floating point number between 0 and 1
 * @see https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction
 */
function getVideoLoadedFraction() {
  return player.value.getVideoLoadedFraction();
}
/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlayerState
 */
function getPlayerState() {
  return player.value.getPlayerState();
}
/**
 * retrieves an array of module names for which you can set player options
 *
 * @returns {Object}
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function getOptions() {
  return player.value.getOptions();
}
/**
 * retrieves the value of a specific player option
 *
 * @param module
 * @param option
 *
 * @return {*}
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function getAnOption(module, option) {
  return player.value.getOption(module, option);
}
/**
 * sets the value of a specific player option
 *
 * @param module
 * @param option
 * @param value
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#onApiChange
 */
function setAnOption(module, option, value) {
  player.value.setOption(module, option, value);
}
/**
 * @return {Object}
 * @see https://developers.google.com/youtube/iframe_api_reference#getIframe
 */
function getIframe() {
  return player.value.getIframe();
}
/**
 * @see https://developers.google.com/youtube/iframe_api_reference#destroy
 */
function destroy() {
  player.value.destroy();
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
/**
 * @param {String} videoId
 * @param {Number} startSeconds
 * @param {Number} endSeconds
 *
 * @returns void
 * @see https://developers.google.com/youtube/iframe_api_reference#cueVideoById
 */
function cueVideoById({ videoId, startSeconds, endSeconds } = {}) {
  player.value.cueVideoById({ videoId, startSeconds, endSeconds });
}
defineExpose({
  player,
  playVideo,
  pauseVideo,
  stopVideo,
  seekTo,
  playVideoAt,
  mute,
  unMute,
  isMuted,
  setVolume,
  getVolume,
  getDuration,
  getCurrentTime,
  getVideoEmbedCode,
  getVideoLoadedFraction,
  getPlayerState,
  getOptions,
  getAnOption,
  setAnOption,
  getIframe,
  destroy,
  loadVideoById,
  cueVideoById,
  //
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
}

/* contenedor que se superpone */
#container_image {
  position: absolute;
  width: 100%;
  height: 58.5vw;
  /* background-color: bisque; */
  /* opacity: 0.2; */
}

#container_info_movie {
  /* background-color: aqua; */
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
}

.info_movie {
  /* background-color: violet; */
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* flex-direction: column; */
  /* justify-content: center; */
  margin-left: 4rem;
  /* margin: 0rem 4rem 0rem 4rem; */
  gap: 20px;
  /* visibility: hidden; */
}

.box-left {
  /* background-color: purple; */
  width: 40%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
}

.box-right {
  /* background-color: slateblue; */
  width: 50%;
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
  /* background-color: tomato; */
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  visibility: hidden;
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
  /* background-color: #958f8f; */
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
  /* font-size: 23px; */
  font-weight: 500;
  cursor: default;
}

.title_movie h1 {
  color: #fff;
  font-size: 50px;
  cursor: default;
  text-align: left;
}

#sinopsis {
  font-size: 1.4vw;
  transition: font-size 2.5s;
  /* opacity: 1; */
  text-shadow: 0.1em 0.1em 0.1em rgb(65, 64, 64);
}

.cont-cert {
  /* color de fondo transparente */
  background-color: rgba(97, 96, 96, 0.5);
  padding: 0.7rem 4.3rem 0.7rem 1rem;
  border-left: 3px solid #bdbdbd;
}

.cont-cert p {
  color: #fff;
  font-size: 20px;
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

#button-mute {
  display: none;
}

#button-unMute {
  display: none;
}

#button-playVideo {
  display: none;
}

@media screen and (min-width: 390px) and (max-width: 889px) {
  .info_movie {
    /* background-color: yellow; */
    margin-left: 2rem;
    height: 100%;
  }

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

  .box-left {
    width: 50%;
    height: 80%;
  }

  .box-right {
    height: 80%;
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
}

@media screen and (min-width: 890px) and (max-width: 1129px) {
  .info_movie {
    /* background-color: salmon; */
    margin-left: 2rem;
  }

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

  .box-left {
    width: 50%;
    height: 80%;
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

@media (min-width: 1130px) and (max-width: 1330px) {
  .info_movie {
    /* background-color: springgreen; */
    margin-left: 2rem;
  }

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

  .box-left {
    width: 50%;
    height: 80%;
  }

  .box-right {
    height: 80%;
  }

  .cont-cert {
    padding: 0.5rem 4rem 0.5rem 1rem;
  }

  .cont-play-mute button {
    font-size: 15px;
  }

}
</style>
