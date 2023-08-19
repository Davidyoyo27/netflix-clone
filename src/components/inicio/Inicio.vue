<template>
  <div class="container_principal">
    <div class="cont_video">
      <ComponenteVideoInicio></ComponenteVideoInicio>
    </div>
    <div class="cont_carousels">
      <div class="carousels">
        <ColeccionCarruselesPeliculas></ColeccionCarruselesPeliculas>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// RECOMENDACION: al importar un componente no usar la extension .vue, ya que
// al traer 2 componentes de la misma ruta con la extension .vue este generara un error
// si bien el error no afecta el funcionamiento del modulo es molesto visualmente dentro del modulo
import ComponenteVideoInicio from "@/components/inicio/ComponenteVideoInicio";
import ColeccionCarruselesPeliculas from "@/components/inicio/ColeccionCarruselesPeliculas";
import Footer from "@/components/Footer";

export default {
  // En caso de querer llamar a algun componente con el Composition API
  // es de esta manera, fuera del setup()
  components: {
    ComponenteVideoInicio,
    ColeccionCarruselesPeliculas,
    Footer,
  },
};
</script>

<style scoped>
.container_principal {
  position: relative;
  background-color: #141414;
}

.cont_video {
  width: 100%;
  height: 50vw;
}

.cont_carousels {
  background-color: #141414;
  width: 100%;
  height: auto;
  box-shadow: rgb(0, 0, 0) 0px -50px 100px 30px;
  position: absolute;
  z-index: 1;
}

.carousels {
  position: relative;
  bottom: 9rem;
}

@media (min-width: 360px) and (max-width: 500px){
  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -10px 40px 20px;
  }

  .cont_video {
    margin-top: 1.8rem;
  }

  .carousels {
    bottom: 2.5rem;
  }
}

@media (min-width: 501px) and (max-width: 889px) {
  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -10px 40px 20px;
  }
  
  .carousels {
    bottom: 2rem;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -30px 100px 20px;
  }
  
  .carousels {
    bottom: 6rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .cont_carousels {
    box-shadow: rgb(0, 0, 0) 0px -50px 100px 20px;
  }

  .carousels {
    bottom: 7rem;
  }
}
</style>