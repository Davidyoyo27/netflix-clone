<template>
  <nav>
    <div id="principal_menu">
      <!-- INICIO MENU IZQUIERDO -->
      <div class="first_option_menu">
        <router-link to="/">
          <img v-bind:src="img_logo_principal_menu" alt="" />
        </router-link>
        <!-- INICIO RESPONSIVE MENU -->
        <ul class="responsive_menu">
          <li>
            <div class="cont_responsive_menu">
              <div class="container_text">
                <p>Explorar</p>
                <div class="figure"></div>
              </div>
              <ul class="responsive_menu_options">
                <div class="figure_left_menu"></div>
                <router-link to="/"><li>Inicio</li></router-link>
                <router-link to="/series"><li>Series</li></router-link>
                <router-link to="/peliculas"><li>Películas</li></router-link>
                <router-link to="/novedades"
                  ><li>Novedades populares</li></router-link
                >
                <router-link to="/mi_lista"><li>Mi lista</li></router-link>
                <router-link to="/explora_por_idiomas"
                  ><li>Explora por idiomas</li></router-link
                >
              </ul>
            </div>
          </li>
        </ul>
        <!-- FIN RESPONSIVE MENU -->
        <div class="normal_options_menu">
          <router-link to="/" class="link">
            <li>Inicio</li>
          </router-link>
          <router-link to="/series" class="link">
            <li>Series</li>
          </router-link>
          <router-link to="/peliculas" class="link">
            <li>Películas</li>
          </router-link>
          <router-link to="/novedades" class="link">
            <li>Novedades populares</li>
          </router-link>
          <router-link to="/mi_lista" class="link">
            <li>Mi lista</li>
          </router-link>
          <router-link to="/explora_por_idiomas" class="link">
            <li>Explora por idiomas</li>
          </router-link>
        </div>
      </div>
      <!-- FIN MENU IZQUIERDO -->
      <!-- INICIO MENU DERECHO -->
      <div class="second_option_menu">
        <!-- INICIO INPUT -->
        <BuscarPelicula></BuscarPelicula>
        <!-- FIN INPUT -->
        <router-link class="link-second-menu" to="">Niños</router-link>
        <font-awesome-icon class="icon" icon="fa-solid fa-bell" />
        <!-- INICIO PERFIL MENU -->
        <ul class="right_menu">
          <li>
            <div class="cont-menu">
              <div class="cont-img-icon">
                <img class="img-icon" v-bind:src="img_perfil_menu" alt="" />
                <div class="figure"></div>
              </div>
              <ul class="submenu">
                <div class="figure_right_menu"></div>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_perfil_2_right_menu"
                      alt=""
                    />
                    <p>Juan</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_perfil_3_right_menu"
                      alt=""
                    />
                    <p>Tito</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_perfil_4_right_menu"
                      alt=""
                    />
                    <p>Barbara</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_perfil_ninos_right_menu"
                      alt=""
                    />
                    <p>Niños</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_icon_admin_perfil_menu"
                      alt=""
                    />
                    <p>Administrar perfiles</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_icon_transfer_perfil"
                      alt=""
                    />
                    <p>Transferir perfil</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_icon_account"
                      alt=""
                    />
                    <p>Cuenta</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      v-bind:src="img_icon_center_of_help"
                      alt=""
                    />
                    <p>Centro de ayuda</p>
                  </div>
                </a>
                <a href="" class="session-close">
                  <p>Cerrar sesión en Netflix</p>
                </a>
              </ul>
            </div>
          </li>
        </ul>
        <!-- FIN PERFIL MENU -->
      </div>
      <!-- FIN MENU DERECHO -->
    </div>
    <!-- INICIO DIFUMINADO MENU -->
    <div class="principal_menu_gradient"></div>
    <!-- FIN DIFUMINADO MENU -->
  </nav>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import img_logo_principal_menu from "@/assets/Netflix_2015_logo.svg.png";
import img_perfil_menu from "@/assets/image-icon-netflix.png";
import img_perfil_2_right_menu from "@/assets/image-icon-netflix-2.png";
import img_perfil_3_right_menu from "@/assets/image-icon-netflix-3.png";
import img_perfil_4_right_menu from "@/assets/image-icon-netflix-4.png";
import img_perfil_ninos_right_menu from "@/assets/image-icon-netflix-5.png";
import img_icon_admin_perfil_menu from "@/assets/pencil-icon.jpg";
import img_icon_transfer_perfil from "@/assets/transfer-perfil-icon.jpg";
import img_icon_account from "@/assets/perfil-icon.png";
import img_icon_center_of_help from "@/assets/interrogation-icon.png";
import BuscarPelicula from "@/components/BuscarPelicula.vue";

export default {
  components: {
    // input
    BuscarPelicula,
  },
  setup() {
    // variable que contendra el valor del scroll al moverse
    // inicializada en 0
    const scrollTop = ref(0);

    onMounted(() => {
      // agregamos un escuchador que este atento a la interaccion del scroll
      // y le pasamos la funcion handleScroll
      window.addEventListener("scroll", handleScroll);
    });

    // removemos el escuchador una vez que la accion de la funcion handleScroll fue tomada
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    // observamos la variable scrollTop la cual detectaremos cualquier cambio que tenga
    watch(scrollTop, () => {
      // tomamos el id del div principal menu
      let menu_principal = document.getElementById("principal_menu");
      // si scrollTop es mayor a 0
      if (scrollTop.value > 0) {
        // le pasaremos al CSS del div principal_menu la propiedad backgroundColor
        // esto quiere decir que cuando se haga scroll hacia abajo la barra difuminada
        // del menu principal dejara de serlo y se vera del color solido asignado, en este caso negro(#000)
        menu_principal.style.backgroundColor = "#000";
      } else {
        // en su defecto si el scrollTop es 0 se removera la propiedad CSS "background-color"
        // del div menu_principal dejando la barra del menu con el difuminado
        menu_principal.style.removeProperty("background-color");
      }
    });

    // creamos la funcion
    function handleScroll() {
      // que contendra el valor del scrollY que en este caso es cuando
      // se haga scroll vertical para luego asignarsela a la variable
      // scrollTop
      scrollTop.value = window.scrollY;
    }

    return {
      // logo netflix menu principal
      img_logo_principal_menu,
      img_perfil_menu,
      // imagen icon perfil right menu
      img_perfil_2_right_menu,
      img_perfil_3_right_menu,
      img_perfil_4_right_menu,
      img_perfil_ninos_right_menu,
      // img icon opciones right menu
      img_icon_admin_perfil_menu,
      img_icon_transfer_perfil,
      img_icon_account,
      img_icon_center_of_help,
      scrollTop,
      handleScroll,
    };
  },
};
</script>

<style scoped>
#principal_menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.2rem;
  z-index: 2;
  position: fixed;
  width: 100%;
}

.principal_menu_gradient {
  position: absolute;
  width: 100%;
  box-shadow: rgb(0, 0, 0) 0px 0px 50px 80px;
  z-index: 1;
}

.first_option_menu {
  display: flex;
  align-items: center;
  margin-left: 4rem;
}

.second_option_menu {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-right: 5rem;
}

.first_option_menu a {
  text-decoration: none;
}

.first_option_menu a li {
  list-style: none;
  font-size: 14px;
  font-weight: 600;
  color: #d3d3d3;
}

.normal_options_menu .router-link-exact-active li {
  cursor: default;
}

.normal_options_menu .router-link-exact-active li:hover {
  color: #fff;
}

.first_option_menu img {
  width: 5.8rem;
  margin-right: 3rem;
}

.icon {
  font-size: 20px;
  cursor: pointer;
  color: #edebeb;
}

.normal_options_menu {
  display: flex;
  gap: 1rem;
}

.second_option_menu a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.normal_options_menu a li:hover {
  color: #8d8a8a;
  transition: 0.5s;
}

.right_menu > li {
  position: relative;
  display: inline-block;
}

.right_menu > li > a {
  display: block;
  font-family: "Open sans";
  text-decoration: none;
}

.submenu {
  position: absolute;
  background-color: #000;
  width: 380%;
  visibility: hidden;
  opacity: 0;
  /* el transition le da el desvanecimiento al 
  menu al momento de quitar el mouse de encima */
  transition: 0.5s;
  border-radius: 1px solid #000;
  right: 0rem;
  top: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 1rem;
}

.submenu a div {
  display: flex;
  align-items: center;
  margin: 0rem 0rem 0rem 0.5rem;
}

.submenu li {
  list-style: none;
}

.submenu a {
  text-decoration: none;
}

.submenu a:hover {
  text-decoration: underline;
}

.submenu div p {
  margin-left: 0.5rem;
  font-size: 13px;
  font-weight: 600;
}

.submenu p {
  color: #edebeb;
}

.session-close {
  padding: 1.2rem;
  border-top: 1.5px solid #6e6c6c;
}

.session-close p {
  font-size: 13px;
  font-weight: 600;
}

/* se despliega el right_menu al hacer hover */
.right_menu li:hover .submenu {
  visibility: visible;
  opacity: 1;
}

/* icono del perfil */
.img-icon {
  /* esta propiedad permite que la imagen siempre tenga el mismo 
  tamaño segun el ancho y alto que se le asigne */
  object-fit: contain;
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
}

/* creacion de la figura geometrica */
.figure {
  border-bottom: 5px solid darkgreen;
  border-left: 5px solid black;
  border-right: 5px solid blue;
  border-width: 5px;
  border-color: transparent;
  border-bottom-color: #f0eeee;
  width: 0;
  height: 0;
  margin-left: 10px;
  transform: rotate(180deg);
  transition: 0.4s;
}

.figure_right_menu {
  /* creacion de figura geometrica */
  border-bottom: 5px solid darkgreen;
  border-left: 8px solid black;
  border-right: 8px solid blue;
  border-width: 8px;
  border-color: transparent;
  border-bottom-color: #f0eeee;
  width: 0;
  height: 0;
  margin-left: 10px;
  transform: rotate(0deg);
  /* fin creacion de figura geometrica */
  /* posicionamiento del elemento */
  position: absolute;
  bottom: 25.5rem;
  left: 9rem;
  /* fin posicionamiento del elemento */
  cursor: pointer;
}

/* al hacer hover en el cont se mueve la figura creada */
/* ej de como mover otro elemento cuando se hace hover en otro elemento 
 pero el requisito es que el elemento a mover este contenido dentro de otro, 
 en este caso es el div cont*/
.cont-menu:hover .figure {
  /* rotate(XXXrad) para que la figura gire hacia la derecha y no hacia la izquierda 
    como lo hace de manera normal */
  transform: rotate(6.285rad);
  transition: 0.4s;
}

.cont-img-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* =========================== INICIO MENU RESPONSIVE =========================== */
/* el menu desaparece en el tamaño mas grande de la pantalla(monitor, notebook) */
.responsive_menu {
  display: none;
}

.responsive_menu > li {
  position: relative;
  display: inline-block;
}

.responsive_menu > li > a {
  display: block;
  font-family: "Open sans";
  text-decoration: none;
}

.responsive_menu_options {
  position: absolute;
  /* hace el menu transparente */
  background-color: rgba(0, 0, 0, 0.8);
  width: 380%;
  visibility: hidden;
  opacity: 0;
  transition: 0.5s;
  border-radius: 1px solid #000;
  right: -9.3rem;
  top: 4rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #5a5858;
  /* para evitar la linea del border en top */
  border-top: 1px solid #fff;
}

/* linea blanca del menu responsive de la izquierda(Explorar) */
.responsive_menu_options a:nth-child(2) {
  border-top: 2px solid #fff;
}

.responsive_menu_options li {
  list-style: none;
}

.responsive_menu_options a {
  text-decoration: none;
  padding: 1rem;
}

.responsive_menu_options a li {
  font-size: 13px;
  font-weight: 600;
}

.responsive_menu_options a:hover {
  background-color: rgba(73, 72, 72, 0.5);
}

.responsive_menu_options div p {
  margin-left: 0.5rem;
  font-size: 13px;
  font-weight: 600;
}

.responsive_menu li:hover .responsive_menu_options {
  visibility: visible;
  opacity: 1;
}

.figure_left_menu {
  /* inicio figura geometrica */
  border-bottom: 5px solid darkgreen;
  border-left: 8px solid black;
  border-right: 8px solid blue;
  border-width: 8px;
  border-color: transparent;
  border-bottom-color: #f0eeee;
  width: 0;
  height: 0;
  margin-left: 10px;
  transform: rotate(0deg);
  /* inicio figura geometrica */
  /* inicio posicionamiento */
  position: absolute;
  left: 8rem;
  bottom: 18rem;
  /* fin posicionamiento */
}

.cont_responsive_menu,
.responsive_menu_options a {
  color: #fff;
}

.container_text {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.cont_responsive_menu p {
  font-size: 14px;
  font-weight: 600;
}

.link-second-menu {
  color: #edebeb;
}

/* =========================== FIN MENU RESPONSIVE =========================== */

@media (min-width: 300px) and (max-width: 889px) {
  /* INICIO MENU IZQUIERDO */
  .first_option_menu {
    margin-left: 2rem;
  }

  .first_option_menu img {
    margin-right: 1rem;
  }

  .normal_options_menu a {
    display: none;
  }

  .responsive_menu {
    display: block;
  }

  /* FIN MENU IZQUIERDO */

  /* INICIO MENU DERECHO */
  .link-second-menu {
    display: none;
  }

  .second_option_menu {
    margin-right: 2rem;
  }

  /* al momento de estar en el tamaño de pantalla mas pequeña 
    el elemento se superpone al first_option_menu para que el 
    input al momento de abrirse no tenga problemas*/
  .second_option_menu {
    position: absolute;
    /* establecemos el menu al lado derecho */
    right: 0;
  }

  /* FIN MENU DERECHO */
}

@media (min-width: 890px) and (max-width: 1129px) {
  /* INICIO MENU IZQUIERDO */
  .first_option_menu {
    margin-left: 2rem;
  }

  .first_option_menu img {
    margin-right: 1rem;
  }

  .normal_options_menu a {
    display: none;
  }

  .responsive_menu {
    display: block;
  }
  /* FIN MENU IZQUIERDO */

  /* INICIO MENU DERECHO */
  .link-second-menu {
    display: none;
  }

  .second_option_menu {
    margin-right: 2rem;
  }
  /* FIN MENU DERECHO */
}

@media (min-width: 1130px) and (max-width: 1330px) {
  /* INICIO MENU IZQUIERDO */
  .first_option_menu {
    margin-left: 2rem;
  }

  .first_option_menu img {
    margin-right: 1rem;
  }
  /* FIN MENU IZQUIERDO */

  /* INICIO MENU DERECHO */
  .link-second-menu {
    display: none;
  }

  .second_option_menu {
    margin-right: 2rem;
  }
  /* FIN MENU DERECHO */
}
</style>