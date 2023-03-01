<template>
  <nav>
    <div class="menu">
      <img src="../assets/Netflix_2015_logo.svg.png" alt="" />
      <a href="#">
        <li class="list-item active">Inicio</li>
      </a>
      <a href="#">
        <li>Series</li>
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
  </nav>
</template>

<script>
export default {
  data() {

  },
  methods: {
    selectOptionMenu() {
      // permite acceder a las opciones del menu
      const listItems = document.querySelectorAll(".list-item");
      listItems.forEach((item) => {
        item.onclick = () => {
          listItems.forEach((item) => item.classList.remove("active"));
          item.classList.add("active");
        };
      });
    },
  },
};
</script>

<style scoped>
.menu {
  background-color: #000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4.2rem;
}

a {
  text-decoration: none;
  margin-right: 1rem;
  padding-top: 0.2rem;
}

a li {
  list-style: none;
  font-size: 14px;
  font-weight: 600;
  color: #d3d3d3;
}

a li.active {
  color: #fff;
  font-weight: 400;
  translate: 0 2px;
}

img {
  width: 5.8rem;
  margin: 0rem 2.7rem 0rem 3.7rem;
}

@media screen and (max-width: 890px) {
  /* ejemplo del cambio de menu */
  /* .menu{
    display: none;
  } */
}
</style>