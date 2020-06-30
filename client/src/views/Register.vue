<template>
  <div class="wrapper">
    <b-form class="form-signin" @submit.prevent="onSubmitDataRegister">
      <h3 class="form-signin-heading">Register As {{ User }}</h3>
      <b-form-input type="text" name="email" placeholder="Nama" v-model="name" />
      <b-form-input type="text" name="email" placeholder="Email Address" v-model="email" />
      <b-form-input type="password" name="password" placeholder="Password" v-model="password" />
      <b-form-input
        type="password"
        name="password2"
        placeholder="Cek Password"
        v-model="password2"
      />
      <br />
      <b-form-datepicker
        v-if="user == 'parent'"
        type="text"
        name="Birth date"
        placeholder="Birth date"
        v-model="birthDate"
      />
      <b-form-select v-if="user == 'parent'" v-model="gender" :options="genders" />
      <b-form-input type="text" name="Address" placeholder="Address" v-model="address" />
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
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Register",
  props: ["user"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      address: "",
      city: "",
      logoUrl: "",
      phoneNumber: "",
      User: "",
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
    onSubmitDataRegister() {
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
      if (this.password !== this.password2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password not match!"
        });
      } else {
        this.$store.dispatch("register_user", {
          user: this.user,
          data: userData
        });
      }
    }
    // onSubmitDataRegister() {
    //   this.onConfirmDataRegister({
    //     name: this.name,
    //     email: this.email,
    //     password: this.password,
    //     address: this.address,
    //     city: this.city,
    //     logoUrl: this.logoUrl,
    //     phoneNumber: this.phoneNumber
    //   });
    // },
    // onConfirmDataRegister(value) {
    //   if (this.User == "Agensi") {
    //     if (this.password !== this.password2) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Password tidak sama!"
    //       });
    //     } else {
    //       axios({
    //         method: "Post",
    //         url: "http://localhost:3001/agency/register",
    //         data: value
    //       })
    //         .then(({ data }) => {
    //           console.log(data);
    //           Swal.fire("Good job!", "Berhasil Mendaftar", "success");
    //           (this.name = ""),
    //             (this.email = ""),
    //             (this.password = ""),
    //             (this.password2 = ""),
    //             (this.address = ""),
    //             (this.city = ""),
    //             (this.logoUrl = ""),
    //             (this.phoneNumber = "");
    //         })
    //         .catch(err => {
    //           Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Something went wrong!",
    //             footer: err
    //           });
    //         });
    //     }
    //   } else {
    //     if (this.password !== this.password2) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Password tidak sama!"
    //       });
    //     } else {
    //       axios({
    //         method: "Post",
    //         url: "http://localhost:3001/parent/register",
    //         data: value
    //       })
    //         .then(({ data }) => {
    //           console.log(data);
    //           Swal.fire("Good job!", "Berhasil Mendaftar", "success");
    //           (this.name = ""),
    //             (this.email = ""),
    //             (this.password = ""),
    //             (this.password2 = ""),
    //             (this.address = ""),
    //             (this.city = ""),
    //             (this.logoUrl = ""),
    //             (this.phoneNumber = "");
    //         })
    //         .catch(err => {
    //           Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Something went wrong!",
    //             footer: err
    //           });
    //         });
    //     }
    //   }
    // }
  },
  created() {
    this.user === "parent" ? (this.User = "Parent") : (this.User = "Agency");
  }
};
</script>

<style>
body {
  background: url("https://image.freepik.com/free-photo/woman-children-sitting-floor_23-2147663975.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #dfdddd;
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
}

.form-control {
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
</style>
