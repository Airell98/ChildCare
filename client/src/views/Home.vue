<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <FilterBox></FilterBox>
      <div class="right">
        <div class="title">Nanny List</div>
        <div class="card-container">
          <Card></Card>
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
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import FilterBox from "../components/Filter";
import Card from "../components/Card";
export default {
  name: "Home",
  components: {
    Navbar,
    FilterBox,
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
  display: grid;
  grid-template-columns: 1fr 3fr;
  transform: translateY(5rem);
}
h2 {
  text-align: center;
  margin: 1rem;
  color: darkslategray;
  padding-top: 1rem;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.right {
  height: 90vh;
  overflow-y: scroll;
}
.right::-webkit-scrollbar {
  display: none;
}
.title {
  color: darkslategray;
  background-color: rgba(255, 255, 255, 0.719);
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 600;
  padding: 0px 1rem;
  margin: 3rem;
  margin-bottom: 0px;
  text-align: center;
}
</style>
