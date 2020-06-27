<template>
  <div class="data-box">
    <div class="data-container">
      <div class="data">
        <img src="../assets/childCare.png" />
      </div>
      <div class="data">
        <div class="name">Agensi Penyalur A</div>
      </div>
      <div class="data">
        <div class="city">Jakarta</div>
      </div>
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
  margin: 1rem auto;
  transform: translateY(15%);
  background-color: rgba(137, 139, 139, 0.205);
  padding: 1rem 0rem;
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
</style>
