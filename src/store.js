import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            // nombre de la variable con la data en el store
            // el valor por defecto que tendra filtroValue sera de '' o [empty string]
            // si se desea visualizar la data por defecto en el componente
            filtroValue: '',
            // variable usada para capturar la data del componente "ComboboxIdiomaOriginal.vue"
            filtroIdiomaOriginal: '',
            // variable usada para capturar la data del componente "ComboboxIdiomas.vue"
            filtroIdiomas: '',
            // variable usada para capturar la data del componente "ComboboxSugerencias.vue"
            filtroSugerencias: '',
        }
    },
    mutations: {
        // mutador del estado de la variable, la que recibe la data final
        setFiltroValue(state, nuevoValor) {
            // state.filtroValue tendra la data final que es la variable inicializada que esta en el return
            state.filtroValue = nuevoValor;
        },
        setFiltroIdiomaOriginal(state, nuevoValor){
            state.filtroIdiomaOriginal = nuevoValor;
        },
        setFiltroIdiomas(state, nuevoValor){
            state.filtroIdiomas = nuevoValor;
        },
        setFiltroSugerencias(state, nuevoValor){
            state.filtroSugerencias = nuevoValor;
        }
    },
    actions: {
        // commit: metodo para llamar a mutations
        // nuevoValor: nueva data que viene desde el componente
        actualizarFiltro({ commit }, nuevoValor) {
            // llama al mutations setFiltroValue y le pasa el nuevoValor
            commit('setFiltroValue', nuevoValor);
        },
        actualizarFiltroIdiomaOriginal({ commit }, nuevoValor){
            commit('setFiltroIdiomaOriginal', nuevoValor);
        },
        actualizarFiltroIdiomas({ commit }, nuevoValor){
            commit('setFiltroIdiomas', nuevoValor);
        },
        actualizarFiltroSugerencias({ commit }, nuevoValor){
            commit('setFiltroSugerencias', nuevoValor);
        }
    }
});

export default store;