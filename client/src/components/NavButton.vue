<template>
  <div class="Dropdown">
    <div class="Button">{{ text }}</div>
    <div class="Dropdown-content">
      <div class="dropdown-item" v-if="text === 'REGISTER'" @click="gotoNanny">Nanny</div>
      <div class="dropdown-item" @click="gotoAgency">Agency</div>
      <div class="dropdown-item" @click="gotoParent">Parent</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavButton",
  props: ["text"],
  methods: {
    gotoNanny() {
      this.$router.push({ name: "Register", params: { user: "nanny" } });
    },
    gotoAgency() {
      if (this.text === "REGISTER")
        this.$router.push({ name: "Register", params: { user: "agency" } });
      if (this.text === "LOGIN")
        this.$router.push({ name: "Login", params: { user: "agency" } });
    },
    gotoParent() {
      if (this.text === "REGISTER")
        this.$router.push({ name: "Register", params: { user: "parent" } });
      if (this.text === "LOGIN")
        this.$router.push({ name: "Login", params: { user: "parent" } });
    }
  }
};
</script>

<style scoped>
.Dropdown {
  position: relative;
  display: inline-block;
}
.Button {
  font-size: 1.4rem;
  font-weight: 600;
  color: #709fb0;
  cursor: pointer;
  padding: 10px;
  transition: ease 400ms;
  margin: 0px 1rem;
}
.Dropdown:hover .Button {
  transform: translateY(-2px);
  color: #a0c1b8;
}
.Dropdown-content {
  display: none;
  position: absolute;
  background-color: #a0c1b877;
  min-width: 140px;
  z-index: 1;
}
.Dropdown:hover .Dropdown-content {
  display: block;
}
.dropdown-item {
  cursor: pointer;
  font-size: 1.2rem;
  color: white;
  text-align: center;
}
</style>
