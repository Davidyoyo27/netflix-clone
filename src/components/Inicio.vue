<template>
  <div class="container_principal">
    <div class="cont_video">
      <EmbedVideoPlayer></EmbedVideoPlayer>
    </div>
    <div class="cont_carousels">
      <div class="carousels">
        <!-- <SeriesEmocionantes></SeriesEmocionantes>
        <SugerenciasHoy></SugerenciasHoy>
        <SeriesSuspenso></SeriesSuspenso>
        <PeliculasAnime></PeliculasAnime>
        <PeliculasComedia></PeliculasComedia>
        <PeliculasFiccionFantasia></PeliculasFiccionFantasia>
        <PeliculasUltimoAnio></PeliculasUltimoAnio>
        <SeriesTop10></SeriesTop10>
        <PeliculasProximosEstrenos></PeliculasProximosEstrenos>
        <PeliculasAnimacion></PeliculasAnimacion>
        <PeliculasAccion></PeliculasAccion>
        <PeliculasDocumental></PeliculasDocumental>
        <PeliculasDocumentalEEUU></PeliculasDocumentalEEUU>
        <PeliculasCrimen></PeliculasCrimen>
        <PeliculasRomance></PeliculasRomance>
        <PeliculasMisterio></PeliculasMisterio>
        <PeliculasMusica></PeliculasMusica>
        <PeliculasTop10></PeliculasTop10>
        <PeliculasTerror></PeliculasTerror>
        <PeliculasHistoria></PeliculasHistoria>
        <PeliculasFamilia></PeliculasFamilia>
        <PeliculasDrama></PeliculasDrama>
        <PeliculasAnimeRomance></PeliculasAnimeRomance> -->
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// RECOMENDACION: al importar un componente no usar la extension .vue, ya que
// al traer 2 componentes de la misma ruta con la extension .vue este generara un error
// si bien el error no afecta el funcionamiento del modulo es molesto visualmente dentro del modulo
import EmbedVideoPlayer from "@/components/EmbedVideoPlayer";
import SeriesEmocionantes from "@/components/categoria_peliculas/SeriesEmocionantes";
import SugerenciasHoy from "@/components/categoria_peliculas/SugerenciasHoy";
import SeriesSuspenso from "@/components/categoria_peliculas/SeriesSuspenso";
import PeliculasAnime from "@/components/categoria_peliculas/PeliculasAnime";
import PeliculasComedia from "@/components/categoria_peliculas/PeliculasComedia";
import PeliculasFiccionFantasia from "@/components/categoria_peliculas/PeliculasCienciaFiccionFantasia";
import PeliculasUltimoAnio from "@/components/categoria_peliculas/PeliculasLanzamientoUltimoAnio";
import PeliculasProximosEstrenos from  "@/components/categoria_peliculas/PeliculasProximosEstrenos";
import PeliculasAnimacion from "@/components/categoria_peliculas/PeliculasAnimacion";
import PeliculasAccion from "@/components/categoria_peliculas/PeliculasAccion";
import PeliculasDocumental from "@/components/categoria_peliculas/PeliculasDocumental";
import PeliculasDocumentalEEUU from "@/components/categoria_peliculas/PeliculasDocumentalEEUU";
import PeliculasCrimen from "@/components/categoria_peliculas/PeliculasCrimen";
import PeliculasRomance from "@/components/categoria_peliculas/PeliculasRomance";
import PeliculasMisterio from "@/components/categoria_peliculas/PeliculasMisterio";
import PeliculasMusica from "@/components/categoria_peliculas/PeliculasMusica";
import PeliculasTerror from "@/components/categoria_peliculas/PeliculasTerror";
import PeliculasHistoria from "@/components/categoria_peliculas/PeliculasHistory";
import PeliculasFamilia from "@/components/categoria_peliculas/PeliculasFamilia";
import PeliculasDrama from "@/components/categoria_peliculas/PeliculasDrama";
import PeliculasAnimeRomance from "@/components/categoria_peliculas/PeliculasAnimeRomance";
import PeliculasTop10 from  "@/components/categoria_peliculas/PeliculasTop10";
import SeriesTop10 from "@/components/categoria_peliculas/SeriesTop10";
import Footer from "@/components/Footer";

export default {
  // En caso de querer llamar a algun componente con el Composition API
  // es de esta manera, fuera del setup()
  components: {
    SeriesEmocionantes,
    EmbedVideoPlayer,
    SugerenciasHoy,
    SeriesSuspenso,
    PeliculasAnime,
    PeliculasComedia,
    PeliculasFiccionFantasia,
    PeliculasUltimoAnio,
    PeliculasProximosEstrenos,
    PeliculasAnimacion,
    PeliculasAccion,
    PeliculasDocumental,
    PeliculasDocumentalEEUU,
    PeliculasCrimen,
    PeliculasRomance,
    PeliculasMisterio,
    PeliculasMusica,
    PeliculasTerror,
    PeliculasHistoria,
    PeliculasFamilia,
    PeliculasDrama,
    PeliculasAnimeRomance,
    PeliculasTop10,
    SeriesTop10,
    Footer,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.container_principal {
  position: relative;
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

.footer{
  position: relative;
  bottom: 0;
}

@media (min-width: 300px) and (max-width: 889px) {
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