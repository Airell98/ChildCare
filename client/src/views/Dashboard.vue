<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <div class="left">
        <div v-if="user === 'parent'">
          <div class="Button" v-if="id == userLocal.id">Add Child</div>
          <ParentProfile :parent="userData"></ParentProfile>
        </div>
        <div v-if="user === 'agency'">
          <div class="Button" @click.prevent='addNanny'>Add Nanny
            <AddNannyModal></AddNannyModal>
          </div>
          <AgencyProfile :agency="userData"></AgencyProfile>
        </div>
        <ChatList></ChatList>
      </div>
      <div class="right">
        <div class="title" v-if="user === 'parent'">Children List</div>
        <div class="title" v-if="user === 'agency'">Nanny List</div>
        <div class="card-container">
          <Card v-for="nanny in cardDatas" :key="nanny.id" :nanny="nanny"></Card>
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
import AddNannyModal from "../components/AddNannyModal";

export default {
  name: "Home",
  components: {
    Navbar,
    Card,
    ParentProfile,
    AgencyProfile,
    ChatList,
    AddNannyModal
  },
  props: ["user"],
  methods:{
    addNanny(){
      this.$bvModal.show('modalAddNanny')
    }
  },
  created() {
    if (localStorage.loginAs == "agency") {
      if (this.user === "agency") {
        this.$store.dispatch("get_agencyById", this.id);
        this.$store.dispatch("get_nannyByAgency");
        this.id == this.userLocal.id
          ? this.$store.commit("set_agency", this.userLocal)
          : null;
      } else {
        this.$store.dispatch("get_parentById", this.id);
      }
    }
    if (localStorage.loginAs == "parent") {
      if (this.user === "agency") {
        this.$store.dispatch("get_agencyById", this.id);
      } else {
        this.$store.dispatch("get_parentById", this.id);
        this.id == this.userLocal.id
          ? this.$store.commit("set_parent", this.userLocal)
          : null;
      }
    }
  },
  computed: {
    userData() {
      let user = null;
      this.user === "agency"
        ? (user = this.$store.state.agency)
        : (user = this.$store.state.parent);
      return user;
    },
    loginAs() {
      return localStorage.loginAs;
    },
    userLocal() {
      return JSON.parse(localStorage.user);
    },
    cardDatas() {
      if (this.user == "agency" && this.id == this.userLocal.id) {
        return this.$store.state.nannyByAgency;
      }
    }
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}
.body {
  /* background: url("https://image.freepik.com/free-photo/woman-children-sitting-floor_23-2147663975.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #dfdddd; */
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
  background-color: rgba(255, 255, 255, 0.849);
  padding: 0.2rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  color: rgb(60, 129, 129);
  cursor: pointer;
  transition: ease 370ms;
}
.Button:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(33, 70, 70);
}
.right {
  height: 180vh;
  overflow-y: scroll;
}
.right::-webkit-scrollbar {
  display: none;
}
</style>
