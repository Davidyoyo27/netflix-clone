<template>
  <div class="wrapper">
    <div class="container">
      <div class="box_left">
        <span>Selecciona tus preferencias</span>
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
          <p>Idioma original</p>
          <div class="figure_right_menu"></div>
        </button>
        <!-- flagVisibleSubmenu muestra u oculta el menu segun el estado de la bandera  -->
        <div v-if="flagVisibleSubmenu" id="submenu">
          <!-- HACER EL FOR ACA PARA RECORRER EL OBJETO QUE TENDRA LA DATA DE LOS FILTROS DE LA FUNCION Y LOS NOMBRES DE CADA OPCION -->
          <div class="submenu_items">
            <span @click="sendFilter(idioma)">Idioma original</span>
            <span @click="sendFilter(doblaje)">Doblaje</span>
            <span @click="sendFilter(subtitulo)">Subtítulo</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const flagVisibleSubmenu = ref(false);
    const idioma = ref(1);
    const doblaje = ref(2);
    const subtitulo = ref(3);
    const store = useStore();

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

    // funcion que recibe por parametro los filtros del endpoint
    const sendFilter = (filter) => {
      // usamos el store.dispatch() para enviar la data al store del vuex
      store.dispatch("actualizarFiltroIdiomaOriginal", filter);
      // al momento de hacer click en cualquier de la opciones del combobox pasamos el false a la bandera
      // para que se cierre el div, ya que si no este quedaba abierto
      flagVisibleSubmenu.value = false;
    };

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
      flagVisibleSubmenu,
      clickBoton,
      sendFilter,
      idioma,
      doblaje,
      subtitulo,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: flex-end;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* desactiva la seleccion de los elementos del click izquierdo */
  user-select: none;
}

.box_left {
  display: flex;
  align-items: center;
  position: relative;
}

span {
  color: #fff;
  margin: 0rem .5rem 0rem .5rem;
}

p {
  font-size: 1rem;
}

button {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
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

button p {
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
  max-height: 30rem;
  width: 10.2rem;
  padding: 0.5rem;
  position: absolute;
  top: 2.4rem;
  left: 13.2rem;
  border: 1px solid #323232;
  z-index: 1;
}

.submenu_items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.submenu_items span {
  color: #fff;
  cursor: pointer;
}

.submenu_items span:hover {
  text-decoration: underline #fff;
}

@media (min-width: 300px) and (max-width: 580px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 0rem;
  }

  button {
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    margin-left: 1rem;
    font-size: 1.2rem;
  }

  button p {
    font-size: 0.9rem;
  }

  #submenu {
    display: flex;
    flex-direction: column;
    top: 1.9rem;
    left: 5.5rem;
    gap: 0rem;
  }
}

@media (min-width: 581px) and (max-width: 889px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 0rem;
  }

  button {
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    margin-left: 1rem;
    font-size: 1.2rem;
  }

  button p {
    font-size: 0.9rem;
  }

  #submenu {
    top: 1.9rem;
    left: 5.5rem;
  }

  .submenu_items {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 0rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 0rem;
  }
}
</style>