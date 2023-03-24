// 1.1-. instalamos el router: npm install vue-router@4 
// 1.2-. realizamos la importacion de los elementos que usaremos que estan contenidos en vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
// 1.3-. importamos los componentes que usaremos para realizar las rutas
import Inicio from '../components/Inicio'
import Series from '../components/Series'
import Peliculas from '../components/Peliculas'
import Novedades from '../components/Novedades'
import Mi_lista from '../components/MiLista'
import Explora_idiomas from '../components/ExploraIdiomas'
import Page_Not_Found from '../components/Error404PageNotFound'
import EmbedVideoPlayer from '../components/EmbedVideoPlayer'

// 1.4-. creamos las rutas
const routes = [
    { path: '/', component: Inicio},
    { path: '/series', component: Series},
    { path: '/peliculas', component: Peliculas},
    { path: '/novedades', component: Novedades },
    { path: '/mi_lista', component: Mi_lista },
    { path: '/explora_por_idiomas', component: Explora_idiomas },
    { path: '/video_player', component: EmbedVideoPlayer },
    // page 404 Not Found
    // se busca cualquier url que no tenga match con los especificados aca en las rutas
    { path: '/:pathMatch(.*)*', component: Page_Not_Found },
]

// 1.5-. creamos la instancia del router
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 1.6-. lo exportamos para su uso: main.js
export default router