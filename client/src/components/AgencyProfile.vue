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
  border:1px rgb(114, 114, 114) solid;
  background: linear-gradient(#ffd5b2, #ffd5df);
  width: 90%;
  height: fit-content;
  margin: 2rem auto;
  padding-top: 0.3rem;
  background-color: rgba(255, 255, 255, 0.432);
  border-radius: 1rem;
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.4);
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
  font-size: 2.5rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #9a1750;
  font-weight: 600;
  text-align: center;
}
.data {
  display: flex;
  /* border:1px black solid; */
  margin:7px;
  padding-top:2.2%;
  padding-left:4.2%;
  padding-bottom:2.2%;
  border-radius: 25px;
  background-color:#cadef1
}


.label {
  margin-right: 1.5rem;
}

.text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.6rem;
  font-weight: 550;
  color: #9a1750;
}
</style>
