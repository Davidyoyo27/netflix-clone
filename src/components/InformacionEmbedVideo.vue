<template>
  <div class="wrapper">
    <div class="container">
        <p>adsdasdasdasdsaads</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const decirAlgo = () => console.log("holaaaaa");

defineExpose({
    decirAlgo,
});
</script>

<style scoped>
.wrapper {
  background-color: aqua;
  width: 100%;
  height: 50vh; /*auto*/
  position: absolute;
  display: flex;
  justify-content: center;
}

.container{
    background-color: cadetblue;
    width: 70%;
}
</style>