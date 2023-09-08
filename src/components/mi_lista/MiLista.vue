<template>
  <div>
    <TituloSimple :title="title"></TituloSimple>
    <div class="container_data">
      <span>Todavía no agregaste ningún título a tu lista.</span>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";

export default {
  components: {
    Footer: defineAsyncComponent(() => import(/* webpackChunkName: "Footer.vue" */ "@/components/Footer")),
    TituloSimple: defineAsyncComponent(() => import(/* webpackChunkName: "TituloSimple.vue" */ "@/components/TituloSimple")),
  },
  setup() {
    const title = ref("Mi lista");

    return {
      title,
    };
  },
};
</script>

<style scoped>
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