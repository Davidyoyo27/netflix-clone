<template>
  <!-- MENU -->
  <MenuPrincipal></MenuPrincipal>
  <!-- FIN MENU -->
  <!-- el router view llama directamente a la ruta definida por defecto como el Home/Inicio -->
  <!-- 1.9 -->
  <router-view></router-view>
</template>

<script>
import MenuPrincipal from './components/MenuPrincipal.vue';
import Inicio from './components/Inicio.vue';

export default {
  name: 'App',
  components: {
    MenuPrincipal,
    Inicio,
  }
}
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

*{
  padding: 0;
  margin: 0;
}
</style>
