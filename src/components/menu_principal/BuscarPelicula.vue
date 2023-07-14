<template>
  <div class="input-cont">
    <!-- ICONO BUSCAR -->
    <font-awesome-icon class="icon_input" icon="fa-solid fa-magnifying-glass" />
    <!-- ICONO BUSCAR -->
    <!-- INPUT TEXT -->
    <input
      v-model.trim="input_value"
      ref="clear_input"
      id="click_input"
      type="search"
      placeholder="Títulos, personas, géneros"
    />
    <!-- INPUT TEXT -->
    <!-- ICONO(X) BORRAR TEXTO -->
    <font-awesome-icon
      icon="fa-solid fa-rectangle-xmark"
      id="icon_clear_text"
      v-on:click="clearInputText()"
      v-show="icon_visible"
    />
    <!-- ICONO(X) BORRAR TEXTO -->
  </div>
  <!-- PASAR EL VALOR FINAL CON TODOS LOS DATOS, OSEA UN ARRAY QUE CONTENGA TODA LA INFO HACI UN NUEVO COMPONENTE
      Y ESTE SERA EL QUE MOSTRARA LAS IMAGENES DE LAS PELICULAS SEGUN LA BUSQUEDA, USAR LA MISMA LOGICA QUE CON EL CARRUSEL -->
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const input_value = ref("");
    // icono de X dentro del input no visible
    const icon_visible = ref(false);
    const clear_input = ref(null);
    // variable a la que accederemos para poder enviar la data por url
    const router = useRouter();

    function clearInputText() {
      icon_visible.value = false;
      input_value.value = "";
      // clear_input es la variable asignada en el ref del input
      clear_input.value.focus();
    }

    // utilizamos el watch para capturar la data del input cuando vaya cambiando
    // a traves de la variable input_value, el newValue en este caso sera la que
    // vaya cambiando y capturara cada caracter ingresado en el input
    watch(input_value, (newValue) => {
      // si existe algun caracter dentro de newValue
      if (newValue != "") {
        icon_visible.value = true;
        // asignamos la data dentro del input a una variable
        const data_input = input_value.value;
        // usamos el router para enviar lo ingresado en el input por la url
        // esto es llamado "query params"
        // al enviarlo se necesitan en este caso 2 valores, name: "nombre de la ruta"
        //  y query: "la data que se enviara"
        router.push({
          name: "resultado_busqueda_pelicula",
          query: {
            data_input,
          },
        });
      } else {
        // si el contenido del input esta vacio, redireccionara a la pagina de Inicio
        router.push({ name: "/" });
        icon_visible.value = false;
      }
    });

    return {
      input_value,
      icon_visible,
      clear_input,
      clearInputText,
    };
  },
};
</script>

<style scoped>
#click_input:focus::placeholder,
#click_input,
#icon_clear_text {
  color: #fff;
}

#icon_clear_text {
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  right: 0;
  margin-right: 0.5rem;
}

#click_input::placeholder {
  color: #000;
}

.icon_input {
  position: absolute;
  margin-left: 0.4rem;
  color: #edebeb;
}

#click_input {
  border: 1px solid #555;
  width: 2rem;
  padding: 0.4rem 0rem 0.4rem 2rem;
  background-color: #000;
  opacity: 0;
  cursor: pointer;
}

.input-cont {
  position: relative;
  display: flex;
  align-items: center;
}

.input-cont:focus {
  border: 1px solid #fff;
}

/* el :focus se activa cuando se le hace click al input */
#click_input:focus {
  width: 17rem;
  font-size: 14px;
  /* transicion del input cuando se abre */
  transition: width 0.3s ease-in-out;
  outline: none;
  border: 1px solid #fff;
  opacity: 1;
  cursor: auto;
}

@media (min-width: 300px) and (max-width: 889px) {
  #click_input:focus {
    width: 16rem;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  #click_input:focus {
    width: 16rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  #click_input:focus {
    width: 14rem;
  }
}
</style>