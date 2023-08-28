<template>
  <div v-show="FlagVisibleElements">
    <div id="top_bar">
      <TitleSerie :titleSerie="titleSerie"></TitleSerie>
      <div class="box_right">
        <div class="icon_right">
          <font-awesome-icon class="icon" icon="fa-solid fa-align-left" />
        </div>
        <div class="icon_right">
          <!--                                                          fed = filtros endpoint -->
          <router-link :to="{ name: 'visualizar_todas_series', query: { fed: encryptedData } }">
            <font-awesome-icon
              class="icon"
              icon="fa-solid fa-table-cells-large"
            />
          </router-link>
        </div>
      </div>
    </div>
    <div class="container_principal">
      <div class="cont_video">
        <EmbedVideoPlayer
          :idMovie="id"
          :titleMovie="title"
          :overviewMovie="overview"
          :backgroundImageMovie="backdrop"
          :certificationMovie="certification"
          :videoId="keyTrailer"
          :timeVideoId="dataTimeVideoKey"
        ></EmbedVideoPlayer>
      </div>
    </div>
    <div class="cont_carousels">
      <div class="carousels">
        <PruebaColeccionCarruselesSeriesXGeneros></PruebaColeccionCarruselesSeriesXGeneros>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch, defineAsyncComponent } from "vue";
import services from "@/helpers/services/services";
import { getPageRandom, cutText, convertDurationToSeconds, decryptData, encryptData } from "@/helpers/js/functions";
import { useRoute } from "vue-router";

export default {
  components: {
    EmbedVideoPlayer: defineAsyncComponent(() => import(/* webpackChunkName: "EmbedVideoPlayer.vue" */ "@/components/EmbedVideoPlayer")),
    PruebaColeccionCarruselesSeriesXGeneros: defineAsyncComponent(() => import(/* webpackChunkName: "PruebaColeccionCarruselesSeriesXGeneros.vue" */ "@/components/series/PruebaColeccionCarruselesSeriesXGeneros")),
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Footer.vue" */ "@/components/Footer")),
    TitleSerie: defineAsyncComponent(() => import(/* webpackChunkName: "TitleSerie.vue" */ "@/components/series/TitleSerie")),
  },
  setup() {
    // key del trailer de youtube pelicula/serie
    const keyTrailer = ref("");
    // titulo de la pelicula/serie
    const title = ref("");
    // sinopsis de pelicula/serie
    const overview = ref("");
    // imagen de fondo de pelicula/serie
    const backdrop = ref("");
    const movieBackdropLink = ref("https://image.tmdb.org/t/p/original");
    // certificacion pelicula/serie
    const certification = ref("");
    // id pelicula/serie
    const id = ref(0);
    // variable que contendra el valor del scroll al moverse
    // inicializada en 0
    const scrollTop = ref(0);
    // duracion segundos de pelicula/serie
    const dataTimeVideoKey = ref(0);
    // bandera para ocultar los elementos hasta que la data este completa
    const FlagVisibleElements = ref(false);
    // usamos el route para traer la data que viene desde la url
    const route = useRoute();
    // recibimos la data que viene desde el query params desde la url
    const receivedObject = route?.query?.mo || "vacio";
    // titulo de la serie que le pasaremos al componente <TitleSerie>
    const titleSerie = ref("");

    // const encryptedFilters = ref(null);
    const encryptedData = ref(null);

    // creamos la funcion
    function handleScroll() {
      // que contendra el valor del scrollY que en este caso es cuando
      // se haga scroll vertical para luego asignarsela a la variable scrollTop
      scrollTop.value = window.scrollY;
    }

    onMounted(async () => {
      // agregamos un escuchador que este atento a la interaccion del scroll
      // y le pasamos la funcion handleScroll
      window.addEventListener("scroll", handleScroll);
      // recibimos la data encryptada que viene desde la url y la desencryptamos
      const dataDecrypted = decryptData(receivedObject);
      // tomamos la data desencriptada y la parseamos con JSON para convertir esa cadena de texto
      // en el objeto y poder manipularlo
      const dataObject = JSON.parse(dataDecrypted);
      // titulo de la serie
      titleSerie.value = dataObject.titleName;
      // filtros del endpoint
      const filtersEndpoint = dataObject.endpointFilters;
      // cantidad de paginas maximas del endpoint
      const pageMax = dataObject.pageMax;

      // creamos el objeto que sera la data que se necesita pasar por url
      const objectData = {
        title: titleSerie.value,
        filters: filtersEndpoint,
      };

      // tomamos el objeto, lo convertimos a texto plano y encryptamos la data que sera pasada por la url
      encryptedData.value = encryptData(JSON.stringify(objectData));

      // realizamos el llamado al servicio que es el endpoint con series y el filtro de animacion
      const response = await services.get_movie_services(getPageRandom(pageMax, 1),
      `/discover/tv?language=es-MX&first_air_date.gte=2010&${filtersEndpoint}&with_watch_providers=8&watch_region=CL`);
      // pasamos los elementos contenidos en results a una variable
      const data = response.data.results;
      // usamos .filter() para traer todos los elementos que en su backdrop_path contengan una imagen
      const responseFiltered = data.filter((item) => {
        return item.backdrop_path;
      });
      // usamos Math.floor() para redonder a la baja al numero entero mas cercano, y luego usamos Math.random() * responseFiltered.length para
      // generar un numero entre 0 y el valor que tenga responseFiltered.length y finalmente almacenamos el valor de ese resultado en la variable
      const randomIndex = Math.floor(Math.random() * responseFiltered.length);
      // usamos el randomIndex con el numero aleatoria y lo pasamos al responseFiltered como su valor de array [numero_aleatorio] que seria
      // el finalmente el elemento que se tomara para extraer la data a pasar al componente hijo
      const randomObject = responseFiltered[randomIndex];
      // obtenemos el id de la pelicula/serie, puesto que este ID sera usado para otros 2 endpoints y principalmente para el "Más información"
      // dentro del EmbedVideoPlayer para pasar ese ID hacia otro componente mas
      id.value = randomObject.id;
      // obtenemos el titulo de la pelicula/serie
      title.value = randomObject.name;
      // usamos el .split(' ') para separar el texto de la sinopsis por cada espacio que tenga y obtener la cantidad de palabras que contiene
      const wordsOfOverview = randomObject.overview.split(" ");
      // evaluamos si la sinopsis posee mas de 50 palabras
      if (wordsOfOverview.length > 50) {
        // si es asi la pasamos a la funcion para cortarla y solo guardar las primeras 50 palabras
        overview.value = cutText(randomObject.overview, 50);
      } else {
        // en caso de que la sinopsis tenga menos de 50 palabras se guarda eso
        overview.value = randomObject.overview;
      }

      // imagen de fondo
      backdrop.value = movieBackdropLink.value + randomObject.backdrop_path;

      // realizamos el llamado al servicio con el endpoint que contiene las key de los trailer de la pelicula/serie
      const responseKey = await services.get_data_key_series_video(id.value);
      let resultServiceKey;
      // hay ocasiones en que arroja un error de "undefined", y esto es porque el responseKey.data no contiene data y por ende arroja ese error
      // esto quiere decir que no todas las pelicula/serie contienen una key del trailer por ende si no encuentra dicha key retornara a la variable
      // "No hay key del trailer", en su defecto si la data existe pasara dicha data a la variable
      (responseKey.data === undefined) ? keyTrailer.value = "No hay key del trailer" : resultServiceKey = responseKey.data.results;

      // verificamos si la data obtenida es un array y si el largo de esta es mayor a 0, ya que si es mayor a 0 quiere decir que posee datos dentro
      if (Array.isArray(resultServiceKey) && resultServiceKey.length > 0) {
        // si se cumple la condicion pasamos el contenido de la key a la variable
        keyTrailer.value = resultServiceKey[0].key;
      } else {
        // en caso de que no exista una key o esta este vacio se enviara esa informacion a la variable
        keyTrailer.value = "No hay key del trailer";
      }

      // realizamos el llamado al servicio con el endpoint que contiene las certificaciones(12, 16, 18+, etc.) de las pelicula/serie
      const responseCertification = await services.get_data_series_certification_video(id.value);

      // verificamos si la data obtenida es un array y si el largo de esta es mayor a 0, ya que si es mayor a 0 quiere decir que posee datos dentro
      if (Array.isArray(responseCertification.data.results) && responseCertification.data.results.length > 0) {
        // pasamos los resultados de la llamada al endpoint a una variable
        const dataRespResults = responseCertification.data.results;
        // en caso de que solo exista un objeto dentro del array se accedera directamente a el y se asignara la certificacion correspondiente
        (dataRespResults.length === 1) ? certification.value = dataRespResults[0].rating : null;
        // en caso de que la condicion anterior de tener solo 1 elemento no se cumpla tomamos la data y la mapeamos
        dataRespResults.map((item) => {
          // evaluando las certificaciones existentes dentro del endpoint se llego a la conclusion de que "BR"(Brasil) posee muchas similitudes
          // con las certificaciones de Chile(CL), puesto que este ultimo no esta tan presente se usaraon las de Brasil como referencia
          // si dentro de la certificacion el iso_3166_1 incluia "BR"
          if (item.iso_3166_1.includes("BR")) {
            // se pasara esa data a la variable
            certification.value = item.rating;
          } else {
            // en caso contrario generara un numero al azar con la cantidad maxima de dataRespResults
            const randomIndex = Math.floor(Math.random() * dataRespResults.length);
            // y ese numero aleatorio lo pasamos al dataRespResults para obtener un elemento aleatorio y de ese elemento extraer su .rating
            certification.value = dataRespResults[randomIndex].rating;
          }
        });
      } else {
        // en caso de no existir data para la certificacion se retornara un "Vacío"
        certification.value = "Vacío";
      }

      // evaluamos si keyTrailer no tiene una key de video
      if (keyTrailer.value === "No hay key del trailer") {
        // si es asi la duracion del video sera de 0
        dataTimeVideoKey.value = 0;
        // en caso contrario y que si tenga key
      } else {
        // realizamos la peticion al endpoint que conecta con la api de youtube para obtener los datos de dicho video
        const respYoutubeData = await services.get_data_youtube_data_v3(keyTrailer.value);
        // hay ocasiones en que el objeto respYoutubeData.data.items[0] esta vacio o el indice 0 en el arragle no existe
        // por lo que arroja el siguiente error "respYoutubeData.data.items[0] is undefined", para ello
        // validamos si el objeto respYoutubeData.data.items existe y si al menos tiene un elemento antes de intentar acceder al indice 0
        if (respYoutubeData.data.items && respYoutubeData.data.items.length > 0) {
          // accedemos al índice 0 de respYoutubeData.data.items para obtener la duracion del video
          const duration =
            respYoutubeData.data.items[0].contentDetails.duration;
          // pasamos el resultado de duration a la funcion para obtener su valor en segundos
          dataTimeVideoKey.value = convertDurationToSeconds(duration);
        } else {
          // en el caso en que respYoutubeData.data.items no existe o está vacío el valor de la duracion de tiempo del video sera de 0
          dataTimeVideoKey.value = 0;
        }
      }

      // una vez completa toda la data hacemos visible los elementos con su respectiva data ya cargada
      FlagVisibleElements.value = true;
    });

    // removemos el escuchador una vez que la accion de la funcion handleScroll fue tomada
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    // observamos la variable scrollTop la cual detectaremos cualquier cambio que tenga
    watch(scrollTop, () => {
      // tomamos el id del div principal menu
      let top_bar = document.getElementById("top_bar");
      // si scrollTop es mayor a 0
      if (scrollTop.value > 0) {
        // le pasaremos al CSS del div principal_menu la propiedad backgroundColor
        // esto quiere decir que cuando se haga scroll hacia abajo la barra difuminada
        // del menu principal dejara de serlo y se vera del color solido asignado, en este caso negro(#000)
        top_bar.style.backgroundColor = "#141414";
        top_bar.style.removeProperty("transition");
      } else {
        // en su defecto si el scrollTop es 0 se removera la propiedad CSS "background-color"
        // del div top_bar dejando la barra del menu con el difuminado
        top_bar.style.removeProperty("background-color");
        // cuando se esta en la posicion 0 del scroll, osea arriba, se le añade un efecto de transicion
        top_bar.style.transition = "1s";
      }
    });

    return {
      keyTrailer,
      title,
      overview,
      backdrop,
      certification,
      id,
      scrollTop,
      handleScroll,
      dataTimeVideoKey,
      FlagVisibleElements,
      titleSerie,
      encryptedData,
    };
  },
};
</script>

<style scoped>
.container_principal {
  position: relative;
  background-color: #141414;
}

.cont_video {
  width: 100%;
  height: 50vw;
}

.cont_carousels {
  background-color: #141414;
  width: 100%;
  height: auto;
  box-shadow: rgb(0, 0, 0) 0px -50px 100px 30px;
  position: absolute;
  z-index: 1;
}

.carousels {
  position: relative;
  bottom: 5rem;
}

#top_bar {
  width: 100%;
  height: 9rem;
  position: fixed;
  display: flex;
  align-items: flex-end;
  z-index: 2;
}

.box_right {
  display: flex;
  margin: 0rem 5rem 0.5rem 0rem;
}

.icon_right {
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  border: 1px solid #b6b4b4;
}

.icon_right:hover {
  cursor: pointer;
  border: 1px solid #fff;
  color: #fff;
}

.icon_right .icon {
  color: #b6b4b4;
}

.icon_right:hover .icon {
  color: #fff;
}

@media (min-width: 300px) and (max-width: 889px) {
  #top_bar {
    height: 7rem;
  }

  .box_right {
    margin: 0rem 1rem 0.5rem 0rem;
  }

  .icon_right {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    border: 1px solid #b6b4b4;
  }

  .icon {
    font-size: 0.9rem;
  }

  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -10px 40px 20px;
  }

  .carousels {
    bottom: 2.5rem;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  #top_bar {
    height: 8rem;
  }

  .box_right {
    margin: 0rem 2rem 0.5rem 0rem;
  }

  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -10px 100px 20px;
  }

  .carousels {
    bottom: 4rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .box_right {
    margin: 0rem 2rem 0.5rem 0rem;
  }

  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -20px 100px 20px;
  }
}
</style>