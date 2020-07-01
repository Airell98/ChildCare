<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <img
        class="img-asd"
        src="https://raw.githubusercontent.com/Airell98/ChildCare/newest/client/src/assets/thumb.png"
        height="30%"
        width="30%"
      />

      <div class="container-thank">
        <h1>Thank You</h1>
      </div>
      <div class="container-detail">
        <h1>For Using our services</h1>
      </div>
      <div class="container-detail">
        <h2>Our next step is payment confirmation</h2>
      </div>

      <div class="container-button">
        <div @click.prevent="onClickHome" class="button_cont" align="center">
          <a class="example_c" href target="_blank" rel="nofollow noopener">Back to Home Page</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "../components/Navbar";
export default {
  name: "ThankYou",
  components: {
    NavBar
  }
};
</script>

<style scoped>
@import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
.container {
  display: flex;
  border-radius: 20%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.377);
  margin-right: auto;
  align-items: center;
  justify-content: space-between;
  padding-top: 5vh;
  margin-top: 2vw;
}
.container-thank {
  background: rgba(223, 255, 223, 0.336);
  border-radius: 20vw;
  padding-top: 0.3vw;
  padding-left: 1vw;
  padding-right: 1vw;
  width: 14vw;
}
h1 {
  color: #333;
  text-transform: uppercase;
  font-size: 2vw;
  font-weight: 900;
}
.container-detail {
  /* background: rgb(108, 131, 108); */
  min-width: 27vw;
  height: 5vh;
}
h2 {
  color: #333;
  font-size: 1.5vw;
  font-weight: 900;
}
.container-button {
  display: flex;
  flex-direction: row;
}
.example_c {
  color: #494949 !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ffffff00;
  padding: 20px;
  border: 4px solid #494949 !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
  margin-bottom: 2vw;
}
.example_c:hover {
  color: #ffffff !important;
  background: #f6573b;
  border-color: #f6573b !important;
  transition: all 0.4s ease 0s;
}
</style>