<template>
  <div class="wrapper">
    <div class="container">
      <div class="box_left">
        <h1>Series</h1>
        <button v-on:click="clickBoton">
          <p>Géneros</p>
          <div class="figure_right_menu"></div>
        </button>
        <!-- flagVisibleSubmenu muestra u oculta el menu segun el estado de la bandera  -->
        <div v-if="flagVisibleSubmenu" id="submenu">
          <ul>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
          </ul>
          <ul>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
          </ul>
          <ul>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
            <a href="">asdasdasdasd</a>
          </ul>
        </div>
      </div>
      <div class="box_right">
        <p>Icono 1</p>
        <p>Icono 2</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const flagVisibleSubmenu = ref(false);

    // funcion para mostrar y ocultar el submenu al hacer click en el boton "Géneros"
    function clickBoton(){
        // tomamos la bandera y cada vez que se haga click almacenamos en ella su mismo valor pero el contrario
        flagVisibleSubmenu.value = !flagVisibleSubmenu.value;
    }

    return {
      clickBoton,
      flagVisibleSubmenu,
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box_left {
  display: flex;
  align-items: center;
  margin: 0rem 0rem 0.8rem 4rem;
  position: relative;
}

.box_right {
  display: flex;
  margin-right: 5rem;
}

.box_right p {
  color: #fff;
}

h1 {
  font-size: 2.3rem;
}

p {
  font-size: 1rem;
}

button {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  margin-left: 2.5rem;
  border-style: none;
  font-weight: 600;
  font-size: 1.2rem;
  background-color: #000;
  border: solid 1px #fff;
  cursor: pointer;
}

button:hover {
  background-color: rgba(119, 117, 117, 0.2);
}

button p,
h1 {
  color: #fff;
}

.figure_right_menu {
  /* creacion de figura geometrica */
  border-bottom: 5px solid darkgreen;
  border-left: 8px solid black;
  border-right: 8px solid blue;
  border-width: 5px;
  border-color: transparent;
  border-bottom-color: #f0eeee;
  width: 0;
  height: 0;
  margin-left: 10px;
  transform: rotate(180deg);
  cursor: pointer;
}

#submenu {
  display: flex;
  gap: 2rem;
  padding: .5rem;
  position: absolute;
  top: 2.4rem;
  left: 9.4rem;
}

#submenu ul {
    display: flex;
    flex-direction: column;
}

a {
    text-decoration: none;
}

a:hover{
    text-decoration: underline #fff;
}
</style>