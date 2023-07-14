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
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const data_poster_movie = ref(null);
    const link_img = ref("https://image.tmdb.org/t/p/w500");
    const movies = ref([]);

    const resultSearchMovie = async (query) => {
      const quantityResults = 50; // Cantidad deseada de resultados
      let actualPage = 1;
      let totalResult = 0;
      movies.value = [];

      while (totalResult <= quantityResults) {
        const response = await services.get_movie_services(actualPage, `/search/movie?language=es-MX&query=${query}`);
        const { results, total_pages } = response.data;

        movies.value = movies.value.concat(results);
        totalResult += results.length;

        actualPage += 1;

        if (actualPage > total_pages) {
          break;
        }
      }

      data_poster_movie.value = movies.value.filter((item) => {
        return item.poster_path;
      });
    };

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