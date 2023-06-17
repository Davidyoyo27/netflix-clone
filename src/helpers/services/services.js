import axios from "axios";
import { BASE_URL_MOVIEDB, ACCESS_TOKEN } from "../js/variables";

export default {
  // endpoint video pagina inicio
  // endpoint para obtener la key del trailer de la pelicula y la certificacion
  get_data_movie_video_start: async (url) => {
    try {
      const axiosConfig = {
        baseURL: BASE_URL_MOVIEDB,
        url,

        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },

        method: "get",
      };

      const { data } = await axios.request(axiosConfig);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint que sera la base para realizar las peticiones a todas los carruseles de peliculas
  // eso sera segun el filtro que se desee aplicar por la "url"
  // EJ:
  //       base_url               -> filtro = url
  // https://api.themoviedb.org/3   /movie/upcoming?&language=es-MX
  //                                /discover/movie?&with_genres=80&language=es-MX&primary_release_date.gte=2000
  //                                /discover/tv?language=es-MX&with_keywords=210024
  get_movie_services: async (page, url) => {
    try {
      const axiosConfig = {
        baseURL: BASE_URL_MOVIEDB,
        url,

        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const { data } = await axios.request(axiosConfig);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

};
