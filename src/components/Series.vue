<template>
  <div>
    <EmbedVideoPlayer 
      :idMovie="id"
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
import { getPageRandom, cutText } from "@/helpers/js/functions";
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
    const id = ref(0);

    onMounted(async () => {
      // realizamos el llamado al servicio que es el endpoint con series y el filtro de animacion
      const response = await services.get_movie_services(getPageRandom(numMax100, 1), "/discover/tv?language=es-MX&with_genres=16&with_keywords=210024|287501");
      // pasamos los elementos contenidos en results a una variable
      const data = response.data.results;
      // usamos .filter() para traer todos los elementos que en su backdrop_path contengan una imagen
      const responseFiltered = data.filter((item) => {
        return item.backdrop_path;
      });
      // usamos Math.floor() para redonder a la baja al numero entero mas cercano, y luego usamos Math.random() * responseFiltered.length
      // para generar un numero entre 0 y el valor que tenga responseFiltered.length y finalmente almacenamos el valor de ese resultado en la variable
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
      const wordsOfOverview = randomObject.overview.split(' ');
      // evaluamos si la sinopsis posee mas de 50 palabras
      if(wordsOfOverview.length > 50){
        // si es asi la pasamos a la funcion para cortarla y solo guardar las primeras 50 palabras
        overview.value = cutText(randomObject.overview, 50);
      }else{
        // en caso de que la sinopsis tenga menos de 50 palabras se guarda eso
        overview.value = randomObject.overview;
      }

      // imagen de fondo
      backdrop.value = movieBackdropLink.value + randomObject.backdrop_path;

      // realizamos el llamado al servicio con el endpoint que contiene las key de los trailer de la pelicula/serie
      const responseKey = await services.get_data_key_video(id.value);
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
      const responseCertification = await services.get_data_certification_video(id.value);

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
    });

    return {
      keyTrailer,
      title,
      overview,
      backdrop,
      certification,
      id,
    };
  },
};
</script>