<template>
  <div>
    <EmbedVideoPlayer
      :titleMovie="title"
      :overviewMovie="overview"
      :backgroundImageMovie="backdrop"
      :certificationMovie="certification"
      :videoId="keyTrailer"
    ></EmbedVideoPlayer>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import EmbedVideoPlayer from "./EmbedVideoPlayer.vue";
import services from "@/helpers/services/services";
import { getPageRandom } from "@/helpers/js/functions";
import { numMax100 } from "@/helpers/js/variables";

export default {
  components: {
    EmbedVideoPlayer,
  },
  setup() {
    const keyTrailer = ref("");
    const title = ref("");
    const overview = ref("");
    const backdrop = ref("");
    const movieBackdropLink = ref("https://image.tmdb.org/t/p/original");
    const certification = ref("");

    // funcion que corta el texto segun el maximo de palabras que se especifique
    // a la funcion se le pasa como argumento 2 variables
    // text: el texto a evaluar
    // maxWords: cantidad maxima de palabras que se desea que el texto tenga
    function cutText(text, maxWords) {
      // tomamos el texto y con el .split(" ") lo separamos por cada espacio
      // dando como resultado a cada palabra del texto separada en un array
      const words = text.split(" ");
      // variable donde se guardara el resultado final
      let textCuted;
      // si la cantidad de words es mayor a maxWords
      if (words.length > maxWords) {
        // usamos el metodo .slice() para asignarle un inicio(0) y donde este terminara (maxWords)
        // y finalmente usamos el .join(" ") para unir las palabras y separandola por espacio
        textCuted = words.slice(0, maxWords).join(" ");
      }
      
      // retornamos el texto final con un ...
      return textCuted + "...";
    }

    onMounted(async () => {
      const response = await services.get_movie_services(getPageRandom(numMax100, 1), "/discover/tv?language=es-MX&with_genres=16&with_keywords=210024|287501");
      const data = response.data.results;
      const responseFiltered = data.filter((item) => {
        return item.backdrop_path;
      });
      const randomIndex = Math.floor(Math.random() * responseFiltered.length);
      const randomObject = responseFiltered[randomIndex];
      const id = randomObject.id;
      title.value = randomObject.name;
      // usamos el .split(' ') para separar el texto de la sinopsis por cada espacio que tenga y obtener la cantidad de palabras que contiene
      const wordsOfOverview = randomObject.overview.split(' ');
      // evaluamos si la sinopsis posee mas de 50 palabras
      if(wordsOfOverview.length > 50){
        // si es asi la pasamos a la funcion para cortarla y solo guardar las primeras 50 palabras
        overview.value = cutText(randomObject.overview, 50);
      }else{
        // en caso de que la sinopsis tenga menos de 50 palabras se guarda eso
        overview.value = randomObject.overview;
      }

      backdrop.value = movieBackdropLink.value + randomObject.backdrop_path;
      const responseKey = await services.get_data_key_video(id);
      let resultServiceKey;
      (responseKey.data === undefined) ? keyTrailer.value = "No hay key del trailer" : resultServiceKey = responseKey.data.results;

      if (Array.isArray(resultServiceKey) && resultServiceKey.length > 0) {
        // si se cumple la condicion pasamos el contenido de la key a la variable
        keyTrailer.value = resultServiceKey[0].key;
      } else {
        // en caso de que no exista una key o esta este vacio se enviara esa informacion a la variable
        keyTrailer.value = "No hay key del trailer";
      }

      const responseCertification = await services.get_data_certification_video(id);

      if (Array.isArray(responseCertification.data.results) && responseCertification.data.results.length > 0) {
        const dataRespResults = responseCertification.data.results;
        // en caso de que solo exista un objeto dentro del array se accedera directamente a el y se asignara la certificacion correspondiente
        (dataRespResults.length === 1) ? certification.value = dataRespResults[0].rating : null;
        dataRespResults.map((item) => {
          if (item.iso_3166_1.includes("BR")) {
            certification.value = item.rating;
          } else {
            const randomIndex = Math.floor(Math.random() * dataRespResults.length);
            certification.value = dataRespResults[randomIndex].rating;
          }
        });
      } else {
        certification.value = "Vacío";
      }
    });

    return {
      keyTrailer,
      title,
      overview,
      backdrop,
      certification,
    };
  },
};
</script>