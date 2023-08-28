import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            // nombre de la variable con la data en el store
            // el valor por defecto que tendra filtroValue sera de '' o [empty string]
            // si se desea visualizar la data por defecto en el componente
            filtroValue: ''
        }
    },
    mutations: {
        // mutador del estado de la variable, la que recibe la data final
        setFiltroValue(state, nuevoValor) {
            // state.filtroValue tendra la data final que es la variable inicializada que esta en el return
            state.filtroValue = nuevoValor;
        }
    },
    actions: {
        // commit: metodo para llamar a mutations
        // nuevoValor: nueva data que viene desde el componente
        actualizarFiltro({ commit }, nuevoValor) {
            // llama al mutations setFiltroValue y le pasa el nuevoValor
            commit('setFiltroValue', nuevoValor);
        }
    }
});

export default store;