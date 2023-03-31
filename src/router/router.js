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
    { path: '/', component: () => import(/* webpackChunkName: "Inicio.vue" */ '../components/Inicio')},
    { path: '/series', component: () => import(/* webpackChunkName: "Series.vue" */ '../components/Series')},
    { path: '/peliculas', component: () => import(/* webpackChunkName: "Peliculas.vue" */ '../components/Peliculas')},
    { path: '/novedades', component: () => import(/* webpackChunkName: "Novedades.vue" */ '../components/Novedades') },
    { path: '/mi_lista', component: () => import(/* webpackChunkName: "MiLista.vue" */ '../components/MiLista') },
    { path: '/explora_por_idiomas', component: () => import(/* webpackChunkName: "ExploraIdiomas.vue" */ '../components/ExploraIdiomas') },
    { path: '/video_player', component: () => import(/* webpackChunkName: "EmbedVideoPlayer.vue" */ '../components/EmbedVideoPlayer') },
    // page 404 Not Found
    // se busca cualquier url que no tenga match con los especificados aca en las rutas
    { path: '/:pathMatch(.*)*', component: () => import(/* webpackChunkName: "Error404PageNotFound.vue" */ '../components/Error404PageNotFound') },
    // PAGINA DE PRUEBA CON EL CODIGO ORIGINAL DEL VIDEO FUNCIONANDO
    { path: '/video_player_original', component: () => import(/* webpackChunkName: "EmbedVideoPlayerOR.vue" */ '../components/EmbedVideoPlayerOR') },
]

// 1.4-. creamos la instancia del router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 1.5-. lo exportamos para su uso: main.js
export default router