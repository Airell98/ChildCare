<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <div class="left">
        <div v-if="user === 'parent'">
          <div class="Button">Add Child</div>
          <ParentProfile></ParentProfile>
        </div>
        <div v-if="user === 'agency'">
          <div class="Button">Add Nanny</div>
          <AgencyProfile></AgencyProfile>
        </div>
        <ChatList></ChatList>
      </div>
      <div class="right">
        <div class="title" v-if="user === 'parent'">Children List</div>
        <div class="title" v-if="user === 'agency'">Nanny List</div>
        <div class="card-container">
          <Card></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ParentProfile from "../components/ParentProfile";
import AgencyProfile from "../components/AgencyProfile";
import ChatList from "../components/ChatList";
export default {
  name: "Home",
  components: {
    Navbar,
    Card,
    ParentProfile,
    AgencyProfile,
    ChatList
  },
  props: ["user"]
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
  grid-template-columns: 2fr 5fr;
  transform: translateY(5rem);
}
.title {
  color: darkslategray;
  background-color: rgba(255, 255, 255, 0.719);
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 500;
  padding: 0px 1rem;
  margin: 3rem;
  margin-bottom: 0px;
  text-align: center;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.left {
  display: flex;
  flex-direction: column;
}
.Button {
  width: 60%;
  font-size: 2rem;
  font-weight: 600;
  padding: 0px 1rem;
  margin: 3rem auto;
  background-color: rgb(99, 184, 187);
  padding: 0.2rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  color: rgb(224, 247, 247);
  cursor: pointer;
  transition: ease 370ms;
}
.Button:hover {
  background-color: rgb(97, 158, 160);
  color: rgb(255, 255, 255);
}
.right {
  height: 180vh;
  overflow-y: scroll;
}
.right::-webkit-scrollbar {
  display: none;
}
</style>
