<template>
  <div class="card"></div>
</template>

<script>
export default {
  name: "Card"
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
</style>