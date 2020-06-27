<template>
  <div class="data-box">
    <h3>DATA PROFILE</h3>
    <div class="image">
      <img src="../assets/logo.png" />
    </div>
    <div class="data-container">
      <div class="label">
        <p class="text">Name</p>
        <p class="text">Age</p>
        <p class="text">Gender</p>
        <p class="text">City</p>
        <p class="text">Phone</p>
      </div>
      <div class="data">
        <p class="text">Karen</p>
        <p class="text">34</p>
        <p class="text">Female</p>
        <p class="text">Jakarta</p>
        <p class="text">081234567890</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParentProfile"
};
</script>

<style scoped>
.data-box {
  width: 90%;
  height: fit-content;
  margin: 1rem auto;
  transform: translateY(15%);
  background-color: rgba(137, 139, 139, 0.205);
}
h3 {
  text-align: center;
  color: darkslategray;
  margin: 1rem;
}
.image {
  margin: 0.5rem auto;
}
.data-container {
  display: flex;
  margin: 1rem;
  margin-left: 2rem;
}
.label {
  margin-right: 1rem;
}
.text {
  line-height: 90%;
}
</style>
