<template>
  <div class="container">
    <!-- recorremos el objecto objectArrayLinks -->
    <!--                   recordar especificar el :key="" que es la "clave unica"  -->
    <!--                   sin ella nos arrojaria un error y ademas lo ideal seria -->
    <!--                   especificar cual es la "clave unica", si bien es claro -->
    <!--                   podria usarse el name del objeto, este al repetirse podria -->
    <!--                   generar un error, por eso se recomienda usar la posicion del -->
    <!--                   elemento, en este caso item.number o en otro caso usar el index -->
    <!--              v-for="(index, item) in objectArrayLinks" :key="item.index" -->
    <div class="cont" v-for="item in objectArrayLinks" :key="item.number">
      <router-link :to="item.link" class="link">
        <p>{{ item.name_link }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    // definimos en un array los nombres de los links que se mostraran en el router link con un for
    // NOMBRE EN HTML
    const array_name_links = ref([
      "Inicio",
      "Series",
      "Peliculas",
      "Novedades populares",
      "Mi lista",
      "Explora por idiomas",
    ]);
    // definimos un array con los links donde seran redirigidos a sus respectivas rutas, esto seria como la etiqueta <a>
    // <a href="/series">Series</a>
    // ENLACE REDIRECCION
    const array_links = ref([
      "/",
      "/series",
      "/peliculas",
      "/novedades",
      "/mi_lista",
      "/explora_por_idiomas",
    ]);
    // creamos un objeto vacio que contendra los arrays para recorrerlo
    const objectArrayLinks = ref({});

    onMounted(() => {
      // comprobamos el largo del array contenedor de los links
      let valor_array = array_name_links.value.length;
      // usamos el array.from() para llenar el miArray con los numeros correlativos
      // 1,2,3,4... , esto sera usado para representar el numero(number) de los elementos
      // al crear el objeto
      // {
      //   number: 1
      //   name_link: "Series"
      //   link: "/series"
      // },
      // {
      //   number: 2
      //   name_link: "Peliculas"
      //   link: "/peliculas"
      // },
      const miArray = Array.from(
        { length: valor_array },
        (_, index) => index + 1
      );

      // recorremos miArray que es el que representa a la posicion de cada elemento(number)
      objectArrayLinks.value = miArray.map((currentValue, index) => {
        // retornamos el resultado final con la siguiente estructura que sera la del Objeto
        return {
          // esta representa el valor correspondiente a miArray el cual es recorrido (1,2,3,4...etc.)
          number: currentValue,
          // representa el nombre del link que sera visible en el menu
          name_link: array_name_links.value[index],
          // representa la direccion del enlace, la cual sera la ruta donde se redireccionara
          link: array_links.value[index],
        };
      });
      
    });

    return {
      array_name_links,
      array_links,
      objectArrayLinks,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 1rem;
}

.link {
  text-decoration: none;
}

.link p {
  font-size: 14px;
  font-weight: 600;
  color: #d3d3d3;
}

.link p:hover {
  color: #8d8a8a;
  transition: 0.5s;
}
</style>