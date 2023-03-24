import { createApp } from 'vue'
import App from './App.vue'
// 1.7-. importamos el router
import router from './router/router'
// font awesome
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faBell, faMagnifyingGlass, faRectangleXmark } from '@fortawesome/free-solid-svg-icons'

import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

/* add icons to the library */
// NOTA: para usar los iconos de font awesome se debe importar uno a uno los iconos a usar
library.add(faMagnifyingGlass, faBell, faRectangleXmark)

createApp(App)
        // usamos el componente
        //      nombre por el cual sera
        //          llamado el icono
        .component('font-awesome-icon', FontAwesomeIcon)
        // 1.8 usamos el router
        .use(router)
        // video
        .use(VueVideoPlayer)
        .mount('#app')
