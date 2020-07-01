<template>
  <div>
    <AddNannyModal :title="'registerNanny'"></AddNannyModal>
    <div class="Dropdown">
      <div class="Button">{{ text }}</div>
      <div class="Dropdown-content">
        <div class="dropdown-item" v-if="text === 'REGISTER'" @click.prevent="showNannyModal">Nanny</div>
        <div class="dropdown-item" @click.prevent="gotoAgency">Agency</div>
        <div class="dropdown-item" @click.prevent="gotoParent">Parent</div>
      </div>
    </div>
  </div>
</template>

<script>
import AddNannyModal from "../components/AddNannyModal";
export default {
  name: "NavButton",
  props: ["text"],
  components: {
    AddNannyModal
  },
  methods: {
    showNannyModal() {
      this.$bvModal.show("modalAddNanny");
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
  font-family: "Courier New", Courier, monospace;
  /* font-family: "Playfair Display", serif; */
  font-size: 1.4rem;
  font-weight: 600;
  color: #709fb0;
  cursor: pointer;
  padding: 10px;
  transition: ease 400ms;
  margin: 0px 1rem;
}
.Dropdown:hover .Button {
  transform: translateY(4px);
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
  /* font-family: "Courier New", Courier, monospace; */
  font-family: "Playfair Display", serif;
  cursor: pointer;
  font-size: 1.2rem;
  color: white;
  text-align: center;
}
</style>
