<template>
  <div class="wrapper">
    <div class="container_options">
      <p class="more_content">Más contenido para explorar:</p>
      <p class="options_content">Animes | Adam Sandler | Avatar 2 | Action | Películas de acción | Series de anime | Avatar | Películas animadas | American Pie: Tu primera vez | Animes japoneses</p>
    </div>
    <div class="wrap_container">
      <div class="container">
        <div class="container_movies" v-for="data in data_poster_movie" :key="data">
          <img class="img_poster" :src="link_img + data.poster_path" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import services from "@/helpers/services/services";
// importamos el useRoute que es desde donde recibiremos la data que viene por la url
import { useRoute } from "vue-router";

export default {
  setup() {
    // creamos una instancia del useRoute()
    const route = useRoute();
    const data_poster_movie = ref(null);
    const link_img = ref("https://image.tmdb.org/t/p/w500");
    // variable que contendra las peliculas obtenidas en el servicio
    const movies = ref([]);

    // creamos la funcion asincrona que obtendra las peliculas a la cual
    // le pasamos por parametro la variable "query" la cual sera la data que viene por la url
    const resultSearchMovie = async (query) => {
      const quantityResults = 50; // Cantidad deseada de resultados (peliculas)
      // pagina inicial que se pasara al endpoint
      let actualPage = 1;
      // variable que contendra la cantidad de elementos(peliculas) que evaluara el ciclo while
      let totalResult = 0;
      // llamamos nuevamente a la variable movies que esta inicializada arriba y la inicializamos como array vacio 
      // ya que de no ser asi se irian sumando las peliculas encontradas en una misma busqueda en el input y el punto
      // es que genere una nueva cantidad de elementos por busqueda unica
      movies.value = [];

      // iniciamos el ciclo while el cual mientras totalResult sea menor a quantityResults este seguira ejecutandose
      while (totalResult < quantityResults) {
        // obtenemos la respuesta al servicio al cual se le pasan el numero de la pagina y el "query" el cual es la data del input
        const response = await services.get_movie_services(actualPage, `/search/movie?language=es-MX&query=${query}`);
        // desestructuramos para obtener la data de las variables results y total_pages
        const { results, total_pages } = response.data;

        // El método concat() se usa para unir dos o más arrays. Este método no cambia los arrays existentes, sino que devuelve un nuevo array.
        // usamos el metodo concat para unir el array de results con los elementos que este contiene (peliculas) para ser almacenados en la variable
        // movies
        movies.value = movies.value.concat(results);
        // usamos results.length para saber el largo del array que contiene los resultados (results: 20 elementos) y por cada vuelta del while 
        // ser iran añadiendo 20 elementos hasta llegar al quantityResults(cantidad deseada) y esos resultados son los
        // que se almacenaran en totalResult, la cual sera evaluada en la condicion del while
        totalResult += results.length;

        // sumamos 1 a la pagina actual por cada vuelta del while
        actualPage += 1;

        // si la pagina actual es mayor a la cantidad de paginas "total_pages" entregada por el servicio tambien se detiene el ciclo
        if (actualPage > total_pages) {
          break;
        }
      }

      // finalmente usamos la variable movies que contiene todos los elementos(peliculas) para obtener con el .filter() todos los 
      // posters que existen en las peliculas
      data_poster_movie.value = movies.value.filter((item) => {
        return item.poster_path;
      });
    };

    // usamos el watch para observar los cambios que se produscan en la variable que viene desde la url "route.query.data_input"
    watch(() => route.query.data_input, (newValue) => {
      resultSearchMovie(newValue);
    });

    return {
      data_poster_movie,
      link_img,
    };
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 9.9rem;
}

p{
  font-size: 1.1rem;
}

img {
  height: 18.75rem;
  border-radius: 0.3rem;
}

.wrap_container{
  display: flex;
  justify-content: center;
  padding-bottom: 5rem;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 95%;
}

.container_movies {
  margin: 1rem 0rem 1rem 0rem;
}

.container_options{
  display: flex;
  font-weight: 600;
  margin-left: 4rem;
}

.more_content{
  color: #9d9d9d;
}

.options_content {
  margin-left: 1rem;
  color: #fff;
}
</style>