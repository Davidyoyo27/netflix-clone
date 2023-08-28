<template>
  <div class="wrapper">
    <div id="title_container">
      <TitleSerie :titleSerie="titleSerie"></TitleSerie>
      <!-- ICONOS DERECHA -->
      <div class="box_right">
        <div class="icon_right">
          <a @click="$router.go(-1)">
            <font-awesome-icon class="icon" icon="fa-solid fa-align-left" />
          </a>
        </div>
        <div class="container_select">
          <div id="icon_suggestion" @mousedown="clickBoton" @click.stop>
            <font-awesome-icon
              class="icon"
              icon="fa-solid fa-table-cells-large"
            />
            <span>Sugerencias para ti</span>
            <div class="figure_right_menu"></div>
          </div>
          <div v-if="flagVisibleSubmenu" id="submenu">
            <div class="submenu_items">
              <span @click="sendFilter(suggestions)">Sugerencias para ti</span>
              <span @click="sendFilter(releaseYear)">Año de lanzamiento</span>
              <span @click="sendFilter(alphabeticallyAZ)">A-Z</span>
              <span @click="sendFilter(alphabeticallyZA)">Z-A</span>
            </div>
          </div>
        </div>
      </div>
      <!-- ICONOS DERECHA -->
    </div>
    <div v-if="FlagVisibleData">
      <div class="wrap_container">
        <div class="container">
          <div class="container_movies" v-for="data in dataPosterMovie" :key="data">
            <img class="img_poster" :src="link_img + data.poster_path" :alt="data.name" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent, watch, computed, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import services from "@/helpers/services/services";
import { totalTVMoviesVisualization, decryptData } from "@/helpers/js/functions";
// importamos el useStore para poder hacer uso de la data contenida ahi
import { useStore } from "vuex";

export default {
  components: {
    TitleSerie: defineAsyncComponent(() => import(/* webpackChunkName: "TitleSerie.vue" */ "@/components/series/TitleSerie")),
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Footer.vue" */ "@/components/Footer")),
  },
  setup() {
    const route = useRoute();
    // recibimos la data por ruta
    const receivedData = route?.query?.fed || "vacio";
    // desencriptamos la data
    const decryptedData = decryptData(receivedData);
    // usamos el JSON.parse para transformar la data de un texto plano al objeto correspondiente
    const parsedData = JSON.parse(decryptedData);
    // titulo de la serie
    const titleSerie = parsedData.title;
    // filtros del endpoint de la serie
    const filtersSerie = parsedData.filters;
    // data final que se mostrara por pantalla (peliculas)
    const dataPosterMovie = ref(null);
    const link_img = ref("https://image.tmdb.org/t/p/w500");
    // bandera para mostrar u ocultar el menu (false: oculto)
    const flagVisibleSubmenu = ref(false);
    // filtro para regresar al orden inicial "sugerencias para ti"
    const suggestions = ref("");
    // filtro orden por fecha
    const releaseYear = ref("&sort_by=primary_release_date.desc");
    // filtro orden alfabetico A-Z
    const alphabeticallyAZ = ref("&sort_by=original_title.asc");
    // filtro orden alfabetico Z-A
    const alphabeticallyZA = ref("&sort_by=original_title.desc");
    // instancia del store de vuex que usaremos para llamar a la data almacenada ahi
    const store = useStore();
    // bandera que oculta los elementos hasta que la data este lista
    const FlagVisibleData = ref(false);
    // variable que contendra el valor del scroll al moverse
    // inicializada en 0
    const scrollTop = ref(0);
    // cantidad de elementos segun la llamada del endpoint
    const totalResults = ref(0);

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

    // creamos la funcion
    function handleScroll() {
      // que contendra el valor del scrollY que en este caso es cuando
      // se haga scroll vertical para luego asignarsela a la variable scrollTop
      scrollTop.value = window.scrollY;
    }

    // funcion que recibe por parametro los filtros del endpoint
    const sendFilter = (filter) => {
      // usamos el store.dispatch() para enviar la data al store del vuex
      store.dispatch("actualizarFiltro", filter);
      // al momento de hacer click en cualquier de la opciones del combobox pasamos el false a la bandera
      // para que se cierre el div, ya que si no este quedaba abierto
      flagVisibleSubmenu.value = false;
      // a penas se de click en una de las opciones ocultamos las imagenes de las peliculas, esto para simular su carga
      FlagVisibleData.value = false;
    };

    // llamamos a la data almacenada en el store en la variable filtroValue
    // cuando el valor de store.state.filtroValue cambie, el valor de la propiedad computada filtro se actualizará automáticamente
    const filtro = computed(() => store.state.filtroValue);

    // funcion con 2 parametros uno obligatorio y otro opcional
    // para tener el parametro opcional se inicializa de esta manera su variable
    // el parametro opcional es ya que este recibira la data que viene de los filtros en el combobox "Sugerencias para ti"
    // por eso en caso de que este valor no este y como este esta al final del endpoint su estado inicial sera "" o [empty string]
    function createEndpointWithFilters(filter, secondFilter = "") {
      // este endpoint sera el estandar puesto que lo que cambian en este y los otros son solo los filtros, la siguiente data esta
      // contenida en todos los llamados al servicio
      return `/discover/tv?language=es-MX&first_air_date.gte=2010&${filter}&with_watch_providers=8&watch_region=CL${secondFilter}`;
    }

    // Registrar el evento click en el documento cuando el componente está montado
    // Luego, registramos el evento click en el documento utilizando
    // document.addEventListener("click", handleClickOutside) cuando el componente está montado.
    onMounted(async () => {
      document.addEventListener("click", handleClickOutside);
      // agregamos un escuchador que este atento a la interaccion del scroll
      // y le pasamos la funcion handleScroll
      window.addEventListener("scroll", handleScroll);
      // usamos la funcion con el enpoint completo a la cual le pasaremos como primer parametro(obligatorio) los filtros que vienen desde la url
      const endpoint = createEndpointWithFilters(filtersSerie);
      // hacemos el llamado al servicio puesto que es necesario obtener la cantidad de resultados totales: "total_results"
      const response = await services.get_movie_services(1, endpoint);
      // obtenemos la cantidad total de resultados del servicio
      let respTotalResults = response.data.total_results;
      // validamos si los resultados contenidos en la variable son superiores a 500, esto ya que hay algunos servicios que traen
      // miles de datos y otros mucho menos
      // si los resultados son mayores a 500 el valor del total seran solo 500, en caso contrario se insertara en la variable la cantidad del servicio
      (respTotalResults > 500) ? totalResults.value = 500 : totalResults.value = response.data.total_results;
      // pasamos el endpoint y la cantidad de resultados para obtener finalmente las series
      dataPosterMovie.value = await totalTVMoviesVisualization(endpoint, totalResults.value);
      // hacemos visible la data una vez se termine de consultar al servicio
      FlagVisibleData.value = true;
    });

    // removemos el escuchador una vez que la accion de la funcion handleScroll fue tomada
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    // observamos la variable scrollTop la cual detectaremos cualquier cambio que tenga
    watch(scrollTop, (newValue) => {
      // tomamos el id del div principal menu
      let title_container = document.getElementById("title_container");
      // si scrollTop es mayor a 0
      if (newValue > 0) {
        // le pasaremos al CSS del div principal_menu la propiedad backgroundColor
        // esto quiere decir que cuando se haga scroll hacia abajo la barra difuminada
        // del menu principal dejara de serlo y se vera del color solido asignado, en este caso negro(#000)
        title_container.style.backgroundColor = "#141414";
        title_container.style.removeProperty("transition");
      } else {
        // en su defecto si el scrollTop es 0 se removera la propiedad CSS "background-color"
        // del div cont_combobox dejando la barra del menu con el difuminado
        title_container.style.removeProperty("background-color");
        // cuando se esta en la posicion 0 del scroll, osea arriba, se le añade un efecto de transicion
        title_container.style.transition = "1s";
      }
    });

    // observamos la data que viene en filtro, puesto que es la que contiene los filtros del store en Vuex
    // usamos el .value en la variable data puesto que es una propiedad computada y para acceder a su valor se debe usar asi
    watch(() => filtro.value, async (newValue) => {
        // pasamos a la funcion los filtros iniciales que vienen del route en "filtersSerie" y aca usamos el
        // segundo parametro opcional de la funcion, al cual le pasamos los filtros que enviamos al store del Vuex
        const finalEndpointWithFiltersCombobox = createEndpointWithFilters(filtersSerie, newValue);
        // pasamos la data correspondiente a la funcion, endpoint con sus filtros y cantidad total de resultados deseados
        dataPosterMovie.value = await totalTVMoviesVisualization(finalEndpointWithFiltersCombobox, totalResults.value);
        // hacemos visible la data una vez se termine de consultar al servicio
        FlagVisibleData.value = true;
      }
    );

    return {
      dataPosterMovie,
      link_img,
      titleSerie,
      flagVisibleSubmenu,
      clickBoton,
      sendFilter,
      suggestions,
      releaseYear,
      alphabeticallyAZ,
      alphabeticallyZA,
      FlagVisibleData,
      scrollTop,
      handleScroll,
    };
  },
};
</script>

<style scoped>
.wrapper {
  /* desactiva la seleccion de los elementos del click izquierdo */
  user-select: none;
}

#title_container {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 9rem;
  width: 100%;
  z-index: 1;
}

img {
  height: 18.75rem;
  border-radius: 0.3rem;
}

.wrap_container {
  display: flex;
  justify-content: center;
  padding: 16rem 0rem 5rem 0rem;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 95%;
}

.container_movies {
  margin: 1rem 0rem 1rem 0rem;
}

.box_right {
  display: flex;
  align-items: flex-end;
  margin: 0rem 5rem 0.5rem 0rem;
}

.icon_right {
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  border: 1px solid #b6b4b4;
}

.icon_right:hover {
  cursor: pointer;
  border: 1px solid #fff;
  color: #fff;
}

.icon_right .icon {
  color: #b6b4b4;
}

.icon_right:hover .icon {
  color: #fff;
}

#icon_suggestion {
  display: flex;
  align-items: center;
  min-width: 15rem;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  border: 1px solid #b6b4b4;
  color: #b6b4b4;
  cursor: pointer;
}

#icon_suggestion .icon {
  margin-right: 1rem;
}

#icon_suggestion span {
  font-weight: 600;
}

#icon_suggestion .figure_right_menu {
  margin-left: 3rem;
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
  top: 8.5rem;
  right: 5rem;
  border: 1px solid #fff;
}

.submenu_items {
  display: flex;
  flex-direction: column;
  width: 13rem;
  text-align: left;
}

.submenu_items a {
  text-decoration: none;
  font-size: 0.95rem;
  color: #fff;
}

.submenu_items a:hover {
  text-decoration: underline #fff;
}

.submenu_items span {
  color: #fff;
  cursor: pointer;
}

.submenu_items span:hover {
  text-decoration: underline #fff;
}

@media (min-width: 300px) and (max-width: 889px) {
  img {
    height: 13.75rem;
  }

  .box_right {
    margin: 0rem 1rem 0.5rem 0rem;
  }

  #submenu {
    right: 1rem;
  }
}

@media (min-width: 890px) and (max-width: 1330px) {
  img {
    height: 15.75rem;
  }

  .box_right {
    margin: 0rem 2rem 0.5rem 0rem;
  }

  #submenu {
    right: 2rem;
  }
}
</style>