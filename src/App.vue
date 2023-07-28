<template>
  <div class="body">
    <!-- MENU PRINCIPAL -->
    <header>
      <MenuPrincipal></MenuPrincipal>
    </header>
    <!-- FIN MENU -->

    <!-- el router view llama directamente a la ruta definida por defecto como el Home/Inicio -->
    <!-- 1.8 -->
    <!-- CONTENIDO DE LA PAGINA Y AL MOVERSE ENTRE LOS LINKS/MENU -->
    <main>
      <router-view></router-view>
    </main>
    <!-- FIN CONTENIDO -->

    <!-- PIE DE PAGINA -->
    <footer>
      <Footer></Footer>
    </footer>
    <!-- PIE DE PAGINA -->
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "App",
  components: {
    //                                    LazyLoad
    MenuPrincipal: defineAsyncComponent(() => import(/* webpackChunkName: "MenuPrincipal.vue" */ "@/components/menu_principal/MenuPrincipal.vue")),
    Inicio: defineAsyncComponent(() => import(/* webpackChunkName: "Inicio.vue" */ "@/components/inicio/Inicio.vue")),
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Footer.vue" */ "@/components/Footer.vue")),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}

.body {
  /* color de fondo de Netflix */
  background-color: #141414;
  /*  */
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* --------------- scrollbar -------------------- */
/* los cambios solo se reflejan en estos mavegadores:*/
/* Chrome, Opera, Edge */
/* si esta propiedad no esta no suerte efecto el cambio 
  con el resto de propiedades */
*::-webkit-scrollbar {
  background-color: #000;
}

/* barra */
*::-webkit-scrollbar-thumb {
  background-color: #545454;
}

/* boton flecha arriba y abajo de scroll bar */
*::-webkit-scrollbar-button {
  background-color: #000;
}

/* fondo del scroll bar */
*::-webkit-scrollbar-track {
  background-color: #000;
}
/* ----------------- fin scrollbar -----------------*/
</style>
