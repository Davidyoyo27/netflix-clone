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
              <button v-on:click="openInfoMovie" class="button_info">
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
            <div v-if="flagCertification" class="cont-cert">
              <p>{{ resp_cert }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div ref="youtube" :id="playerId"></div>
    <!-- ================================= mas informacion ================================= -->
    <!-- <div class="cont-info">
      <div ref="youtube" :id="playerId"></div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, placeat
        porro culpa ullam quae inventore odit ipsam eligendi quisquam architecto
        non! A et dolores, optio autem veniam repellat ut assumenda. Libero ab
        aut provident saepe pariatur a sunt? Aliquam consectetur blanditiis
        recusandae nobis maiores eum mollitia sit vel dignissimos voluptatibus.
        Mollitia quas officia non, fugit quae dolores nihil magni laudantium?
        Culpa error cumque laborum voluptas velit officiis harum inventore minus
        optio eaque? Laborum blanditiis impedit beatae! Tenetur cumque sequi
        enim, cum non doloremque? Modi quisquam ullam vero quod reprehenderit
        maxime? Eveniet labore, nulla saepe est fugiat dignissimos ad
        necessitatibus error consectetur ipsa natus aperiam eaque quas similique
        illum minima! Cumque nulla ab dignissimos unde dolorum, rerum natus
        ullam maiores eos. Beatae voluptates enim itaque. Alias similique quia
        harum accusamus consequatur voluptas exercitationem vero aut velit ipsum
        debitis, possimus odit aliquam fugit quasi eius mollitia ab laborum
        dolore adipisci repudiandae voluptatibus.
      </p>
    </div> -->
    <!-- =============================== fin mas informacion =============================== -->
  </div>
</template>

<!-- composition API -->
<script setup>
import { onMounted, ref, onBeforeMount } from "vue";
import services from "@/helpers/services/services.js";
import { getPageRandom, getNumberRandom } from "@/helpers/js/functions.js";
import { numMax, numMin } from "@/helpers/js/variables.js"

/// inicializacion de las variables a usar
// variable contenedora del reproductor
const player = ref(null);
// id del <iframe>
const playerId = ref(null);
// variables que contienen los datos de la API
const dataArray = ref([]);
const dataSorted = ref([]);
const idSorted = ref(0);
const params_movie = ref([]);
const movie_key = ref("");
const movie_title = ref("");
const movie_overview = ref("");
const movie_backdrop_link = ref("https://image.tmdb.org/t/p/original");
const movie_backdrop_key = ref("");
const movie_backdrop_image = ref("");
// variables que muestran los datos en pantalla
const buttons = ref(null);
const resp_certification = ref(null);
const resp_cert = ref("");
const flagCertification = ref(false);
// contenido de info de las peliculas
const cont_info_movie = ref(null);
const cont_img = ref(null);
const sinopsis = ref(null);
// botones de accion de silenciar/activar sonido/reproducir
const mutear = ref(null);
const desmutear = ref(null);
const reproducir = ref(null);
// bandera para tener el estado de reproduccion del video
const flagEstate = ref(null);

// utilizamos el onBeforeMount ya que es el que se renderiza primero dentro del Ciclo de Vida de los componentes
onBeforeMount(async () => {
  // accedemos al endpoint pasandole por parametro la funcion que manda la pagina aleatoria
  await services.movie_info(getPageRandom(numMax, numMin))
    .then((response) => {
      dataArray.value = response.data.results;
      // se toma el array con los datos de las peliculas y este se "mezcla" con la funcion getNumberRandom
      // para que el valor que tomemos sea al azar que seria el de la primera posicion [0]
      dataSorted.value = dataArray.value.sort(getNumberRandom);
      // existen algunas imagenes de fondo que vienen vacias, en caso de ser asi, se vuelve a generar una mezcla
      // del array para obtener otro resultado
      (dataSorted.value[0].backdrop_path === null) ? dataSorted.value = dataArray.value.sort(getNumberRandom) : null;
      // obtenemos el id de la pelicula, el cual sera usado mas abajo
      idSorted.value = dataSorted.value[0].id;
      // obtenemos la key del fondo de la imagen
      movie_backdrop_key.value = dataSorted.value[0].backdrop_path;
      // tomamos el link anterior y lo unimos al resto de la ruta para generar el link de la imagen completa
      movie_backdrop_image.value =
        movie_backdrop_link.value + movie_backdrop_key.value;
      getImageBackground();
      setTimeout(() => {
        // capturamos el id del contenedor de los botones
        buttons.value = document.getElementById("cont_buttons");
        // hacemos visible los botones
        buttons.value.style.visibility = "visible";
        // titulo de la pelicula
        movie_title.value = dataSorted.value[0].title;
        // sinopsis de la pelicula
        movie_overview.value = dataSorted.value[0].overview;
      }, 500);
    })
    .catch((error) => {
      throw error.message;
    });

  // le pasamos la variable idSorted que es la que contiene el id de la pelicula
  await services
    .movie_video_start(idSorted.value)
    .then((response) => {
      params_movie.value = response.data.results;
      movie_key.value = params_movie.value[0].key;
    })
    .catch((error) => {
      throw error.message;
    });

  // obtenemos la info de la certificacion(+18, 16, 14, etc.)
  await services
    .movie_certification(idSorted.value)
    .then((response) => {
      resp_certification.value = response.data.results[0].release_dates;
      // obtenemos el valor string de la certificacion
      resp_cert.value = resp_certification.value[0].certification;
      // operador ternario
      // si el contenido de la variable resp_cert que es .certification esta vacia
      // a la variable resp_cert se le pasara el valor "vacio", por el contrario,
      // si la variable ya contiene informacion, esta se retornara con su valor correspondiente
      resp_cert.value === "" ? (resp_cert.value = "vacío") : resp_cert.value;
      // una vez obtenida la info de la certificacion(+18, 16, 14, etc.) esta se muestra en pantalla
      flagCertification.value = true;
    })
    .catch((error) => {
      throw error.message;
    });
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
  // eslint-disable-next-line no-undef
  player.value = new YT.Player(playerElement, {
    videoId: videoID,
    playerVars: {
      start: 7,
      end: 65,
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
      sinopsis.value.style.fontSize = "0vw";
      sinopsis.value.style.opacity = "0";

      // se oculta el reproducir de nuevo del video mientras este se reproduce
      reproducir.value = document.getElementById("button-playVideo");
      reproducir.value.style.display = "none";
      // capturamos el id del boton mutear
      mutear.value = document.getElementById("button-mute");
      // usamos el metodo isMuted() el cual arrojara un true si el video reproducido esta en muteado
      //  y false si el video reproduciendose no esta muteado, esto para mostrar el mutear o desmutear
      // segun corresponda
      if (isMuted() === true) {
        desmutear.value = document.getElementById("button-unMute");
        desmutear.value.style.display = "block";
      } else {
        mutear.value.style.display = "block";
      }
      // asignamos el valor de reproduciendo del estado del reproductor a la variable para
      // usarla en la funcion pauseVideoIfNotActivePage()
      flagEstate.value = window.YT.PlayerState.PLAYING;
      pauseVideoIfNotActivePage();
      break;
    case window.YT.PlayerState.PAUSED:
      emit("paused", event.target);
      // asignamos el valor de pausa del estado del reproductor a la variable para
      // usarla en la funcion pauseVideoIfNotActivePage()
      flagEstate.value = window.YT.PlayerState.PAUSED;
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
      desmutear.value.style.display = "none";
      mutear.value.style.display = "none";
      // es visible el boton de volver a reproducir al finalizar el video
      reproducir.value.style.display = "block";
      // asignamos el valor de pausa del estado del reproductor a la variable para
      // usarla en la funcion pauseVideoIfNotActivePage()
      flagEstate.value = window.YT.PlayerState.ENDED;
      break;
  }
  emit("stateChange", event.target);
}

// desmutea el video reproducido y oculta el mismo boton
function activateVolumeVideo() {
  unMute();
  desmutear.value.style.display = "none";
  mutear.value.style.display = "block";
}

// mutea el video reproducido y oculta el mismo boton
function deactivateVolumeVideo() {
  mute();
  desmutear.value.style.display = "block";
  mutear.value.style.display = "none";
}

// reproducimos el video de manera manual
function playVideoAgain() {
  loadVideoById({
    videoId: movie_key.value,
    // establecemos el inicio del video en el segundo 7
    startSeconds: 7,
    // y su finalizacion al minuto y 5 segundos
    endSeconds: 65,
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
    if (flagEstate.value == 0) {
      null;
    } else {
      // si la pestaña es visible se reproducira el video, en caso contrario
      // el video se pausara automaticamente al cambiar de pestaña, que es como
      // funciona actualmente la visualizacion en Netflix
      document.visibilityState === "visible" ? playVideo() : pauseVideo();
    }
  });
}

function openInfoMovie() {
  let video = document.getElementById("reproductor");
  video.style.height = "600px"
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
	player.value.stopVideo()
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
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getDuration
 */
function getDuration() {
  return player.value.getDuration();
}
/**
 * @returns {Number}
 * @see https://developers.google.com/youtube/iframe_api_reference#getPlayerState
 */
function getPlayerState() {
  return player.value.getPlayerState();
}
/**
 * @return {Object}
 * @see https://developers.google.com/youtube/iframe_api_reference#getIframe
 */
function getIframe() {
  return player.value.getIframe();
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
defineExpose({
  player,
  playVideo,
  pauseVideo,
  stopVideo,
  mute,
  unMute,
  isMuted,
  getDuration,
  getPlayerState,
  getIframe,
  loadVideoById,
});
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
  margin-left: 4rem;
  gap: 20px;
}

.box-left {
  width: 40%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
}

.box-right {
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

/* ===================================== mas informacion =================================== */
/* .cont-info {
  background-color: cadetblue;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 2rem;
  z-index: 1;
} */
/* =================================== fin mas informacion ================================= */

@media screen and (min-width: 390px) and (max-width: 889px) {
  .info_movie {
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

  .cont_sinopsis {
    display: none;
  }

  /* ===================================== mas informacion =================================== */
  /* .cont-info {
    width: 80%;
  } */
  /* =================================== fin mas informacion ================================= */
}

@media screen and (min-width: 890px) and (max-width: 1129px) {
  .info_movie {
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

  /* ===================================== mas informacion =================================== */
  /* .cont-info {
    width: 80%;
  } */
  /* =================================== fin mas informacion ================================= */
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .info_movie {
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

  /* ===================================== mas informacion =================================== */
  /* .cont-info {
    width: 70%;
  } */
  /* =================================== fin mas informacion ================================= */
}
</style>
