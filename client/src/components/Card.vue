<template>
  <div class="card">
    <div class="card-img">
      <img :src="nanny.imageUrl" />
    </div>
    <div class="card-body">
      <div class="name">{{ nanny.name }}</div>
      <div class="birth">{{ age }}</div>
      <div class="salary">Rp. {{ nanny.expectedSalary }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["nanny"],
  computed: {
    age() {
      return 2020 - parseInt(this.nanny.birthDate.slice(0, 5));
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  width: 15rem;
  height: 18rem;
  border-radius: 1rem;
  margin: 3rem auto;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.card-img {
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 60%;
}
img {
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 100%;
}
.card-body {
  color: darkslategray;
  padding: 15px;
  border-radius: 0 0 1rem 1rem;
}
.name {
  font-size: 12px;
}
.birth {
  margin-top: 2px;
  font-size: 18px;
}
.salary {
  margin-top: 2px;
  font-size: 20px;
  font-weight: 550;
}
</style>
