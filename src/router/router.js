// 1.1-. instalamos el router: npm install vue-router@4 
// 1.2-. realizamos la importacion de los elementos que usaremos que estan contenidos en vue-router
import { createRouter, createWebHashHistory } from 'vue-router'

// 1.3-. creamos las rutas e importamos los componentes a usar como paginas
const routes = [
    //                       LazyLoad = los modulos estan separados del bundle(carga inicial) principal de la aplicacion, 
    //                                  esto ayuda a tener tiempos mas pequeños de carga, en lugar de tener una sola descarga grande, 
    //                                  se tendran muchas descargas pequeñas
    //                      () => import ()
    //                               nombre que se vera en navegador red/network   ruta de la pagina
    { path: '/', name: '/', component: () => import(/* webpackChunkName: "Inicio.vue" */ '../components/inicio/Inicio')},
    // VER LO DEL /83 PARA VER COMO SE PASARA LA DATA QUE SE VE EN LA URL EN NETFLIX
    { path: '/series', name: 'series', component: () => import(/* webpackChunkName: "Series.vue" */ '../components/series/Series')},
    { path: '/series/accion', name: 'series_accion', component: () => import(/* webpackChunkName: "SeriesAccion.vue" */ '../components/series/SeriesAccion') },
    { path: '/series/anime', name: 'series_anime', component: () => import(/* webpackChunkName: "SeriesAnime.vue" */ '../components/series/SeriesAnime') },
    { path: '/series/asiaticas', name: 'series_asiaticas', component: () => import(/* webpackChunkName: "SeriesAsiaticas.vue" */ '../components/series/SeriesAsiaticas') },
    { path: '/series/britanicas', name: 'series_britanicas', component: () => import(/* webpackChunkName: "SeriesBritanicas.vue" */ '../components/series/SeriesBritanicas') },
    { path: '/series/ciencia_y_naturaleza', name: 'series_ciencia', component: () => import(/* webpackChunkName: "SeriesCiencia.vue" */ '../components/series/SeriesCiencia') },
    { path: '/series/eeuu', name: 'series_EEUU', component: () => import(/* webpackChunkName: "SeriesEEUU.vue" */ '../components/series/SeriesEEUU') },
    { path: '/series/latinoamericanas', name: 'series_latinoamericanas', component: () => import(/* webpackChunkName: "SeriesLatinoamericanas.vue" */ '../components/series/SeriesLatinoamericanas') },
    { path: '/series/comedia', name: 'series_comedia', component: () => import(/* webpackChunkName: "SeriesComedia.vue" */ '../components/series/SeriesComedia') },
    { path: '/series/infantil', name: 'series_infantil', component: () => import(/* webpackChunkName: "SeriesInfantil.vue" */ '../components/series/SeriesInfantil') },
    { path: '/series/adolescentes', name: 'series_adolescentes', component: () => import(/* webpackChunkName: "SeriesAdolescentes.vue" */ '../components/series/SeriesAdolescentes') },
    { path: '/series/dramas', name: 'series_dramas', component: () => import(/* webpackChunkName: "SeriesDramas.vue" */ '../components/series/SeriesDramas') },
    { path: '/series/stand_up', name: 'series_standup', component: () => import(/* webpackChunkName: "SeriesStandUp.vue" */ '../components/series/SeriesStandUp') },
    { path: '/series/misterio', name: 'series_misterio', component: () => import(/* webpackChunkName: "SeriesMisterio.vue" */ '../components/series/SeriesMisterio') },
    { path: '/series/policiales', name: 'series_policiales', component: () => import(/* webpackChunkName: "SeriesPoliciales.vue" */ '../components/series/SeriesPoliciales') },
    { path: '/series/reality_shows', name: 'series_reality', component: () => import(/* webpackChunkName: "SeriesReality.vue" */ '../components/series/SeriesReality') },
    { path: '/series/romance', name: 'series_romance', component: () => import(/* webpackChunkName: "SeriesRomance.vue" */ '../components/series/SeriesRomance') },
    { path: '/series/ciencia_ficcion', name: 'series_fantasia', component: () => import(/* webpackChunkName: "SeriesFantasia.vue" */ '../components/series/SeriesFantasia') },
    { path: '/series/documental', name: 'series_documental', component: () => import(/* webpackChunkName: "SeriesDocumental.vue" */ '../components/series/SeriesDocumental') },
    { path: '/series/telenovelas', name: 'series_telenovelas', component: () => import(/* webpackChunkName: "SeriesTelenovelas.vue" */ '../components/series/SeriesTelenovelas') },
    { path: '/series/terror', name: 'series_terror', component: () => import(/* webpackChunkName: "SeriesTerror.vue" */ '../components/series/SeriesTerror') },
    { path: '/series/thrillers', name: 'series_thrillers', component: () => import(/* webpackChunkName: "SeriesThrillers.vue" */ '../components/series/SeriesThrillers') },
    { path: '/peliculas', name: 'peliculas', component: () => import(/* webpackChunkName: "Peliculas.vue" */ '../components/Peliculas')},
    { path: '/novedades', name: 'novedades', component: () => import(/* webpackChunkName: "Novedades.vue" */ '../components/Novedades') },
    { path: '/mi_lista', name: 'mi_lista', component: () => import(/* webpackChunkName: "MiLista.vue" */ '../components/MiLista') },
    { path: '/explora_por_idiomas', name: 'explora_por_idiomas', component: () => import(/* webpackChunkName: "ExploraIdiomas.vue" */ '../components/ExploraIdiomas') },
    { path: '/visualizar_busqueda_pelicula', name: 'resultado_busqueda_pelicula', component: () => import(/* webpackChunkName: "VisualizarBusquedaPelicula.vue" */ '../components/VisualizarBusquedaPelicula') },
    // ----------------------------------------------------------------------------------------------------------------
    // componente prueba
    { path: '/prueba_carruseles', component: () => import(/* webpackChunkName: "ColeccionCarruselesPeliculas.vue" */ '../components/inicio/ColeccionCarruselesPeliculas') },
    { path: '/cbo_generos', component: () => import(/* webpackChunkName: "ComboboxGeneros.vue" */ '../components/series/ComboboxGeneros') },
    // ----------------------------------------------------------------------------------------------------------------
    // page 404 Not Found
    // se busca cualquier url que no tenga match con los especificados aca en las rutas
    { path: '/:pathMatch(.*)*', component: () => import(/* webpackChunkName: "Error404PageNotFound.vue" */ '../components/Error404PageNotFound') },
]

// 1.4-. creamos la instancia del router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 1.5-. lo exportamos para su uso: main.js
export default router