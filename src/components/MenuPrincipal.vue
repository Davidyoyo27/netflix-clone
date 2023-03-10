<template>
  <nav>
    <div class="principal_menu">
      <!-- INICIO MENU IZQUIERDO -->
      <div class="first_option_menu">
        <img src="../assets/Netflix_2015_logo.svg.png" alt="" />
        <!-- INICIO RESPONSIVE MENU -->
        <ul class="responsive_menu">
          <li>
            <div class="cont_responsive_menu">
              <p>Explorar</p>
              <div class="figure"></div>
              <ul class="responsive_menu_options">
                <div class="cont-figure-left-menu">
                  <div class="figure_left_menu"></div>
                </div>
                <a href="">Inicio</a>
                <a href="">Series</a>
                <a href="">Películas</a>
                <a href="">Novedades populares</a>
                <a href="">Mi lista</a>
                <a href="">Explora por idiomas</a>
              </ul>
            </div>
          </li>
        </ul>
        <!-- FIN RESPONSIVE MENU -->
        <a href="#">
          <li>Inicio</li>
        </a>
        <a href="#">
          <li class="list-item active">Series</li>
        </a>
        <a href="#">
          <li>Películas</li>
        </a>
        <a href="#">
          <li>Novedades populares</li>
        </a>
        <a href="#">
          <li>Mi lista</li>
        </a>
        <a href="#">
          <li>Explora por idiomas</li>
        </a>
      </div>
      <!-- FIN MENU IZQUIERDO -->
      <!-- INICIO MENU DERECHO -->
      <div class="second_option_menu">
        <div class="input-cont">
          <font-awesome-icon
            class="icon_search"
            icon="fa-solid fa-magnifying-glass"
          />
          <input
            class="input_search"
            type="search"
            placeholder="Títulos, personas, géneros"
          />
        </div>
        <a class="link-second-menu" href="">Niños</a>
        <font-awesome-icon class="icon" icon="fa-solid fa-bell" />
        <!-- INICIO PERFIL MENU -->
        <ul class="right_menu">
          <li>
            <div class="cont-menu">
              <div class="cont-img-icon">
                <img
                  class="img-icon"
                  src="../assets/image-icon-netflix.png"
                  alt=""
                />
                <div class="figure"></div>
              </div>
              <ul class="submenu">
                <div class="figure_right_menu"></div>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/image-icon-netflix-2.png"
                      alt=""
                    />
                    <p>Juan</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/image-icon-netflix-3.png"
                      alt=""
                    />
                    <p>Tito</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/image-icon-netflix-4.png"
                      alt=""
                    />
                    <p>Barbara</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/image-icon-netflix-5.png"
                      alt=""
                    />
                    <p>Niños</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/pencil-icon.jpg"
                      alt=""
                    />
                    <p>Administrar perfiles</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/transfer-perfil-icon.jpg"
                      alt=""
                    />
                    <p>Transferir perfil</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/perfil-icon.png"
                      alt=""
                    />
                    <p>Cuenta</p>
                  </div>
                </a>
                <a href="">
                  <div>
                    <img
                      class="img-icon"
                      src="../assets/interrogation-icon.png"
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
  </nav>
</template>

<script>
export default {
  data() {},
  methods: {},
};
</script>

<style scoped>
.principal_menu {
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.2rem;
}

.first_option_menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: slateblue;
}

.second_option_menu {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background-color: violet;
  /* margin-right: 5rem; */
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

a li.active,
.second_option_menu a,
.second_option_menu .icon_search,
.icon,
.input_search:focus::placeholder,
.input_search,
.submenu {
  color: #fff;
}

.submenu a {
  background-color: skyblue;
}

.first_option_menu img {
  width: 5.8rem;
}

.second_option_menu .icon_search,
.icon {
  font-size: 20px;
  cursor: pointer;
}

.second_option_menu a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}

.input_search::placeholder {
  color: #000;
}

.icon_search {
  position: absolute;
  margin-left: 0.4rem;
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
  background-color: seagreen;
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

.cont-img-icon{
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* ---------------------------------------------------------------- */
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
  right: -6.5rem;
  top: 4rem;
  display: flex;
  flex-direction: column;
}

/* linea blanca del menu responsive de la izquierda(Explorar) */
.responsive_menu_options a:nth-child(2) {
  border-top: 3px solid #fff;
}

.responsive_menu_options li {
  list-style: none;
}

.responsive_menu_options a {
  text-decoration: none;
  padding: 1rem;
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
}

.cont-figure-left-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 19.2rem;
}

.cont_responsive_menu,
.responsive_menu_options a {
  color: #fff;
}

.cont_responsive_menu {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.cont_responsive_menu p {
  font-size: 14px;
  font-weight: 600;
}

@media screen and (max-width: 890px) {
  .principal_menu {
    background-color: skyblue;
  }

  /* .first_option_menu a{
    display: none;
  } */
}

@media (min-width: 891px) and (max-width: 1129px) {
  .principal_menu {
    background-color: springgreen;
  }
  /* INICIO MENU IZQUIERDO */
  .first_option_menu a li {
    font-size: 13px;
    font-weight: 600;
  }

  /* .first_option_menu img {
    margin: 0rem 1rem 0rem 1rem;
  } */
  /* FIN MENU IZQUIERDO */

  /* INICIO MENU DERECHO */
  .link-second-menu {
    display: none;
  }

  .input_search:focus {
    width: 14rem;
    font-size: 14px;
    transition: width 0.3s ease-in-out;
    outline: none;
    border: 1px solid #fff;
    opacity: 1;
    cursor: auto;
  }
  /* FIN MENU DERECHO */

}

@media (min-width: 1130px) and (max-width: 1330px) {
  .principal_menu {
    background-color: tomato;
  }
  /* INICIO MENU IZQUIERDO */
  /* .first_option_menu img {
    margin: 0rem 1rem 0rem 1.5rem;
  } */
  /* FIN MENU IZQUIERDO */

  /* INICIO MENU DERECHO */
  .link-second-menu {
    display: none;
  }



  .input_search:focus {
    width: 16rem;
    font-size: 14px;
    transition: width 0.3s ease-in-out;
    outline: none;
    border: 1px solid #fff;
    opacity: 1;
    cursor: auto;
  }
  /* FIN MENU DERECHO */
  
}
</style>