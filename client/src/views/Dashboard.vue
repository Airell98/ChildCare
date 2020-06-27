<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <ParentProfile v-if="user === 'parent'"></ParentProfile>
      <AgencyProfile v-if="user === 'agency'"></AgencyProfile>
      <div class="right">
        <h2 v-if="user === 'parent'">Children List</h2>
        <h2 v-if="user === 'agency'">Nanny List</h2>
        <div class="card-container">
          <Card></Card>
          <Card></Card>
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
import Card from "../components/CardDummy";
import ParentProfile from "../components/ParentProfile";
import AgencyProfile from "../components/AgencyProfile";
export default {
  name: "Home",
  components: {
    Navbar,
    Card,
    ParentProfile,
    AgencyProfile
  },
  props: ["user"]
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}
.body {
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
  height: 100vh;
  overflow-y: scroll;
}
.right::-webkit-scrollbar {
  display: none;
}
</style>
