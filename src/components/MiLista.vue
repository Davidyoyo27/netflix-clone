<template>
  <div class="wrapper">
    <div class="container">
      <h1>Mi lista</h1>
      <div class="container_data">
        <span>Todavía no agregaste ningún título a tu lista.</span>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Footer.vue" */ "@/components/Footer")),
  },
}
</script>

<style scoped>
.wrapper {
  position: relative;
  z-index: 1;
}

.container {
  margin-top: 5rem;
  color: #fff;
}

h1{
  font-size: 2.3rem;
  font-weight: 500;
  margin-left: 4rem;
  text-align: left;
}

span {
  font-size: 1.2rem;
  color: #7b7b7b;
}

.container_data {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>