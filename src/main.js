import { createApp } from 'vue'
import App from './App.vue'
// 1.7-. importamos el router
import router from './router/router'

createApp(App)
        // 1.8 usamos el router
        .use(router)
        .mount('#app')
