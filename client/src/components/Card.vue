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
        <p v-if="entityName == 'nanny'">
          <br />Expected Salary
        </p>
        <p v-if="entityName == 'nanny'">Rp. {{ data.expectedSalary }}</p>
        <p v-if="entityName == 'child'">
          <br />Gender
        </p>
        <p v-if="entityName == 'child'">{{ data.gender }}</p>
        <hr />
      </div>
    </div>
  </div>

  <!-- <div class="card" @click.prevent="gotoDetail">
    <div class="card-img">
      <img :src="data.imageUrl || defaultProfile" />
    </div>
    <div class="card-body">
      <div class="name">{{ `${data.name} (${age})` }}</div>
      <div v-if="entityName === 'child'" class="gender">{{ data.gender }}</div>
      <div v-if="entityName === 'nanny'" class="city">{{ data.city }}</div>
      <div v-if="entityName === 'nanny'" class="salary">Rp. {{ data.expectedSalary }}</div>
    </div>
  </div>-->
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
.container {
  margin: 15px;
  width: 15rem;
  height: 16rem;

  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;

  cursor: pointer;

  -webkit-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;

  background-repeat: no-repeat;
  background-size: 75% 50%;

  margin-bottom: 4rem;
}

.overlay {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 2fr 1fr;

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

.hr {
  display: block;
  width: 0;

  border: none;
  border-bottom: solid 2px;

  position: absolute;
  bottom: 0;
  left: 20px;

  transition: all 0.5s;
}

.price {
  font-size: 22px;
  line-height: 10px;
  font-weight: bold;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s;
}

.old {
  text-decoration: line-through;
  color: lighten(rgb(77, 77, 77), 40%);
}

.cart {
  font-size: 12px;
  opacity: 0;
  letter-spacing: 1px;
  font-family: "Lato", sans-serif;
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
  /* & .head {
    transform: translateY(0px);
  }
  
  & hr {
    width: 75px;
    transition-delay: 0.4s;
  }
  
  & .price {
    transform: translateY(0px);
    transition-delay: 0.3s;
    opacity: 1;
  }
  
  & .cart {
    transform: translateY(0px);
    transition-delay: 0.6s;
    opacity: 1;
  } */
}

/* .card {
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
} */
</style>
