<template>
  <div id="body">
    <b-navbar id="navbar" style="transition: ease 400ms;">
      <b-navbar-brand id="logo">
        <img src="../assets/childCare.png" />
        <p id="textLogo">
          <span id="childLogo">Super</span>
          <span id="careLogo">Nanny</span>
        </p>
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <div class="Button">Join As Agency</div>
        <div class="Button">Join As Parent</div>
      </b-navbar-nav>
    </b-navbar>
    <div class="body-container">
      <div>
        <div class="someText">
          <div class="main-text">Our Service</div>
          <div class="subtext">For Your Kids Happy Life</div>
        </div>
      </div>
      <div class="login">
        <form class="form-signin" @submit.prevent="loginUser">
          <div class="header">
            <h3 class="form-signin-heading">Login As</h3>
            <div class="button" :style="parentActive" @click.prevent="changeUser('parent')">Parent</div>
            <div class="button" :style="agencyActive" @click.prevent="changeUser('agency')">Agency</div>
          </div>
          <input type="text" class="form-control" placeholder="Email Address" v-model="email" />
          <br />
          <input type="password" class="form-control" placeholder="Password" v-model="password" />
          <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginHome",
  data() {
    return {
      user: "parent"
    };
  },
  computed: {
    parentActive() {
      if (this.user == "parent") {
        return {
          "background-color": "white"
        };
      }
      return null;
    },
    agencyActive() {
      if (this.user == "agency") {
        return {
          "background-color": "white"
        };
      }
      return null;
    }
  },
  methods: {
    changeUser(user) {
      this.user = user;
    }
  }
};
</script>

<style scoped>
#body {
  z-index: 1000;
  background: url("https://image.freepik.com/free-photo/woman-children-sitting-floor_23-2147663975.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #dfdddd;
  height: 100vh;
}
#navbar {
  height: 20vh;
}
#logo {
  display: flex;
  align-items: center;
}
img {
  width: 5rem;
}
#textLogo {
  font-size: 3rem;
  font-weight: 600;
  margin: 2px;
}
#childLogo {
  color: darkslategray;
}
#careLogo {
  color: maroon;
}
.ml-auto {
  margin-right: 2rem;
}
.Button {
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  transition: ease 400ms;
  margin: 0px 1rem;
  color: rgb(42, 77, 77);
}
.Button:hover {
  transform: translateY(-6px);
  color: rgb(19, 128, 128);
}
.body-container {
  display: grid;
  grid-template-columns: 3fr 2fr;
}
.someText {
  position: relative;
  top: 20vh;
  left: 10vw;
  display: inline-block;
  padding: 2rem;
}
.main-text {
  font-size: 3rem;
}
.subtext {
  font-size: 2rem;
}
.login {
  position: relative;
  margin: 0px auto;
  top: 10vh;
}
form {
  width: 28rem;
}
.header {
  display: flex;
  align-items: baseline;
}
h3 {
  font-size: 2rem;
  margin-right: 1.2rem;
}
.button {
  margin: 0.4rem;
  font-size: 1.6rem;
  padding: 1px 12px;
  border-radius: 3px;
  cursor: pointer;
}
</style>