<template>
  <div class="filter-box">
    <h3>FILTER</h3>
    <div class="filter-container">
      <label>Agency</label>
      <b-form-select v-model="agency" :options="agencies"></b-form-select>
      <label>Gender</label>
      <b-form-select v-model="gender" :options="genders"></b-form-select>
      <label>City</label>
      <b-form-input v-model="city" :type="'text'"></b-form-input>
      <label>Age (Max)</label>
      <b-form-input v-model="age" :type="'number'"></b-form-input>
      <label>Salary (Max)</label>
      <b-form-input v-model="salary" :type="'number'"></b-form-input>
      <div class="button" @click.prevent="filteringNannies">Filter</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filter",
  data() {
    return {
      gender: null,
      genders: [
        { value: null, text: "Please select gender" },
        { value: "female", text: "Female" },
        { value: "name", text: "Male" }
      ],
      age: 0,
      salary: 0,
      agency: null
    };
  },
  computed: {
    agencies() {
      let value = [{ value: null, text: "Please select agency" }];
      this.$store.state.agencies.forEach(agency => {
        value.push({ value: agency.name, text: `${agency.name}` });
      });
      return value;
    },
    nannies() {
      return this.$store.state.nannies;
    }
  },
  methods: {
    filteringNannies() {
      let filteredNannies = this.nannies;
      this.$emit("passFilteredNannies", filteredNannies);
    }
  }
};
</script>

<style scoped>
.filter-box {
  width: 90%;
  height: fit-content;
  margin: 0rem auto;
  transform: translateY(12%);
  background-color: rgba(137, 139, 139, 0.205);
  border-radius: 1rem;
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
.button {
  text-align: center;
  margin: 1rem auto;
  margin-bottom: 0px;
  padding: 0.3rem 1rem;
  background-color: rgb(231, 230, 230);
  color: darkslategray;
  width: 30%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 450;
}
.button:hover {
  background-color: white;
  color: rgb(36, 61, 61);
}
</style>
