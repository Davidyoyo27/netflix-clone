import axios from "axios";
import { getDateMovieReleaseLastYear } from "@/helpers/js/functions";
import { api_key, baseURLmoviedb } from "../js/variables";

export default {
  // endpoint del video inicial al cargar en el inicio de la pagina
  movie_video_start: async (id_pelicula) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/movie/${id_pelicula}/videos?${API_KEY}&sort_by=popularity.desc`,

        headers: {
          Authorization: `API_KEY ${API_KEY}`,
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
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/movie/${id_pelicula}/release_dates?${API_KEY}`,

        headers: {
          Authorization: `API KEY ${API_KEY}`,
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

  // endpoint desde donde se extraen los datos para la carga inicial del video en el Inicio
  movie_info: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&language=es-ES`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint de carrusel de peliculas "series emocionantes aclamadas por la critica"
  serie_top_rated: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/tv/top_rated?${API_KEY}&language=es-MX`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint de carrusel de series "sugerencias de hoy"
  serie_popular: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/tv/popular?${API_KEY}&language=es-MX`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint de carrusel de peliculas "series de suspenso"
  serie_suspense: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/tv?${API_KEY}&language=es-MX&sort_by=popularity.desc&with_genres=9648&primary_release_date.gte=2000`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint de carrusel de peliculas "películas de anime"
  movie_anime: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&language=es-MX&with_genres=16&with_keywords=210024|287501&primary_release_date.gte=2000`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint de carrusel de peliculas "películas de hollywood para reír"
  movie_comedy: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&with_genres=35&language=es-MX&without_genres=16&primary_release_date.gte=2010`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint de carrusel de peliculas "ciencia ficción y fantasía imaginativa de acción"
  movie_science_fiction_fantasy: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&with_genres=14 | 878&language=es-MX&without_keywords=210024&primary_release_date.gte=2010&without_genres=16|27`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // endpoint de carrusel de peliculas "Lanzamientos del último año"
  movie_realeses_last_year: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&sort_by=popularity.desc&vote_average.gte=7&vote_average.lte=10&vote_count.gte=100&language=es-MX&primary_release_date.gte=${getDateMovieReleaseLastYear()}`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // Proximos estrenos
  movie_next_upcoming: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/movie/upcoming?${API_KEY}&language=es-MX`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // Películas sobre crímenes
  movie_crimen: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&with_genres=80&language=es-MX&primary_release_date.gte=2000`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // Películas documentales EEUU
  movie_documental_EEUU: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&language=es-MX&sort_by=popularity.desc&primary_release_year=2020&with_original_language=au|ca|gb|ie|nz|us`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // Películas de documentales
  movie_documental: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&with_genres=99&language=es-MX&primary_release_date.gte=2000`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // Películas de acción
  movie_action: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&with_genres=28&language=es-MX&primary_release_date.gte=2000`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // Películas de animación
  movie_animation: async (page) => {
    try {
      const API_KEY = api_key;
      const axiosConfig = {
        baseURL: baseURLmoviedb,
        url: `/discover/movie?${API_KEY}&with_genres=16&language=es-MX&without_keywords=210024&primary_release_date.gte=2010`,

        headers: {
          Authorization: `Token ${API_KEY}`,
        },

        method: "get",
        params: {
          page: page,
        },
      };

      const respuesta = await axios.request(axiosConfig);
      return { ok: true, data: respuesta.data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // NOTA: RECUERDA ELIMINAR LAS &page=x DE LOS ENDPOINT DE LAS SERIES/PELICULAS

  // ============================================== PELICULAS ===================================================
  // las 10 películas más populares en Chile hoy
  //

  // Películas de anime romance
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=10749&language=es-MX&page=1&with_keywords=210024

  // Películas de drama
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=18&language=es-MX&page=1

  // Películas para ver en familia
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=10751&language=es-MX&page=1

  // Películas de historia
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=36&language=es-MX&page=1

  // Películas de terror
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=27&language=es-MX&page=1

  // Películas de música
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=10402&language=es-MX&page=1

  // Películas de misterio
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=9648&language=es-MX&without_genres=27&page=1

  // Películas de romance
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=10749&language=es-MX&without_genres=16&page=1

  ///// Películas de TV
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=10770&language=es-MX&page=1

  // Películas de suspenso
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=53&language=es-MX&page=1

  // Películas belicas/guerra
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=10752&language=es-MX&page=1

  // Películas occidentales
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=37&language=es-MX&page=1

  // Acción, sci-fi y fantasía
  // https://api.themoviedb.org/3/discover/movie?api_key=ef6f33754f4bdb2e45fe025d71c82878&with_genres=37|28|878|14&language=es-MX&without_genres=10751|10749|10752&page=1
  // ============================================== PELICULAS ===================================================

  

  // ========================================== PELICULAS+SERIES ===================================================
  // lanzamientos de ultimo año
  // nuevos lanzamientos
  // Animes japoneses
  // ========================================== PELICULAS+SERIES ===================================================


  
  // ============================================== SERIES ===================================================
  // animes shonen | accion & aventura
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=10759&page=1&with_keywords=210024|287501

  // animes comedia
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=35&page=1&with_keywords=210024|287501&without_genres=10759

  // animes de crimen
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=80&page=1&with_keywords=210024|287501

  // animes de drama
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=18&page=1&with_keywords=210024|287501&without_genres=10759

  // animes de misterio
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=9648&page=1&with_keywords=210024|287501

  // animes de sci-fi y fantasía
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=10765&page=1&with_keywords=210024|287501&without_genres=10759

  // Series anime japonesas
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&page=1&with_keywords=210024

  // las 10 series más populares en Chile hoy
  //

  // Series de Sci-Fi y Fantasía
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=10765

  // Telenovelas
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&page=1&with_keywords=199262

  // TV infantil y familiar
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=10751|10762&page=1&with_keywords=210024|287501

  // Series de animacion occidental
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=37|16&page=1&without_genres=10759&without_keywords=210024

  // Series occidentales de acción y aventura
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=37|10759&page=1&without_keywords=210024

  // Series de comedia
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=37|35&page=1&without_keywords=210024

  // Series de crimen
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=37|80&page=1&without_genres=10765&without_keywords=210024

  // Series documentales
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=37|99&page=1&without_genres=10765|18|10762|10751|16|10759|35|10767&without_keywords=210024

  // Series de misterio
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=37|9648&page=1&without_keywords=210024

  // Series de guerra y politica
  // https://api.themoviedb.org/3/discover/tv?api_key=ef6f33754f4bdb2e45fe025d71c82878&language=es-MX&sort_by=popularity.desc&with_genres=10768&page=1&without_keywords=210024
  // ============================================== SERIES ===================================================
};
