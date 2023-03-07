<template>
  <nav>
    <div class="principal_menu">
      <!-- INICIO MENU IZQUIERDO -->
      <div class="first_option_menu">
        <img src="../assets/Netflix_2015_logo.svg.png" alt="" />
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
        <a href="">Niños</a>
        <font-awesome-icon class="icon" icon="fa-solid fa-bell" />
        <!-- INICIO PERFIL MENU -->
        <ul class="right_menu">
          <li>
            <div class="cont-img-icon">
              <img
                class="img-icon"
                src="../assets/image-icon-netflix.png"
                alt=""
              />
              <div class="figure"></div>
              <ul class="submenu">
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
  methods: {

  },
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
}

.second_option_menu {
  display: flex;
  align-items: center;
  gap: 1.2rem;
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

.first_option_menu img {
  width: 5.8rem;
  margin: 0rem 2.7rem 0rem 3.7rem;
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
  margin-left: .4rem;
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
  transition: width 0.3s ease-in-out;
  outline: none;
  border: 1px solid #fff;
  opacity: 1;
  cursor: auto;
}

.right_menu{
  margin-right: 5rem;
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
  transition: opacity 0.5s;
  border-radius: 1px solid #000;
  right: 0rem;
  top: 2rem;
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
  border-top: 1px solid #fff;
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

/* al hacer hover en el cont se mueve la figura creada */
/* ej de como mover otro elemento cuando se hace hover en otro elemento 
 pero el requisito es que el elemento a mover este contenido dentro de otro, 
 en este caso es el div cont*/
.cont-img-icon:hover .figure {
  /* rotate(XXXrad) para que la figura gire hacia la derecha y no hacia la izquierda 
    como lo hace de manera normal */
  transform: rotate(6.285rad);
  transition: 0.4s;
}

.cont-img-icon {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 890px) {
  /* ejemplo del cambio de menu */
  /* .principal_menu{
    display: none;
  } */
}
</style>