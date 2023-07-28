<template>
  <ul class="responsive_menu">
    <li>
      <div class="cont_responsive_menu">
        <div class="container_text">
          <p>Explorar</p>
          <div class="figure"></div>
        </div>
        <ul class="responsive_menu_options">
          <div class="figure_left_menu"></div>
          <router-link :to="{ name: '/' }"><li>Inicio</li></router-link>
          <router-link :to="{ name: 'series' }"><li>Series</li></router-link>
          <router-link :to="{ name: 'peliculas' }"><li>Películas</li></router-link>
          <router-link :to="{ name: 'novedades' }"><li>Novedades populares</li></router-link>
          <router-link :to="{ name: 'mi_lista' }"><li>Mi lista</li></router-link>
          <router-link :to="{ name: 'explora_por_idiomas' }"><li>Explora por idiomas</li></router-link>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.responsive_menu > li {
  position: relative;
  display: inline-block;
}

.responsive_menu > li > a {
  display: block;
  font-family: "Open sans";
  text-decoration: none;
}

.responsive_menu li:hover .responsive_menu_options {
  visibility: visible;
  opacity: 1;
}

.cont_responsive_menu,
.responsive_menu_options a {
  color: #fff;
}

.cont_responsive_menu p {
  font-size: 14px;
  font-weight: 600;
}

.container_text {
  display: flex;
  align-items: center;
  cursor: pointer;
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
  top: 2rem;
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

.cont_responsive_menu,
.responsive_menu_options a {
  color: #fff;
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
</style>