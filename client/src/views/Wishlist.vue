<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <div class="title">Your Wishlist</div>
      <div class="card-container">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Card from "../components/Card";
export default {
  name: "Wishlist",
  components: {
    Navbar,
    Card
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}
.body {
  background: url("https://image.freepik.com/free-photo/woman-children-sitting-floor_23-2147663975.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #dfdddd;
  transform: translateY(5rem);
}
.title {
  display: inline-block;
  color: darkslategray;
  background-color: rgba(255, 255, 255, 0.719);
  border-radius: 10px;
  font-size: 2.5rem;
  font-weight: 600;
  padding: 0px 1rem;
  margin: 3rem 0px;
  transform: translateX(40vw);
}
.card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>
