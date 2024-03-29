import { createApp } from "vue";
import App from "./App.vue";
// 1.6-. importamos el router
import router from "./router/router";
// font awesome
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {
  faBell,
  faChevronLeft,
  faChevronRight,
  faCircleInfo,
  faMagnifyingGlass,
  faPlay,
  faRectangleXmark,
  faRotateRight,
  faVolumeDown,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
  faVolumeOff,
  faVolumeTimes,
  faVolumeUp,
  faVolumeXmark,
  faAlignLeft,
  faTableCellsLarge,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
// NOTA: para usar los iconos de font awesome se debe importar uno a uno los iconos a usar
library.add(
  faMagnifyingGlass,
  faBell,
  faRectangleXmark,
  faPlay,
  faCircleInfo,
  faRotateRight,
  faVolumeHigh,
  faVolumeDown,
  faVolumeLow,
  faVolumeMute,
  faVolumeOff,
  faVolumeTimes,
  faVolumeUp,
  faVolumeXmark,
  faChevronRight,
  faChevronLeft,
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
  faAlignLeft,
  faTableCellsLarge,
  faCircleXmark
);
// vuex
import store from './store'; // Importa el store

createApp(App)
  .use(store)
  // usamos el componente
  //      nombre por el cual sera
  //          llamado el icono
  .component("font-awesome-icon", FontAwesomeIcon)
  // 1.7 usamos el router
  .use(router)
  .mount("#app");
