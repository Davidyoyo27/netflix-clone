<template>
  <!-- id="embed_video" -->
  <!-- <img src="@/assets/poster-oficial-spider-man-no-way-home.jpg" alt=""> -->
  <div class="container">
    <div id="container_image">
      <div class="container_info_movie">
        <div class="info_movie">
          <div class="logo_movie">dasdsadsa</div>
          <div class="sinopsis">dadsdsadsadsadsdasdsadas</div>
          <div class="cont_buttons">
            <button class="button_rep">
              <font-awesome-icon class="icon" icon="fa-solid fa-play" />
              <span>Reproducir</span>
            </button>
            <button class="button_info">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
              <span>Más información</span>
            </button>
          </div>
          <!-- <div class="rep">
            <font-awesome-icon class="icon" icon="fa-solid fa-play" />
            <button>Reproducir</button>
          </div>
          <div class="info">
            <font-awesome-icon class="icon" icon="fa-solid fa-circle-info" />
            <button>Más información</button>
          </div> -->
          <!-- <div class="buttons">
          </div> -->
        </div>
      </div>
    </div>
    <div ref="youtube" :id="playerId"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const player = ref(null);
const props = defineProps({
  videoId: {
    type: String,
    required: false,
    default: "nNkw3Fo9Aqk",
  },
});

watch(
  () => props.videoId,
  (videoId) => {
    if (player.value && videoId) {
      console.log("watch", videoId);
      // loadVideoById({
      //   videoId,
      //   startSeconds: props.playerVars.start || 0,
      //   endSeconds: props.playerVars.end || 0,
      // });
      // cueVideoById({
      //   videoId,
      //   startSeconds: props.playerVars.start || 0,
      //   endSeconds: props.playerVars.end || 0,
      // });
    }
  }
);

// function validate(videoId) {
//   if (!videoId) {
//     console.error('s "videoId" must be provided.');
//   }
// }

const playerId = ref(null);
onMounted(async () => {
  //generar id de manera aleatoria
  //se genera de manera aleatoria el id del player, en este caso el <iframe>,
  //para poder visualizarlo ir al navegador y buscar la etiqueta <iframe> en el inspector
  // playerId.value = Math.random().toString(36).substring(2, 12);
  playerId.value = "reproductor";
  console.log("mounted", props.videoId);
  // validate(props.videoId);
  loadAPI().then(() => {
    checkIfYTLoaded().then(() => {
      createPlayer();
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
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve) => {
    setTimeout(() => {
      checkIfYTLoaded().then(() => {
        resolve();
      });
    }, 100);
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
function createPlayer() {
  // el platerElement con el                  playerId
  // const playerElement = document.getElementById(playerId.value);
  const playerElement = playerId.value;
  //
  const videoID = props.videoId;
  console.log("createPlayer", videoID);
  // capturamos el id del iframe cuando este se crea
  let video_style = document.getElementById("reproductor");
  // le pasamos el estilo de css mediante JS cuando el video ya este renderizado
  video_style.style.pointerEvents = "none";
  video_style.style.width = "100%";
  // asignamos el style con el heigh con viewport width, esto quiere decir que su "altura"
  // cambiara cuando se haga mas pequeña el tamaño de la ventana
  video_style.style.height = "43.25vw";
  // eslint-disable-next-line no-undef
  player.value = new YT.Player(playerElement, {
    // height: "900",
    // width: "100%",
    videoId: videoID,
    // playerVars: props.playerVars,
    playerVars: {
      mute: 1,
      autoplay: 1,
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
  console.log("la wea esta lista");
  let objeto = event.target;
  let data = objeto.h.attributes.title;
  let titulo = data.value;
  console.log("data", titulo);
}
function onPlayerStateChange(event) {
  switch (event.data) {
    case window.YT.PlayerState.PLAYING:
      emit("playing", event.target);
      img_container = document.getElementById("container_image");
      img_container.style.opacity = "0";
      console.log("la wea se esta reproduciendo", event.target);
      // let objeto = event.target;
      // let data = objeto.h.attributes;
      // console.log("data", data);
      break;
    case window.YT.PlayerState.PAUSED:
      emit("paused", event.target);

      // let url =
      //   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/2560px-Netflix_logo.svg.png";

      // let image = new Image();
      // image.src = url;
      // document.getElementById("container_image").appendChild(image);
      // console.log("si se puso la imageeeeen");
      // destroy();

      // let img = document.createElement("img");
      // img.src = "@/assets/poster-oficial-spider-man-no-way-home.jpg";
      // let src = document.getElementById("texto");
      // src.appendChild(img);

      console.log("la wea esta pausada");
      // window.alert("aca lo tomo");
      break;
    case window.YT.PlayerState.ENDED:
      emit("ended", event.target);

      let url =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Netflix_logo.svg/2560px-Netflix_logo.svg.png";

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

      // al finalizar el video usamos el destroy para quitarlo, ya que
      destroy();
      // img_container = document.getElementById("container_image");
      // img_container
      console.log("si se puso la imageeeeen");

      console.log("la wea finalizo");
      break;
  }
  emit("stateChange", event.target);
  // console.log("esta wea no se que es :B");
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
});
</script>

<style scoped>
/* -------------------------------------------------------- */
.container {
  position: relative;
  width: 100%;
}

#container_image {
  /* background-color: aqua; */
  position: absolute;
  width: 100%;
  height: 43vw;
  /* opacity: 0.3; */
}

/* .buttons {
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: 14rem;
  margin-left: 4rem;
  background-color: aqua;
} */

/* .rep {
  position: relative;
  display: flex;
  align-items: center;
} */

/* .info {
  position: relative;
  display: flex;
  align-items: center;
} */

.info .icon {
  color: #fff;
}

/* .icon {
  position: absolute;
} */

.rep button {
  padding: 0.9rem 2rem 0.9rem 4rem;
  border-style: none;
  background-color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.info button {
  padding: 0.9rem 2rem 0.9rem 4rem;
  border-style: none;
  background-color: #6d6a6a;
  color: #fff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 3px;
  cursor: pointer;
}

/* .buttons .info button {
  background-color: #6d6a6a;
  color: #fff;
} */

/* .buttons div .icon {
  left: 1.5rem;
  font-size: 1.8rem;
} */
/* -------------------------------------------------------- */
.container_info_movie {
  background-color: aqua;
  width: 40%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  /* z-index: 1; */
}

.info_movie {
  background-color: violet;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 4rem;
}

/* -------------------------------------------------------- */
.cont_buttons button {
  /* width: 150px; */
  padding: 0.9rem 1.5rem 0.9rem 1.5rem;
  border-style: none;
  /* background-color: #fff; */
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.cont_buttons {
  background-color: tomato;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.button_rep {
  display: flex;
  align-items: center;
  background-color: #fff;
  /* width: 13vw; */
}

.button_info {
  display: flex;
  align-items: center;
  background-color: #958f8f;
  color: #fff;
}

.icon {
  font-size: 2rem;
  margin-right: 1rem;
}

@media screen and (min-width: 390px) and (max-width: 889px) {
  .info_movie {
    background-color: yellow;
    margin-left: 2rem;
  }

  .cont_buttons button {
    /* width: 150px; */
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-style: none;
    /* background-color: #fff; */
    font-weight: 600;
    font-size: 0.7rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
  }

  .container_info_movie {
    width: 60%;
  }
}

@media screen and (min-width: 890px) and (max-width: 1129px) {
  .info_movie {
    background-color: purple;
    margin-left: 2rem;
  }

  .cont_buttons button {
    /* width: 150px; */
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-style: none;
    /* background-color: #fff; */
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .info_movie {
    background-color: springgreen;
    margin-left: 2rem;
  }

  .cont_buttons button {
    /* width: 150px; */
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-style: none;
    /* background-color: #fff; */
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

}
</style>