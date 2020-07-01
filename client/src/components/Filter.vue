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
      <div class="button" @click.prevent="filteringNannies">
        <img src="https://image.flaticon.com/icons/svg/483/483356.svg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterBox",
  data() {
    return {
      gender: null,
      genders: [
        { value: null, text: "Please select gender" },
        { value: "female", text: "Female" },
        { value: "name", text: "Male" }
      ],
      age: null,
      salary: null,
      agency: null,
      city: null
    };
  },
  computed: {
    agencies() {
      let value = [{ value: null, text: "Please select agency" }];
      this.$store.state.agencies.forEach(agency => {
        value.push({ value: agency.id, text: `${agency.name}` });
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
      if (this.agency) {
        filteredNannies = filteredNannies.filter(nanny => {
          return nanny.AgencyId == this.agency;
        });
      }
      if (this.gender) {
        filteredNannies = filteredNannies.filter(nanny => {
          return nanny.gender == this.gender;
        });
      }
      if (this.city) {
        filteredNannies = filteredNannies.filter(nanny => {
          return nanny.city == this.city;
        });
      }
      if (this.age) {
        filteredNannies = filteredNannies.filter(nanny => {
          let age = 2020 - parseInt(nanny.birthDate.slice(0, 5));
          return age <= this.age;
        });
      }
      if (this.salary) {
        filteredNannies = filteredNannies.filter(nanny => {
          return nanny.expectedSalary <= this.salary;
        });
      }
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
  transform: translateY(5%);
  background-color: rgba(137, 139, 139, 0.205);
  border-radius: 1rem;
  padding: 1rem 0rem;
  padding-bottom: 0;
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
  margin: 1.2rem auto 0 auto;
  padding: 0.3rem 1rem;
  background-color: rgb(235, 235, 235);
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  cursor: pointer;
  transition: ease 400ms;
}
.button:hover {
  background-color: white;
  transform: translateY(-4px);
}
img {
  transform: translateY(-10%);
  width: 120%;
  height: 120%;
}
</style>
