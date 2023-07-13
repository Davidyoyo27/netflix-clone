<template>
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
              <img class="img-icon" v-bind:src="img_icon_account" alt="" />
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
</template>

<script>
import img_perfil_menu from "@/assets/image-icon-netflix.png";
import img_perfil_2_right_menu from "@/assets/image-icon-netflix-2.png";
import img_perfil_3_right_menu from "@/assets/image-icon-netflix-3.png";
import img_perfil_4_right_menu from "@/assets/image-icon-netflix-4.png";
import img_perfil_ninos_right_menu from "@/assets/image-icon-netflix-5.png";
import img_icon_admin_perfil_menu from "@/assets/pencil-icon.jpg";
import img_icon_transfer_perfil from "@/assets/transfer-perfil-icon.jpg";
import img_icon_account from "@/assets/perfil-icon.png";
import img_icon_center_of_help from "@/assets/interrogation-icon.png";

export default {
  setup() {
    return {
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
    }
  },
};
</script>

<style scoped>
.right_menu > li {
  position: relative;
  display: inline-block;
}

.right_menu > li > a {
  display: block;
  font-family: "Open sans";
  text-decoration: none;
}

/* se despliega el right_menu al hacer hover */
.right_menu li:hover .submenu {
  visibility: visible;
  opacity: 1;
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

.submenu {
  position: absolute;
  background-color: #000;
  width: 380%;
  visibility: hidden;
  opacity: 0;
  /* el transition le da el desvanecimiento al 
  menu al momento de quitar el mouse de encima */
  transition: 0.3s;
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

/* se despliega el right_menu al hacer hover */
.right_menu li:hover .submenu {
  visibility: visible;
  opacity: 1;
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

.session-close {
  padding: 1.2rem;
  border-top: 1.5px solid #6e6c6c;
}

.session-close p {
  font-size: 13px;
  font-weight: 600;
}
</style>