<template>
  <div class="filter-box">
    <h3>FILTER</h3>
    <div class="filter-container">
      <label>Agency</label>
      <select v-model="agency">
        <option disabled value="">Please select one</option>
        <!-- <option v-for="agency in agencies" :key="agency.id">{{
        agency.name
      }}</option> -->
      </select>
      <label>Gender</label>
      <select v-model="gender">
        <option disabled value="All">Please select one</option>
        <option>Female</option>
        <option>Male</option>
      </select>
      <label>City</label>
      <input type="text" />
      <label>Age (Max)</label>
      <input type="number" v-model="age" />
      <label>Salary (Max)</label>
      <input type="number" v-model="salary" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Filter",
  data() {
    return {
      gender: "",
      age: 0,
      salary: 0
    };
  }
};
</script>

<style scoped>
.filter-box {
  width: 90%;
  margin: auto;
}
h3 {
  text-align: center;
  margin: 1rem;
  color: darkslategray;
}
.filter-container {
  display: flex;
  flex-direction: column;
}
label {
  transform: translateY(2px);
}
</style>
