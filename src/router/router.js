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
    { path: '/', name: '/', component: () => import(/* webpackChunkName: "Inicio.vue" */ '../components/inicio/Inicio') },
    // VER LO DEL /83 PARA VER COMO SE PASARA LA DATA QUE SE VE EN LA URL EN NETFLIX
    { path: '/series', name: 'series', component: () => import(/* webpackChunkName: "Series.vue" */ '../components/series/Series') },
    { path: '/series/genero', name: 'series_genero', component: () => import(/* webpackChunkName: "SeriesXGeneros.vue" */ '../components/series/SeriesXGeneros'), },
    { path: '/peliculas', name: 'peliculas', component: () => import(/* webpackChunkName: "Peliculas.vue" */ '../components/Peliculas') },
    { path: '/novedades', name: 'novedades', component: () => import(/* webpackChunkName: "Novedades.vue" */ '../components/Novedades') },
    { path: '/mi_lista', name: 'mi_lista', component: () => import(/* webpackChunkName: "MiLista.vue" */ '../components/MiLista') },
    { path: '/explora_por_idiomas', name: 'explora_por_idiomas', component: () => import(/* webpackChunkName: "ExploraIdiomas.vue" */ '../components/ExploraIdiomas') },
    { path: '/visualizar_busqueda_pelicula', name: 'resultado_busqueda_pelicula', component: () => import(/* webpackChunkName: "VisualizarBusquedaPelicula.vue" */ '../components/VisualizarBusquedaPelicula') },
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