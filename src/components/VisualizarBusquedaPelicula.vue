<template>
  <div class="wrapper">
    <div class="container_options">
      <p class="more_content">Más contenido para explorar:</p>
      <p class="options_content">Animes | Adam Sandler | Avatar 2 | Action | Películas de acción | Series de anime | Avatar | Películas animadas | American Pie: Tu primera vez | Animes japoneses</p>
    </div>
    <p>Valor del input en la URL: {{ data_input_movie }}</p>
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
    const data_input_movie = ref("");
    const data_poster_movie = ref(null);
    const link_img = ref("https://image.tmdb.org/t/p/w500");

    async function resultSearchMovie(query){
      const response = await services.get_movie_services(1, `/search/movie?language=es-MX&query=${query}`);
      const arrayDataSearch = response.data.results;
      data_poster_movie.value = arrayDataSearch.filter((item) => {
        return item.poster_path;
      });

      return response;
    }

    watch(() => route.query.data_input, (newValue) => {
      resultSearchMovie(newValue);
      data_input_movie.value = newValue;
    });

    return {
      data_poster_movie,
      link_img,
      data_input_movie,
    };
  },
};
</script>

<style scoped>
.wrapper {
  padding-top: 9.9rem;
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