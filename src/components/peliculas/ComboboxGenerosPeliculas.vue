<template>
  <div class="wrapper">
    <div class="container">
      <div class="box_left">
        <h1>Películas</h1>
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
            <!-- pasamos a traves de queryParams la data correspondiente a cada link segun sea su genero -->
            <!-- la data sera recibida por el componente donde apunta con el "name" -->
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data1 } }">Acción</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data2 } }">Animes</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data3 } }">Cine de intriga</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data4 } }">Clásicas</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data5 } }">Cortos</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data6 } }">De hollywood</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data7 } }">Deportes</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data8 } }">Documentales</router-link>
          </div>
          <div class="submenu_items">
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data9 } }">Dramas</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data10 } }">Fantasía</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data11 } }">Fe y espiritualidad</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data12 } }">Independientes</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data13 } }">Internacionales</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data14 } }">Latinoamericanas</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data15 } }">Los favoritos de la crítica</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data16 } }">Música y musicales</router-link>
          </div>
          <div class="submenu_items">
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data17 } }">Para reír</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data18 } }">Para ver en familia</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data19 } }">Policiales</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data20 } }">Romances</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data21 } }">Sci-fi</router-link>
            <router-link :to="{ name: 'peliculas_genero', query: { mo: data22 } }">Terror</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { encryptData, dataEndpointByLinkMovies } from "@/helpers/js/functions";

export default {
  setup() {
    const flagVisibleSubmenu = ref(false);
    const data1 = ref(null);
    const data2 = ref(null);
    const data3 = ref(null);
    const data4 = ref(null);
    const data5 = ref(null);
    const data6 = ref(null);
    const data7 = ref(null);
    const data8 = ref(null);
    const data9 = ref(null);
    const data10 = ref(null);
    const data11 = ref(null);
    const data12 = ref(null);
    const data13 = ref(null);
    const data14 = ref(null);
    const data15 = ref(null);
    const data16 = ref(null);
    const data17 = ref(null);
    const data18 = ref(null);
    const data19 = ref(null);
    const data20 = ref(null);
    const data21 = ref(null);
    const data22 = ref(null);

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
      // tomamos la data a pasar segun cada posicion dentro de la funcion, procedemos a transformar la data del objeto
      // con JSON.stringify() a una cadena de texto JSON, esto ya que si no es asi arroja un error al intentar encriptar
      // el objeto, luego usamos la funcion para encryptar la data que finalmente pasaremos mediante query en el router-link
      data1.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[0]));
      data2.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[1]));
      data3.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[2]));
      data4.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[3]));
      data5.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[4]));
      data6.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[5]));
      data7.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[6]));
      data8.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[7]));
      data9.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[8]));
      data10.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[9]));
      data11.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[10]));
      data12.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[11]));
      data13.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[12]));
      data14.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[13]));
      data15.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[14]));
      data16.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[15]));
      data17.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[16]));
      data18.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[17]));
      data19.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[18]));
      data20.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[19]));
      data21.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[20])); 
      data22.value = encryptData(JSON.stringify(dataEndpointByLinkMovies()[21])); 
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
      dataEndpointByLinkMovies,
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
      data8,
      data9,
      data10,
      data11,
      data12,
      data13,
      data14,
      data15,
      data16,
      data17,
      data18,
      data19,
      data20,
      data21,
      data22,
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
  /* desactiva la seleccion de los elementos del click izquierdo */
  user-select: none;
}

.box_left {
  display: flex;
  align-items: center;
  margin: 0rem 0rem 0.8rem 4rem;
  position: relative;
}

h1 {
  font-size: 2.3rem;
  cursor: default;
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
  padding: 0.5rem;
  position: absolute;
  top: 2.4rem;
  left: 12.5rem;
  border: 1px solid #323232;
}

.submenu_items {
  display: flex;
  flex-direction: column;
  width: 11rem;
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

@media (min-width: 300px) and (max-width: 580px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 1rem;
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
    font-size: 0.9rem;
  }

  #submenu {
    display: flex;
    flex-direction: column;
    top: 1.9rem;
    left: 7.5rem;
    gap: 0rem;
  }

  /* el "a" que representa el link viene siendo el router-link*/
  .submenu_items a {
    padding: 0.2rem 0rem 0.2rem 0rem;
  }
}

@media (min-width: 581px) and (max-width: 889px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 1rem;
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
    font-size: 0.9rem;
  }

  #submenu {
    top: 1.9rem;
    left: 7.5rem;
  }

  .submenu_items {
    display: flex;
    flex-direction: column;
    width: 9rem;
    text-align: left;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 2rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .box_left {
    margin: 0rem 0rem 0.8rem 2rem;
  }
}
</style>