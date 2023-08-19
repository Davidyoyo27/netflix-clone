<template>
  <nav>
    <div id="principal_menu">
      <!-- INICIO MENU IZQUIERDO -->
      <div class="first_option_menu">
        <div class="icon_menu">
          <IconNetflixMenuPrincipal></IconNetflixMenuPrincipal>
        </div>
        <!-- INICIO RESPONSIVE MENU -->
        <div class="responsive_menu">
          <MenuResponsive></MenuResponsive>
        </div>
        <!-- FIN RESPONSIVE MENU -->
        <div class="normal_options_menu">
          <!-- COMPONENTE CON LOS LINKS DEL MENU INICIO -->
          <LinksMenuPrincipal></LinksMenuPrincipal>
        </div>
      </div>
      <!-- FIN MENU IZQUIERDO -->
      <!-- INICIO MENU DERECHO -->
      <div class="second_option_menu">
        <!-- INICIO INPUT -->
        <BuscarPelicula></BuscarPelicula>
        <!-- FIN INPUT -->
        <router-link class="link_ninos_second_menu" to="">Niños</router-link>
        <font-awesome-icon class="icon" icon="fa-solid fa-bell" />
        <!-- INICIO PERFIL MENU -->
        <div class="right_menu">
          <RightMenuMenuPrincipal></RightMenuMenuPrincipal>
        </div>
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
import BuscarPelicula from "@/components/menu_principal/BuscarPelicula";
import LinksMenuPrincipal from "@/components/menu_principal/LinksMenuPrincipal";
import MenuResponsive from "@/components/menu_principal/MenuResponsive";
import RightMenuMenuPrincipal from "@/components/menu_principal/RightMenuMenuPrincipal";
import IconNetflixMenuPrincipal from "@/components/menu_principal/IconNetflixMenuPrincipal";

export default {
  components: {
    // input
    BuscarPelicula,
    // links del menu principal
    LinksMenuPrincipal,
    // menu responsive del menu principal
    MenuResponsive,
    // right menu del menu principal
    RightMenuMenuPrincipal,
    // icon del menu principal
    IconNetflixMenuPrincipal,
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
        menu_principal.style.backgroundColor = "#141414";
        menu_principal.style.transition = "";
      } else {
        // en su defecto si el scrollTop es 0 se removera la propiedad CSS "background-color"
        // del div menu_principal dejando la barra del menu con el difuminado
        menu_principal.style.removeProperty("background-color");
        menu_principal.style.transition = "1s";
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
  position: fixed;
  transition: all .3s;
  width: 100%;
  z-index: 3;
}

.icon_menu {
  margin-right: 3rem;
}

.principal_menu_gradient {
  position: absolute;
  width: 100%;
  box-shadow: rgb(0, 0, 0) 0px 10px 50px 80px;
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

.icon {
  font-size: 20px;
  cursor: pointer;
  color: #edebeb;
}

.second_option_menu a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

/* =========================== INICIO MENU RESPONSIVE =========================== */
/* el menu desaparece en el tamaño mas grande de la pantalla(monitor, notebook) */
.responsive_menu {
  display: none;
}

.link_ninos_second_menu {
  color: #edebeb;
}

/* =========================== FIN MENU RESPONSIVE =========================== */

@media (min-width: 300px) and (max-width: 889px) {
  /* INICIO MENU IZQUIERDO */
  .first_option_menu {
    margin-left: 1rem;
  }

  .first_option_menu img {
    margin-right: 1rem;
  }

  .normal_options_menu {
    display: none;
  }

  .icon_menu {
    margin-right: 1rem;
  }

  .responsive_menu {
    display: block;
  }
  /* FIN MENU IZQUIERDO */

  /* INICIO MENU DERECHO */
  .link_ninos_second_menu {
    display: none;
  }

  .second_option_menu {
    margin-right: 1rem;
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

  .normal_options_menu {
    display: none;
  }

  .responsive_menu {
    display: block;
  }
  /* FIN MENU IZQUIERDO */

  /* INICIO MENU DERECHO */
  .link_ninos_second_menu {
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
  .link_ninos_second_menu {
    display: none;
  }

  .second_option_menu {
    margin-right: 2rem;
  }
  /* FIN MENU DERECHO */
}
</style>