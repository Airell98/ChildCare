<template>
  <div class="data-box">
    <h3>JESSICA ALBA</h3>
    <div class="image">
      <img
        src="https://www.biography.com/.image/t_share/MTE4MDAzNDEwMzY0NDMzOTM0/jessica-alba-299896-1-402.jpg"
      />
    </div>
    <div class="data-container">
      <div class="label">
        <p class="text">Age</p>
        <p class="text">Gender</p>
        <p class="text">City</p>
        <p class="text">Phone</p>
      </div>
      <div class="data">
        <p class="text">39</p>
        <p class="text">Female</p>
        <p class="text">Amerika</p>
        <p class="text">000000000</p>
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
  padding-top: 0.3rem;
  background-color: rgba(137, 139, 139, 0.205);
  border-radius: 1rem;
}
h3 {
  text-align: center;
  color: darkslategray;
  margin: 1rem;
}
.image {
  margin: auto;
  width: 70%;
}
img {
  width: 100%;
  border-radius: 1rem;
}
.data-container {
  display: flex;
  margin: 1rem auto;
  width: 70%;
  padding-bottom: 1rem;
}
.label {
  margin-right: 1rem;
}
.text {
  line-height: 90%;
  font-size: 1.1rem;
}
</style>
