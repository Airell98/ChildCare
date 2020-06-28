<template>
  <div class="data-box">
    <div class="data-container">
      <div class="name">{{agency.name.toUpperCase()}}</div>
      <div class="image">
        <img :src="agency.logoUrl" />
      </div>
      <div class="data">
        <div class="label">
          <div class="text">Contact</div>
          <div class="text">City</div>
        </div>
        <div class="value">
          <div class="text">{{agency.phoneNumber}}</div>
          <div class="text">{{agency.city.toUpperCase()}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgencyProfile",
  props: ["agency"]
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
  width: 14rem;
}
.image {
  margin: 0.5rem auto;
}
.name {
  font-size: 2rem;
  font-weight: 600;
  color: darkslategray;
  text-align: center;
}
.data {
  display: flex;
}
.label {
  margin-right: 1.5rem;
}
.text {
  font-size: 1.6rem;
  font-weight: 550;
  color: darkslategray;
}
</style>
