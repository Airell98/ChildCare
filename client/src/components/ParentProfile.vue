<template>
  <div class="data-box">
    <div class="name">{{parent.name.toUpperCase()}}</div>
    <div class="image">
      <img :src="parent.imageUrl || defaultProfile" />
    </div>
    <div class="data-container">
      <div class="label">
        <p class="text">Age</p>
        <p class="text">Gender</p>
        <p class="text">City</p>
        <p class="text">Phone</p>
      </div>
      <div class="data">
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
    },
    defaultProfile() {
      if (this.parent.gender === "male") {
        return "https://image.flaticon.com/icons/svg/2922/2922510.svg";
      } else {
        return "https://image.flaticon.com/icons/svg/2922/2922561.svg";
      }
    }
  }
};
</script>

<style scoped>
.data-box {
  width: 90%;
  height: fit-content;
  margin: 0rem auto;
  transform: translateY(5%);
  background-color: rgba(137, 139, 139, 0.205);
  border-radius: 1rem;
  padding: 1rem 0rem;
  padding-bottom: 0;
}
.image {
  margin: auto;
  width: 70%;
}
img {
  width: 100%;
  border-radius: 1rem;
}
.name {
  font-size: 2rem;
  margin: 1rem;
  color: #9a1750;
  font-weight: 600;
  text-align: center;
  font-family: "Courier New", Courier, monospace;
}
.data-container {
  display: flex;
  /* border:1px black solid; */
  margin: 1rem;
  padding-top: 2.2%;
  padding-left: 4.2%;
  padding-bottom: 2.2%;
  border-radius: 25px;
  /* background-color: #cadef1; */
}
.label {
  font-family: "Playfair Display", serif;
  margin-right: 1.4rem;
  letter-spacing: 2px;
  color: #9a1750;
}
.text {
  font-family: "Playfair Display", serif;
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: #9a1750;
}
</style>
