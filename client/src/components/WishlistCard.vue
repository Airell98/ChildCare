<template>
  <div class="cart">
    <div
      class="image"
      :style="[{
      'background': `url(${nanny.imageUrl})`,
      'background-position': 'center center',
      'background-size': 'cover', 
    }]"
    ></div>
    <div class="cart-content">
      <div class="cart-description">
        <div class="name">{{nanny.name.toUpperCase()}}</div>
        <div class="city">{{nanny.city.toUpperCase()}}</div>
        <div class="salary">Rp. {{nanny.expectedSalary}}</div>
      </div>
      <div class="button-container">
        <b-button variant="warning">Chat</b-button>
        <b-button variant="success">Hire</b-button>
        <b-button variant="danger">Delete</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wishlist",
  props: ["nanny"]
};
</script>

<style scoped>
.cart {
  width: 30rem;
  height: 10rem;
  display: flex;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 2rem;
  border-radius: 1rem;
}
.image {
  width: 40%;
  border-radius: 1rem 0 0 1rem;
}
.cart-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  margin: 1rem 2rem;
}
.name {
  font-size: 1.4rem;
  font-weight: bold;
}
.city {
  font-size: 1.2rem;
  font-weight: bold;
}
.salary {
  font-size: 1.6rem;
  font-weight: bold;
}
.button-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>