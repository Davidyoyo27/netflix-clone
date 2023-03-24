import axios from 'axios'

export default {
    movie_start: async () => {
        try {
            const API_KEY = 'api_key=ef6f33754f4bdb2e45fe025d71c82878'
            const axiosConfig = {

                baseURL: 'https://api.themoviedb.org/3',
                url: '/movie',

                headers: {
                    Authorization: `API_KEY ${API_KEY}`,
                },

                method: 'get',
                // params: {
                //     name: variable
                // }
            }

            const respuesta = await axios.request(axiosConfig)
            return { ok: true, data: respuesta.data }
        } catch (err) {
            return { ok: false, error: err.message }
        }
    },

    prueba_api: async (page) => {
        try {
            const API_KEY = 'api_key=ef6f33754f4bdb2e45fe025d71c82878'
            const axiosConfig = {

                baseURL: 'https://api.themoviedb.org/3',
                url: `https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=es-MX`,
                
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
    }
}