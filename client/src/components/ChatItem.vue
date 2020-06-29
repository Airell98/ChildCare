<template>
  <div class="name">
    <span>
      <img src="../assets/childCare.png" />
    </span>
    {{name}}
  </div>
</template>

<script>
export default {
  name: "ChatItem",
  data() {
    return {
      name: "Nama Teman Chat"
    };
  }
};
</script>

<style scoped>
.name {
  cursor: pointer;
  font-size: 1.2rem;
  margin: 4px;
  font-weight: 500;
  color: darkslategray;
}
img {
  border-radius: 100%;
  width: 1.5rem;
}
.name:hover {
  color: rgb(27, 68, 68);
}
</style>