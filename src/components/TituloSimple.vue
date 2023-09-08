<template>
  <div class="wrapper">
    <div class="container">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "No hay titulo",
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  z-index: 1;
}

.container {
  margin-top: 5rem;
  color: #fff;
}

h1 {
  font-size: 2.3rem;
  font-weight: 500;
  margin-left: 4rem;
  text-align: left;
}

span {
  font-size: 1.2rem;
  color: #7b7b7b;
}

@media (min-width: 300px) and (max-width: 466px) {
  .container h1 {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
}

@media (min-width: 467px) and (max-width: 889px) {
  .container h1 {
    font-size: 1.8rem;
    margin-left: 1rem;
  }
}

@media (min-width: 890px) and (max-width: 1129px) {
  .container h1 {
    font-size: 2rem;
    margin-left: 2rem;
  }
}

@media (min-width: 1130px) and (max-width: 1330px) {
  .container h1 {
    font-size: 2rem;
    margin-left: 2rem;
  }
}
</style>