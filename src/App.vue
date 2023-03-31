<template>
  <div class="body">
    <!-- MENU -->
    <MenuPrincipal></MenuPrincipal>
    <!-- FIN MENU -->
    <!-- el router view llama directamente a la ruta definida por defecto como el Home/Inicio -->
    <!-- 1.9 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "App",
  components: {
    //                                    LazyLoad
    MenuPrincipal: defineAsyncComponent(() => import(/* webpackChunkName: "MenuPrincipal.vue" */ '@/components/MenuPrincipal.vue')),
    Inicio: defineAsyncComponent(() => import(/* webpackChunkName: "Inicio.vue" */ '@/components/Inicio.vue')),
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
  /* margin-top: 60px; */
}

* {
  padding: 0;
  margin: 0;
}

.body{
  background-color: coral;
}
</style>
