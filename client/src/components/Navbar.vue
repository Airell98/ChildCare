<template>
  <b-navbar fixed="top" id="navbar">
    <b-navbar-brand id="logo" @click.prevent="gotoHome">
      <img src="../assets/childCare.png" />
      <p id="textLogo">
        <span id="childLogo">Child</span>
        <span id="careLogo">Care</span>
      </p>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto" v-if="login">
      <div class="username">{{username.toUpperCase()}}</div>
      <div class="Button Edit">EDIT</div>
      <div class="Button Logout" @click.prevent="loggingOut">LOGOUT</div>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" v-else>
      <NavButton :text="(text = 'REGISTER')"></NavButton>
      <NavButton :text="(text = 'LOGIN')"></NavButton>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import NavButton from "./NavButton";
export default {
  name: "Navbar",
  components: {
    NavButton
  },
  created() {
    localStorage.loginAs ? this.$store.commit("set_login", true) : null;
  },
  computed: {
    login() {
      return this.$store.state.login;
    },
    username() {
      const user = JSON.parse(localStorage.user);
      return user.name;
    }
  },
  methods: {
    gotoHome() {
      this.$router.push({ name: "Home" });
    },
    loggingOut() {
      localStorage.clear();
      this.$store.commit("set_login", false);
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped>
#navbar {
  height: 5rem;
  background-color: white;
}
#logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}
img {
  width: 4rem;
}
#textLogo {
  font-size: 2rem;
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
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  transition: ease 400ms;
  margin: 0px 1rem;
}
.Edit {
  color: rgb(57, 145, 64);
}
.Logout {
  color: rgb(151, 44, 44);
}
.Button:hover {
  transform: translateY(-2px);
}
.Edit:hover {
  color: rgb(120, 221, 128);
}
.Logout:hover {
  color: rgb(214, 90, 90);
}
.username {
  font-size: 1.4rem;
  font-weight: 700;
  padding: 10px;
  margin: 0px 1rem;
  color: rgb(83, 132, 139);
}
</style>
