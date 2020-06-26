<template>
  <b-navbar fixed="top" id="navbar">
    <b-navbar-brand id="logo">
      <img src="../assets/childCare.png" />
      <p id="textLogo">
        <span id="childLogo">Child</span><span id="careLogo">Care</span>
      </p>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
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
</style>
