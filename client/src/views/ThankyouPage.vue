<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <img
        class="img-asd"
        src="https://raw.githubusercontent.com/Airell98/ChildCare/newest/client/src/assets/thumb.png"
        height="20%"
        width="20%"
      />
      <div class="thank-you">Thank You</div>
      <div class="sub-thank">For Using Our Service</div>
      <div class="confirmation">Please Wait from Agency Confirmation</div>
      <div @click.prevent="onClickHome" class="button" align="center">Back To Home</div>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/Navbar";
export default {
  name: "ThankYou",
  components: {
    NavBar
  },
  methods: {
    onClickHome() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  align-items: center;
  justify-content: space-between;
  transform: translateY(20%);
  color: #9a1750;
}
.thank-you {
  margin-top: 0.6rem;
  font-size: 2.5rem;
  line-height: 2.5rem;
}
.sub-thank {
  font-size: 1.8rem;
}
.confirmation {
  font-size: 1.5rem;
  margin: 1rem auto;
}
.button {
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  color: white;
  font-size: 1.2rem;
  background-color: #9a1750;
  margin: 0.5rem auto;
  transition: ease 300ms;
}
.button:hover {
  background-color: #b42f69;
}
</style>