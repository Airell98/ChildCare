<template>
  <div class="data-box">
    <div class="data-container">
      <div class="data">
        <img src="../assets/childCare.png" />
      </div>
      <div class="name">Agensi Penyalur A</div>
      <div class="city">Jakarta</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgencyProfile"
};
</script>

<style scoped>
.data-box {
  width: 90%;
  height: fit-content;
  margin: 2rem auto;
  padding-top: 0.3rem;
  background-color: rgba(255, 255, 255, 0.432);
  border-radius: 1rem;
}
.data-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
img {
  width: 10rem;
}
.data {
  margin: 0.5rem auto;
}
.name {
  font-size: 2rem;
  font-weight: 600;
  color: darkslategray;
  text-align: center;
}
.city {
  font-size: 1.6rem;
  font-weight: 550;
  color: darkslategray;
  text-align: center;
}
</style>
