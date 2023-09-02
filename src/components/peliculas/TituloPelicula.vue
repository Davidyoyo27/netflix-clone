<template>
  <div v-if="!flagTitleExist" class="title_bar">
    <router-link :to="{ name: 'peliculas' }">Peliculas ></router-link>
    <h1>{{ titlePelicula }}</h1>
  </div>
  <div v-else>
    <ComboboxGenerosPeliculas></ComboboxGenerosPeliculas>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, onMounted } from "vue";
export default {
  props: {
    titlePelicula: {
      type: String,
      required: true,
      // definimos un valor por defecto a mostrar en la variable "titleSerie"
      // en caso de que no venga un titulo mediante las props
      default: "No hay titulo",
    },
  },
  components: {
    ComboboxGenerosPeliculas: defineAsyncComponent(() => import(/* webpackChunkName: "ComboboxGenerosPeliculas.vue" */ "@/components/peliculas/ComboboxGenerosPeliculas")),
  },
  setup(props) {
    const flagTitleExist = ref(false);

    // cuando se monte el componente validamos si mediante el props no viene un titulo, de ser asi, se cambiara el estado
    // de la bandera y se mostrara el componente Combobox, en caso contrario y que si exista un titulo se mostrara ese titulo y no el Combobox
    onMounted(() =>
      props.titlePelicula === "No hay titulo" ? (flagTitleExist.value = true) : (flagTitleExist.value = false)
    );

    return {
      flagTitleExist,
    };
  },
};
</script>

<style scoped>
.title_bar {
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
  /* desactiva la seleccion de los elementos del click izquierdo */
  user-select: none;
}

.title_bar a {
  text-decoration: none;
  font-size: 1.1rem;
  padding-left: 4rem;
  color: #727171;
  cursor: pointer;
}

.title_bar h1 {
  font-size: 2.3rem;
  color: #fff;
  cursor: default;
}

@media (min-width: 300px) and (max-width: 466px) {
  .title_bar {
    align-items: flex-start;
    flex-direction: column;
  }

  .title_bar h1 {
    font-size: 1rem;
  }

  .title_bar a {
    padding-left: 1rem;
    font-size: 0.9rem;
  }

  .title_bar p {
    font-size: 0.9rem;
  }
}

@media (min-width: 467px) and (max-width: 889px) {
  .title_bar h1 {
    font-size: 1.3rem;
  }

  .title_bar a {
    padding-left: 1rem;
    font-size: 0.9rem;
  }

  .title_bar p {
    font-size: 0.9rem;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .title_bar a {
    padding-left: 2rem;
  }

  .title_bar h1 {
    font-size: 2rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .title_bar a {
    padding-left: 2rem;
  }
}
</style>