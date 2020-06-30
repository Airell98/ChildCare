<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <div class="title">Your Wishlist</div>
      <div class="card-container">
        <WishlistCard v-for="nanny in nannies" :key="nanny.id" :nanny="nanny"></WishlistCard>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import WishlistCard from "../components/WishlistCard";
export default {
  name: "Wishlist",
  components: {
    Navbar,
    WishlistCard
  },
  created() {
    this.$store.dispatch("get_allWishlist");
  },
  computed: {
    nannies() {
      return this.$store.state.wishlistOfNanny;
    }
  }
};
</script>

<style scoped>
.title {
  display: inline-block;
  color: darkslategray;
  border-radius: 10px;
  font-size: 2.5rem;
  font-weight: 600;
  padding: 0px 1rem;
  margin: 3rem 0px;
  transform: translateX(40vw);
}
.card-container {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
</style>
