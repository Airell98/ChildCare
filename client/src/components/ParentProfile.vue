<template>
  <div class="data-box">
    <div class="data-container">
      <div class="label">
        <p class="text">Name</p>
        <p class="text">Age</p>
        <p class="text">Gender</p>
        <p class="text">City</p>
        <p class="text">Phone</p>
      </div>
      <div class="data">
        <p class="text">{{parent.name}}</p>
        <p class="text">{{age}}</p>
        <p class="text">{{parent.gender}}</p>
        <p class="text">{{parent.city}}</p>
        <p class="text">{{parent.phoneNumber}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParentProfile",
  props: ["parent"],
  computed: {
    age() {
      return 2020 - parseInt(this.parent.birthDate.slice(0, 5));
    }
  }
};
</script>

<style scoped>
.data-box {
  width: 90%;
  height: fit-content;
  margin: 1rem auto;
  padding-top: 0.3rem;
  background-color: rgba(255, 255, 255, 0.432);
  border-radius: 1rem;
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
  font-size: 1.3rem;
}
</style>
