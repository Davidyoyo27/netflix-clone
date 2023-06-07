import axios from "axios";
import { baseURLmoviedb, ACCESS_TOKEN } from "../js/variables";

export default {
  // /movie/${id_pelicula}/videos?sort_by=popularity.desc
  // /movie/${id_pelicula}/release_dates?
  get_data_movie_video_start: async (id_pelicula, url) => {
    try {
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url,

        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },

        method: "get",
        params: {
          // name: variable
          id_pelicula: id_pelicula,
        },
      };

      const { data } = await axios.request(axiosConfig);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint del video inicial al cargar en el inicio de la pagina
  movie_video_start: async (id_pelicula) => {
    try {
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/movie/${id_pelicula}/videos?sort_by=popularity.desc`,

        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },

        method: "get",
        params: {
          // name: variable
          id_pelicula: id_pelicula,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // trae la certificacion de la pelicula EJ: para mayores de 18 años, 16, 14, 10, etc.
  movie_certification: async (id_pelicula) => {
    try {
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/movie/${id_pelicula}/release_dates?`,

        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },

        method: "get",
        params: {
          id_pelicula: id_pelicula,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
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
        baseURL: baseURLmoviedb,
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
