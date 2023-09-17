<template>
    <div class="container">
      <div class="item">
        <h1>¿Te perdiste?</h1>
        <p class="paragraph">
          No encontramos esa página. Encontrarás muchos títulos para explorar en
          la pagina de inicio.
        </p>
        <button>Inicio de Netflix</button>
        <div class="text">
          <h2>Código de error <strong>NSES-404</strong></h2>
        </div>
      </div>
    </div>
    <div class="cont-movie">
      <p>DE <strong>PERDIDOS EN EL ESPACIO</strong></p>
    </div>
</template>

<style scoped>
.container {
  background-image: url(../assets/Color_negro.webp);
  /* con  propiedad fixed usando un background de una imagen esta permite 
  que se ocupe todo el contenido de la pantalla sin importar su tamaño*/
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  height: auto;
  width: 55rem;
}

h1 {
  font-size: 4.5rem;
  margin-bottom: 2rem;
}

.paragraph {
  font-size: 1.9rem;
  margin-bottom: 2.5rem;
}

button {
  padding: 1rem 2.5rem 1rem 2.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  font-family: sans-serif;
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;
  border: none;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  margin-top: 2rem;
  padding: 1rem 0rem 1rem 0rem;
  font-size: 2.2rem;
  font-weight: 100;
  border-left: 3px solid rgb(213, 14, 14);
  width: 29rem;
}

h2 strong {
  font-weight: 600;
}

.cont-movie {
  position: absolute;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  cursor: default;
}

.cont-movie p {
    margin-right: 5rem;
}

h1, p, .text, .cont-movie{
    color: #fff;
}

@media (min-width: 300px) and (max-width: 889px) {
  .item {
    height: auto;
    width: 55rem;
  }

  h1 {
    font-size: 8.5vw;
    margin-bottom: 2rem;
  }

  .paragraph {
    font-size: 3.5vw;
    margin-bottom: 2.5rem;
  }

  h2 {
    margin-top: 2rem;
    padding: 1rem 0rem 1rem 0rem;
    font-size: 3.8vw;
    font-weight: 100;
    border-left: 3px solid rgb(213, 14, 14);
    width: 52vw;
  }
}
</style>