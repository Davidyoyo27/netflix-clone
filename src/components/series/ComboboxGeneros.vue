<template>
  <div class="wrapper">
    <div class="container">
      <div class="box_left">
        <h1>Series</h1>
        <!-- usamos el @click.stop ya que sin este el div "submenu" al hacerse click al boton este se mostraba y ocultaba -->
        <!-- El problema está ocurriendo porque el evento mousedown en el botón está activando el click del botón, lo que a su vez 
            invoca la función clickBoton, cambiando el valor de la bandera flagVisibleSubmenu, lo que provoca que se abra y se cierre 
            inmediatamente el div. -->
        <!-- Para evitar esta situación, podemos utilizar el evento mousedown en el botón y el evento click en el documento, y luego 
            detener la propagación del evento mousedown en el botón para que no llegue al documento. De esta manera, el evento 
            click en el botón no se activará cuando hagamos clic en él. -->
        <!-- Con esta modificación, el evento click en el botón no se propagará al documento debido al uso de @click.stop, lo que 
            evitará que el div se abra y se cierre inmediatamente. El div se abrirá cuando hagas clic en el botón y se cerrará 
            cuando hagas clic fuera de él, como se esperaba. -->
        <button id="boton" @mousedown="clickBoton" @click.stop>
          <p>Géneros</p>
          <div class="figure_right_menu"></div>
        </button>
        <!-- flagVisibleSubmenu muestra u oculta el menu segun el estado de la bandera  -->

        <!-- CAMBIAR EL ! DE LA BANDERA -->
        <div v-if="flagVisibleSubmenu" id="submenu">
          <div class="submenu_items">
            <a href="">Acción</a>
            <a href="">Animes</a>
            <a href="">Asiáticos</a>
            <a href="">Británicos</a>
            <a href="">Cienca y naturaleza</a>
            <a href="">Comedias</a>
            <a href="">Contenido infantil</a>
          </div>
          <div class="submenu_items">
            <a href="">De adolescentes</a>
            <a href="">De EE.UU.</a>
            <a href="">Dramas</a>
            <a href="">Especiales de stand up</a>
            <a href="">Latinoamericanos</a>
            <a href="">Misterios</a>
            <a href="">Policiales</a>
          </div>
          <div class="submenu_items">
            <a href="">Reality shows y entrevistas</a>
            <a href="">Romances</a>
            <a href="">Sci-fi y fantasía</a>
            <a href="">Series documentales</a>
            <a href="">Telenovelas</a>
            <a href="">Terror</a>
            <a href="">Thrillers</a>
          </div>
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
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    const flagVisibleSubmenu = ref(false);

    // funcion para mostrar y ocultar el submenu al hacer click en el boton "Géneros"
    function clickBoton() {
      // tomamos la bandera y cada vez que se haga click almacenamos en ella su valor contrario
      // esto permitira ir cambiando entre true y false para hacer visible u ocultar el submenu
      flagVisibleSubmenu.value = !flagVisibleSubmenu.value;
    }

    // Función para cerrar el div cuando se haga clic fuera de él
    // Esta función verifica si el elemento con el ID "submenu" contiene el objetivo del evento click.
    // Si el clic no se realiza dentro del div con el ID "submenu", se establece la bandera flagVisibleSubmenu en false, lo que oculta el div.
    function handleClickOutside(event) {
      const submenu = document.getElementById("submenu");
      if (submenu && !submenu.contains(event.target)) {
        flagVisibleSubmenu.value = false;
      }
    }

    // Registrar el evento click en el documento cuando el componente está montado
    // Luego, registramos el evento click en el documento utilizando
    // document.addEventListener("click", handleClickOutside) cuando el componente está montado.
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    watch(flagVisibleSubmenu, (newValue) => {
      // caputarmos el id del boton
      const boton = document.getElementById("boton");
      // usamos el newValue del watch para detectar el valor de la bandera, si esta es true, osea que el menu esta abierto
      if (newValue === true) {
        // se activa la transparencia del boton "Géneros"
        boton.style.backgroundColor = "rgba(119, 117, 117, 0.2)";
      } else {
        // en caso de que no este abierto el menu se desactiva la transparencia
        boton.style.backgroundColor = "";
      }
    });

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
  display: flex;
  align-items: flex-end;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
h1,
a {
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
  background-color: #000;
  display: flex;
  gap: 2rem;
  padding: 0.5rem;
  position: absolute;
  top: 2.4rem;
  left: 9.4rem;
  border: 1px solid #323232;
}

.submenu_items {
  display: flex;
  flex-direction: column;
  width: 13rem;
  text-align: left;
}

#submenu ul {
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  padding: 0.2rem;
  font-size: 0.95rem;
}

a:hover {
  text-decoration: underline #fff;
}
</style>