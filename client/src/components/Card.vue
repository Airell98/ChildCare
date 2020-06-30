<template>
  <div class="card" @click.prevent="gotoDetail">
    <div class="card-img">
      <img :src="data.imageUrl || defaultProfile" />
    </div>
    <div class="card-body">
      <div class="name">{{ `${data.name} (${age})` }}</div>
      <div v-if="entityName === 'child'" class="gender">{{ data.gender }}</div>
      <div v-if="entityName === 'nanny'" class="city">{{ data.city }}</div>
      <div v-if="entityName === 'nanny'" class="salary">Rp. {{ data.expectedSalary }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["data", "entityName"],
  computed: {
    age() {
      console.log(this.entityName);
      return 2020 - parseInt(this.data.birthDate.slice(0, 5));
    },
    defaultProfile() {
      if (this.data.gender === "male") {
        return "https://logicplus.com.au/wp-content/uploads/2017/07/default-profile-img-male.jpg";
      } else {
        return "https://images.assetsdelivery.com/compings_v2/photoplotnikov/photoplotnikov1703/photoplotnikov170300047.jpg";
      }
    }
  },
  methods: {
    gotoDetail() {
      let routerName = "";
      this.entityName === "nanny"
        ? (routerName = "NannyDetail")
        : (routerName = "ChildDetail");
      this.$router.push({
        name: routerName,
        params: { id: this.data.id }
      });
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  width: 15rem;
  height: 20rem;
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
  font-size: 1.4rem;
}
.gender,
.city {
  margin-top: 2px;
  font-size: 18px;
}
.salary {
  margin-top: 2px;
  font-size: 20px;
  font-weight: 550;
}
</style>
