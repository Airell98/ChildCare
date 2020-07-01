<template>
  <div
    class="container"
    @click.prevent="gotoDetail"
    :style="[{
      'background': `url(${data.imageUrl || defaultProfile})`,
      'background-position': 'center center',
      'background-size': 'cover', 
  }]"
  >
    <div class="overlay">
      <div class="items"></div>
      <div class="items head">
        <p>{{ `${data.name} (${age})` }}</p>
        <p v-if="entityName == 'nanny'">{{ data.city }}</p>
        <p v-if="entityName == 'nanny'">Expected Salary</p>
        <p v-if="entityName == 'nanny'">Rp. {{ data.expectedSalary }}</p>
        <p v-if="entityName == 'child'">Gender</p>
        <p v-if="entityName == 'child'">{{ data.gender }}</p>
        <p v-if="entityName == 'child'">Condition</p>
        <p v-if="entityName == 'child'">{{ data.condition }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["data", "entityName"],
  computed: {
    age() {
      return 2020 - parseInt(this.data.birthDate.slice(0, 5));
    },
    defaultProfile() {
      if (this.data.gender === "male") {
        return "https://image.flaticon.com/icons/svg/2922/2922510.svg";
      } else {
        return "https://image.flaticon.com/icons/svg/2922/2922561.svg";
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
.container {
  width: 15rem;
  height: 18rem;
  margin: auto;
  cursor: pointer;
  -webkit-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;

  background-repeat: no-repeat;
  background-size: 75% 50%;
}

.overlay {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;

  background: rgba(158, 157, 157, 0.9);
  color: #eeeeee;
  opacity: 0;
  transition: all 0.5s;

  font-family: "Playfair Display", serif;
}

.items {
  padding-left: 20px;
  letter-spacing: 3px;
}

.head {
  font-size: 1rem;

  transform: translateY(40px);
  transition: all 0.7s;
}

span {
  margin-left: 10px;
}

i {
  font-size: 16px;
}

.container:hover .overlay {
  opacity: 1;
}
</style>
