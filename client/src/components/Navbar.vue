<template>
  <b-navbar fixed="top" id="navbar">
    <b-navbar-brand id="logo" @click.prevent="gotoHome">
      <img src="../assets/childCare.png" />
      <p id="textLogo">
        <span id="childLogo">Super</span>
        <span id="careLogo">Nanny</span>
      </p>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto" v-if="login">
      <div class="username" @click.prevent="gotoDashboard">{{ username.toUpperCase() }}</div>
      <div class="Button Edit" @click.prevent="gotoEdit">EDIT</div>
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
  data() {
    return {
      id: 0
    };
  },
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
      this.id = user.id;
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
    },
    gotoDashboard() {
      this.$router.push({
        name: "Dashboard",
        params: { user: localStorage.loginAs, id: this.id }
      });
    },
    gotoEdit() {
      this.$router.push({
        name: "Edit User",
        params: { user: localStorage.loginAs, id: this.id }
      });
    }
  }
};
</script>

<style scoped>
#navbar {
  height: 4rem;
  background-color: white;
}
#logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}
img {
  width: 3rem;
}
#textLogo {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 2px;
}
#childLogo {
  color: darkslategray;
  font-family: "Playfair Display", serif;
}
#careLogo {
  color: maroon;
  font-family: "Courier New", Courier, monospace;
}
.ml-auto {
  margin-right: 2rem;
}
.Button {
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  transition: ease 400ms;
  margin: 0px 1rem;
}
.Edit {
  color: rgb(57, 145, 64);
  font-family: "Courier New", Courier, monospace;
}
.Logout {
  color: rgb(151, 44, 44);
  font-family: "Courier New", Courier, monospace;
}
.Button:hover {
  transform: translateY(4px);
}
.Edit:hover {
  color: rgb(120, 221, 128);
}
.Logout:hover {
  color: rgb(214, 90, 90);
}
.username {
  font-family: "Playfair Display", serif;
  font-size: 1.6rem;
  /* font-weight: 700; */
  padding: 10px;
  margin: 0px 1rem;
  color: rgb(83, 132, 139);
  cursor: pointer;
  transition: ease 400ms;
}
.username:hover {
  color: rgb(74, 157, 168);
  transform: scale(1.07);
}
</style>
