import axios from 'axios'

export default {

    movie_info: async (page) => {
        try {
            const API_KEY = 'api_key=ef6f33754f4bdb2e45fe025d71c82878'
            const axiosConfig = {

                baseURL: 'https://api.themoviedb.org/3',
                url: `/discover/movie?${API_KEY}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&language=es-ES`,
                
                headers: {
                    Authorization: `Token ${API_KEY}`,
                },

                method: 'get',
                params: {
                    page: page
                }
            }

            const respuesta = await axios.request(axiosConfig)
            return { ok: true, data: respuesta.data }
        } catch (err) {
            return { ok: false, error: err.message }
        }
    },

    movie_video_start: async (id_pelicula) => {
        try {
            const API_KEY = 'api_key=ef6f33754f4bdb2e45fe025d71c82878'
            const axiosConfig = {

                baseURL: 'https://api.themoviedb.org/3',
                url: `/movie/${id_pelicula}/videos?${API_KEY}&sort_by=popularity.desc`,

                headers: {
                    Authorization: `API_KEY ${API_KEY}`,
                },

                method: 'get',
                params: {
                    // name: variable
                    id_pelicula: id_pelicula
                }
            }

            const respuesta = await axios.request(axiosConfig)
            return { ok: true, data: respuesta.data }
        } catch (err) {
            return { ok: false, error: err.message }
        }
    },

    
}