<template>
  <div class="input-cont">
    <!-- ICONO BUSCAR -->
    <font-awesome-icon class="icon_input" icon="fa-solid fa-magnifying-glass" />
    <!-- ICONO BUSCAR -->
    <!-- INPUT TEXT -->
    <input
      v-model="input_value"
      ref="clear_input"
      id="click_input"
      class="input_search"
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
</template>

<script>
import { ref, watch } from "vue"

export default {
    setup(){
    const input_value = ref("");
    // icono de X dentro del input no visible
    const icon_visible = ref(false);
    const clear_input = ref(null);

    watch(input_value, (newValue, oldValue) => {
      if(newValue != ""){
        icon_visible.value = true;
      }else{
        icon_visible.value = false;
      }
    })

    function clearInputText(){
      icon_visible.value = false;
      input_value.value = "";
      // clear_input es la variable asignada en el ref del input
      clear_input.value.focus();
    }
 
    return {
      input_value,
      icon_visible,
      clear_input,
      clearInputText,
    }
  }
};
</script>

<style scoped>
.input_search:focus::placeholder,
.input_search,
#icon_clear_text{
  color: #fff;
}

#icon_clear_text {
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  right: 0;
  margin-right: 0.5rem;
}

.input_search::placeholder {
  color: #000;
}

.icon_input {
  position: absolute;
  margin-left: 0.4rem;
  color: #edebeb;
}

.input_search {
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
.input_search:focus {
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
  .input_search:focus {
    width: 16rem;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .input_search:focus {
    width: 16rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .input_search:focus {
    width: 16rem;
  }
}
</style>