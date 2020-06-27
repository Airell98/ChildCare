<template>
  <div class="filter-box">
    <h3>FILTER</h3>
    <div class="filter-container">
      <label>Agency</label>
      <select v-model="agency">
        <option disabled value>Please select one</option>
        <!-- <option v-for="agency in agencies" :key="agency.id">{{
        agency.name
        }}</option>-->
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
  height: fit-content;
  margin: 1rem auto;
  transform: translateY(15%);
  background-color: rgba(137, 139, 139, 0.205);
  padding: 1rem 0rem;
}
h3 {
  text-align: center;
  color: darkslategray;
}
.filter-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
label {
  transform: translateY(2px);
}
</style>
