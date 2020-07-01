<template>
  <div class="wrapper">
    <b-form class="form-signin" @submit.prevent="editUser">
      <h3 class="form-signin-heading">Edit Profile</h3>
      <b-form-input type="text" name="name" placeholder="Nama" v-model="name" />
      <b-form-input
        type="text"
        name="email"
        placeholder="Email Address"
        v-model="email"
      />
      <b-form-input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
      />
      <br />
      <b-form-datepicker
        v-if="user == 'parent'"
        type="text"
        name="Birth date"
        placeholder="Birth date"
        v-model="birthDate"
      />
      <b-form-select
        v-if="user == 'parent'"
        v-model="gender"
        :options="genders"
      />
      <b-form-input
        type="text"
        name="Address"
        placeholder="Address"
        v-model="address"
      />
      <b-form-input type="text" name="City" placeholder="City" v-model="city" />
      <b-form-input
        v-if="user == 'agency'"
        type="text"
        name="URL logo"
        placeholder="URL logo"
        v-model="logoUrl"
      />
      <b-form-input
        type="text"
        name="Phone Number"
        placeholder="Phone Number"
        v-model="phoneNumber"
      />
      <br />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Update
      </button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Register",
  props: ["user", "id"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      address: "",
      city: "",
      logoUrl: "",
      phoneNumber: "",
      birthDate: null,
      gender: null,
      genders: [
        { value: null, text: "Please select your gender" },
        { value: "female", text: "Female" },
        { value: "male", text: "Male" }
      ]
    };
  },
  methods: {
    editUser() {
      let userData = null;
      if (this.user === "agency") {
        userData = {
          name: this.name,
          email: this.email,
          password: this.password,
          address: this.address,
          city: this.city,
          logoUrl: this.logoUrl,
          phoneNumber: this.phoneNumber
        };
      } else {
        userData = {
          name: this.name,
          email: this.email,
          password: this.password,
          address: this.address,
          city: this.city,
          phoneNumber: this.phoneNumber,
          gender: this.gender,
          birthDate: this.birthDate
        };
      }
      console.log(this.id);
      this.$store.dispatch("edit_user", {
        user: this.user,
        id: this.id,
        data: userData
      });
    }
  },
  created() {
    this.user === "parent" ? (this.User = "Parent") : (this.User = "Agency");
    const user = JSON.parse(localStorage.user);
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.address = user.address;
    this.city = user.city;
    this.logoUrl = user.logoUrl;
    this.phoneNumber = user.phoneNumber;
    this.birthDate = user.birthDate;
    this.gender = user.gender;
  }
};
</script>

<style scoped>
.wrapper {
  transform: translateY(3vh);
}
.form-signin {
  max-width: 580px;
  padding: 15px 35px 45px;
  margin: 0px auto;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.form-signin-heading {
  margin-bottom: 30px;
  font-family: "Playfair Display", serif;
}

.form-control {
  font-family: "Courier New", Courier, monospace;
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
}

input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input[type="password"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.btn {
  font-family: "Courier New", Courier, monospace;
}
</style>
