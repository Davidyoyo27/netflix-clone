<template>
  <div id="container_top">
    <div class="title">
      <TituloSimple :title="title"></TituloSimple>
    </div>
    <div class="comboboxs">
      <CboIdiomaOriginal></CboIdiomaOriginal>
      <CboIdiomas></CboIdiomas>
      <CboSugerencias></CboSugerencias>
    </div>
  </div>
  <div v-if="FlagVisibleData">
    <div class="wrap_container">
      <div class="box">
        <div class="container_movies" v-for="data in dataPosterMovie" :key="data">
          <img :src="link_img + data.poster_path" :alt="data.name" />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, computed, watch, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import services from "@/helpers/services/services";
import { totalTVMoviesVisualization } from "@/helpers/js/functions";

export default {
  components: {
    TituloSimple: defineAsyncComponent(() => import(/* webpackChunkName: "TituloSimple.vue" */ "@/components/TituloSimple")),
    CboIdiomaOriginal: defineAsyncComponent(() => import(/* webpackChunkName: "ComboboxIdiomaOriginal.vue" */ "@/components/explora_por_idiomas/comboboxs/ComboboxIdiomaOriginal")),
    CboIdiomas: defineAsyncComponent(() => import(/* webpackChunkName: "ComboboxIdiomas.vue" */ "@/components/explora_por_idiomas/comboboxs/ComboboxIdiomas")),
    CboSugerencias: defineAsyncComponent(() => import(/* webpackChunkName: "ComboboxSugerencias.vue" */ "@/components/explora_por_idiomas/comboboxs/ComboboxSugerencias")),
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Footer.vue" */ "@/components/Footer")),
  },
  setup() {
    const title = ref("Explora por idiomas");
    const name1 = ref("Idioma original");
    const name2 = ref("Inglés");
    const name3 = ref("Sugerencias para ti");
    const arrayData1 = ref(null);
    const arrayData2 = ref(null);
    const arrayData3 = ref(null);
    const store = useStore();
    const totalResults = ref(null);
    const dataPosterMovie = ref(null);
    const FlagVisibleData = ref(false);
    const link_img = ref("https://image.tmdb.org/t/p/w500");
    // variable que contendra el valor del scroll al moverse
    // inicializada en 0
    const scrollTop = ref(0);

    // creamos la funcion
    function handleScroll() {
      // que contendra el valor del scrollY que en este caso es cuando
      // se haga scroll vertical para luego asignarsela a la variable scrollTop
      scrollTop.value = window.scrollY;
    }

    // llamamos a la data almacenada en el store
    const filtroIdiomaOriginal = computed(() => store.state.filtroIdiomaOriginal);

    const filtroIdiomas = computed(() => store.state.filtroIdiomas);

    const filtroSugerencias = computed(() => store.state.filtroSugerencias);

    // funcion con 3 parametros opcionales
    // actualmente el tercer parametro no existe puesto que no habia forma de obtener el filtro en el endpoint para realizar el cambio
    function createEndpointWithFilters(firstFilter = "", secondFilter = "", thirdFilter = "") {
      // este endpoint sera el estandar puesto que lo que cambian en este y los otros son solo los filtros, la siguiente data esta
      // contenida en todos los llamados al servicio
      return `/discover/tv?language=es-MX&first_air_date.gte=2010&with_watch_providers=8&watch_region=CL&with_origin_country=${firstFilter}&sort_by=${secondFilter}${thirdFilter}`;
    }

    onMounted(async () => {
      // agregamos un escuchador que este atento a la interaccion del scroll
      // y le pasamos la funcion handleScroll
      window.addEventListener("scroll", handleScroll);
      // usamos la funcion con el enpoint completo a la cual le pasaremos como primer parametro(obligatorio) los filtros que vienen desde la url
      const endpoint = createEndpointWithFilters();
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
    watch(scrollTop, () => {
      // tomamos el id del div principal menu
      let container_top = document.getElementById("container_top");
      // si scrollTop es mayor a 0
      if (scrollTop.value > 0) {
        // le pasaremos al CSS del div principal_menu la propiedad backgroundColor
        // esto quiere decir que cuando se haga scroll hacia abajo la barra difuminada
        // del menu principal dejara de serlo y se vera del color solido asignado, en este caso negro(#000)
        container_top.style.backgroundColor = "#141414";
        container_top.style.removeProperty("transition");
      } else {
        // en su defecto si el scrollTop es 0 se removera la propiedad CSS "background-color"
        // del div container_top dejando la barra del menu con el difuminado
        container_top.style.removeProperty("background-color");
        // cuando se esta en la posicion 0 del scroll, osea arriba, se le añade un efecto de transicion
        container_top.style.transition = "1s";
      }
    });

    // observamos la data que viene en los filtros,
    // usamos el .value en la variable data puesto que es una propiedad computada y para acceder a su valor se debe usar asi
    watch(
      // como se observara mas de una variable (en este caso 3) usamos un array con estas variables
      [
        () => filtroIdiomaOriginal.value,
        () => filtroIdiomas.value,
        () => filtroSugerencias.value,
      ],
      // luego asignamos un newValue por cada una de esas variables segun la posicion de cada una en el array
      async ([newValue1, newValue2, newValue3]) => {
        // al realizar el cambio en el combobox para simular la carga ocultamos la data cambiando el estado de la bandera a false
        FlagVisibleData.value = false;
        // pasamos a la funcion los filtros iniciales que vienen del route en "filtersSerie" y aca usamos el
        // segundo parametro opcional de la funcion, al cual le pasamos los filtros que enviamos al store del Vuex
        const finalEndpointWithFiltersCombobox = createEndpointWithFilters(
          newValue2,
          newValue3
        );
        // pasamos la data correspondiente a la funcion, endpoint con sus filtros y cantidad total de resultados deseados
        dataPosterMovie.value = await totalTVMoviesVisualization(
          finalEndpointWithFiltersCombobox,
          totalResults.value
        );
        // hacemos visible la data una vez se termine de consultar al servicio
        FlagVisibleData.value = true;
      }
    );

    return {
      title,
      name1,
      name2,
      name3,
      arrayData1,
      arrayData2,
      arrayData3,
      FlagVisibleData,
      dataPosterMovie,
      link_img,
    };
  },
};
</script>

<style scoped>
#container_top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 1rem;
  position: fixed;
  z-index: 2;
}

.comboboxs {
  display: flex;
  position: relative;
  margin-right: 5rem;
  z-index: 1;
}

.wrap_container {
  display: flex;
  justify-content: center;
  padding: 16rem 0rem 5rem 0rem;
}

.box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 95%;
}

.container_movies {
  margin: 1rem 0rem 1rem 0rem;
}

img {
  height: 18.75rem;
  border-radius: 0.3rem;
}

@media (min-width: 300px) and (max-width: 889px) {
  img {
    height: 13.75rem;
  }

  #container_top {
    flex-direction: column;
  }

  .comboboxs {
    margin-top: 1rem;
    justify-content: center;
    margin-right: 0rem;
    flex-wrap: wrap;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  #container_top {
    flex-direction: column;
  }

  .comboboxs {
    margin-top: 1rem;
    justify-content: center;
    margin-right: 0rem;
    flex-wrap: wrap;
  }
}

@media (min-width: 1130px) and (max-width: 1380px) {
  img {
    height: 15.75rem;
  }

  #container_top {
    flex-direction: column;
  }

  .comboboxs {
    margin-top: 1rem;
    justify-content: center;
    margin-right: 0rem;
  }
}
</style>