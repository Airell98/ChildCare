<template>
  <div class="home">
    <LoginHome v-if="!login"></LoginHome>
    <Navbar></Navbar>
    <div class="body">
      <FilterBox @passFilteredNannies="fillNanniesValue"></FilterBox>
      <div class="right">
        <div class="title">Nanny List</div>
        <div class="card-container">
          <Card
            v-for="nanny in nannies || allNannies"
            :key="nanny.id"
            :data="nanny"
            :entityName="'nanny'"
          ></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import FilterBox from "../components/Filter";
import Card from "../components/Card";
import LoginHome from "../components/loginHome";
export default {
  name: "Home",
  data() {
    return {
      nannies: null
    };
  },
  components: {
    Navbar,
    FilterBox,
    Card,
    LoginHome
  },
  created() {
    this.$store.dispatch("get_nannies");
    this.$store.dispatch("get_agencies");
  },
  computed: {
    allNannies() {
      return this.$store.state.nannies;
    },
    login() {
      return this.$store.state.login;
    }
  },
  methods: {
    fillNanniesValue(filteredNannies) {
      this.nannies = filteredNannies;
    }
  }
};
</script>

<style scoped>
.body {
  display: grid;
  grid-template-columns: 1fr 3fr;
  transform: translateY(1rem);
}
h2 {
  text-align: center;
  margin: 1rem;
  color: darkslategray;
  padding-top: 1rem;
}
.card-container {
  margin-top: 35px;
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
  color: #9a1750;
  background-color: #ffd5b25b;
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 600;
  padding: 0px 1rem;
  margin: 3rem;
  margin-bottom: 5rem;
  text-align: center;
}
</style>
