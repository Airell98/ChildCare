<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <div class="left">
        <FilterBox></FilterBox>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import FilterBox from "../components/Filter";
export default {
  name: "Home",
  components: {
    Navbar,
    FilterBox
  }
};
</script>

<style scoped>
.home {
  background-color: #e0dede;
  min-height: 100vh;
}
.body {
  display: grid;
  grid-template-columns: 1fr 3fr;
  transform: translateY(5rem);
}
.left {
  position: fixed;
}
</style>
