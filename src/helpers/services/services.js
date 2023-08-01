import axios from "axios";

export default {
  // endpoint video pagina inicio
  // endpoint para obtener la key del trailer de la pelicula y la certificacion
  get_data_movie_video_start: async (url) => {
    try {
      const axiosConfig = {
        // llamada a la variable de entorno
        baseURL: import.meta.env.VUE_APP_BASE_URL_MOVIEDB,
        url,

        headers: {
          Authorization: `Bearer ${import.meta.env.VUE_APP_ACCESS_TOKEN_MOVIEDB}`,
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
        baseURL: import.meta.env.VUE_APP_BASE_URL_MOVIEDB,
        url,

        headers: {
          Authorization: `Bearer ${import.meta.env.VUE_APP_ACCESS_TOKEN}`,
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

  // endpoint trailer de series con filtro por ID
  get_data_key_video: async (id) => {
    try {
      const axiosConfig = {
        baseURL: import.meta.env.VUE_APP_BASE_URL_MOVIEDB,
        url: `/tv/${id}/videos?sort_by=popularity.desc`,

        headers: {
          Authorization: `Bearer ${import.meta.env.VUE_APP_ACCESS_TOKEN}`,
        },

        method: "get",
      };

      const { data } = await axios.request(axiosConfig);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint certificacion(12, 16, 18+, etc.) de las peliculas/series
  get_data_certification_video: async (id) => {
    try {
      const axiosConfig = {
        baseURL: import.meta.env.VUE_APP_BASE_URL_MOVIEDB,
        url: `/tv/${id}/content_ratings`,

        headers: {
          Authorization: `Bearer ${import.meta.env.VUE_APP_ACCESS_TOKEN}`,
        },

        method: "get",
      };

      const { data } = await axios.request(axiosConfig);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  get_data_youtube_data_v3: async (key_video) => {
    try {
      const axiosConfig = {
        baseURL: 'https://www.googleapis.com/youtube/v3',
        url: `/videos?id=${key_video}&key=AIzaSyBmapjiGTdAG3MUzQZf0kS-rdAWLpv4Bzk&part=contentDetails`,

        headers: {
          Authorization: `key ${ACCESS_TOKEN_YOUTUBE}`,
        },

        method: "get",
      };

      const { data } = await axios.request(axiosConfig);
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

};
