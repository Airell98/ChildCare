<template>
  <div class="cart">
    <div
      class="image"
      :style="[{
      'background': `url(${nanny.imageUrl})`,
      'background-position': 'center center',
      'background-size': 'cover', 
    }]">
    </div>
    <div class="right">
      <div class="cart-content">
        <div class="cart-description">
          <div class="name">{{nanny.name.toUpperCase()}}</div>
          <div class="city">{{nanny.city.toUpperCase()}}</div>
          <div class="salary">Rp. {{nanny.expectedSalary}}</div>
        </div>
        <div class="button-container">
          <div class="button chat" @click.prevent="gotoChat">
            <img src="https://image.flaticon.com/icons/svg/2462/2462719.svg" />
          </div>
          <div class="button hire" @click.prevent="hireNanny">
            <img src="https://image.flaticon.com/icons/svg/1243/1243560.svg" />
          </div>
          <div class="button delete" @click.prevent="deleteFromWishlist">
            <img src="https://image.flaticon.com/icons/svg/1214/1214428.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wishlist",
  props: ["nanny"],
  methods: {
    gotoChat() {
      const user = JSON.parse(localStorage.user);
      localStorage.setItem(
        "roomKey",
        `${user.email}${this.nanny.Agency.email}`
      );
      this.$router.push(`/chat/${this.nanny.AgencyId}`);
    },
    deleteFromWishlist() {
      this.$store.dispatch("deleteFromWishlist", this.nanny.id);
    },
    hireNanny() {
      let nannyId = null;
      for (let i = 0; i < this.originalNannies.length; i++) {
        if (this.nanny.name == this.originalNannies[i].name) {
          nannyId = this.originalNannies[i].id;
          break;
        }
      }
      this.$store.dispatch("hireNanny", nannyId);
    }
  },
  created() {
    this.$store.dispatch("get_nannies");
  },
  computed: {
    originalNannies() {
      return this.$store.state.nannies;
    }
  }
};
</script>

<style scoped>
.cart {
  width: 38rem;
  height: 17rem;
  display: flex;
  background-color: rgb(121, 255, 255);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 2rem;
  align-items: center;
  border-radius: 8px;
}
.image {
  width: 60%;
  height: 105%;
  border-radius: 8px;
}
.right {
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 90%;
}
.cart-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding-top: 20%;
  height: 100%;
}
.cart-description {
  transform: translateY(-1.3rem);
}
.name {
  font-size: 1.4rem;
  font-weight: bold;
  font-family: "Playfair Display", serif;
  letter-spacing: 2px;
  color: #9a1750;
}
.city {
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  font-weight: bold;
}
.salary {
  font-family: "Playfair Display", serif;
  letter-spacing: 2px;
  color: #9a1750;
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 1.5rem;
}
.button-container {
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.button {
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: ease 400ms;
  filter: grayscale(50%);
}
.button:hover {
  filter: grayscale(10%);
  transform: translateY(-6px);
}
.chat {
  background-color: rgb(110, 219, 0);
}
.hire {
  background-color: rgb(4, 187, 44);
}
.delete {
  background-color: rgb(255, 0, 0);
}
img {
  width: 70%;
  margin: 12% auto;
  filter: invert(100%);
}
</style>