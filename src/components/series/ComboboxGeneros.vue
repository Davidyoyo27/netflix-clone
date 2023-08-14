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
        <div v-if="flagVisibleSubmenu" id="submenu">
          <div class="submenu_items">
            <router-link :to="{ name: 'series_accion' }">Acción</router-link>
            <router-link :to="{ name: 'series_anime' }">Animes</router-link>
            <router-link :to="{ name: 'series_asiaticas' }">Asiáticos</router-link>
            <router-link :to="{ name: 'series_britanicas' }">Británicos</router-link>
            <router-link :to="{ name: 'series_ciencia' }">Cienca y naturaleza</router-link>
            <router-link :to="{ name: 'series_comedia' }">Comedias</router-link>
            <router-link :to="{ name: 'series_infantil' }">Contenido infantil</router-link>
          </div>
          <div class="submenu_items">
            <router-link :to="{ name: 'series_adolescentes' }">De adolescentes</router-link>
            <router-link :to="{ name: 'series_EEUU' }">De EE.UU.</router-link>
            <router-link :to="{ name: 'series_dramas' }">Dramas</router-link>
            <router-link :to="{ name: 'series_standup' }">Especiales de stand up</router-link>
            <router-link :to="{ name: 'series_latinoamericanas' }">Latinoamericanos</router-link>
            <router-link :to="{ name: 'series_misterio' }">Misterios</router-link>
            <router-link :to="{ name: 'series_policiales' }">Policiales</router-link>
          </div>
          <div class="submenu_items">
            <router-link :to="{ name: 'series_reality' }">Reality shows y entrevistas</router-link>
            <router-link :to="{ name: 'series_romance' }">Romances</router-link>
            <router-link :to="{ name: 'series_fantasia' }">Sci-fi y fantasía</router-link>
            <router-link :to="{ name: 'series_documental' }">Series documentales</router-link>
            <router-link :to="{ name: 'series_telenovelas' }">Telenovelas</router-link>
            <router-link :to="{ name: 'series_terror' }">Terror</router-link>
            <router-link :to="{ name: 'series_thrillers' }">Thrillers</router-link>
          </div>
        </div>
      </div>
      <div class="box_right">
        <p>Icon 1</p>
        <p>Icon 2</p>
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

a {
  text-decoration: none;
  padding: 0.2rem;
  font-size: 0.95rem;
}

a:hover {
  text-decoration: underline #fff;
}

@media (min-width: 300px) and (max-width: 580px){
  .box_left {
    margin: 0rem 0rem 0.8rem 1rem;
  }

  .box_right {
    margin-right: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }
  
  button {
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    margin-left: 1rem;
    font-size: 1.2rem;
  }

  button p {
    font-size: .9rem;
  }

  #submenu {
    display: flex;
    flex-direction: column;
    top: 1.9rem;
    left: 5.5rem;
    gap: 0rem;
  }

  /* el "a" que representa el link viene siendo el router-link*/
  .submenu_items a {
    padding: .2rem 0rem .2rem 0rem;
  }
}

@media (min-width: 581px) and (max-width: 889px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 1rem;
  }

  .box_right {
    margin-right: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }
  
  button {
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    margin-left: 1rem;
    font-size: 1.2rem;
  }

  button p {
    font-size: .9rem;
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
    margin: 0rem 0rem 0.8rem 2rem;
  }

  .box_right {
    margin-right: 2rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 2rem;
  }

  .box_right {
    margin-right: 2rem;
  }
}
</style>