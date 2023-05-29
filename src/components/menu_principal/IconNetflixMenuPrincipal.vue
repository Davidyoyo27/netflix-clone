<template>
  <div class="container">
    <router-link to="/" class="link">
      <img v-bind:src="img_logo_principal_menu" alt="" />
    </router-link>
  </div>
</template>

<script>
import img_logo_principal_menu from "@/assets/Netflix_2015_logo.svg.png";

export default {
  setup() {
    return {
      img_logo_principal_menu,
    };
  },
};
</script>

<style scoped>
img {
  width: 5.8rem;
}

.link {
    display: flex;
}
</style>