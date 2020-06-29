<template>
  <div>
    <div class="wrapper">
      <form class="form-signin" @submit.prevent="onSubmitDataRegister">
        <h3 class="form-signin-heading">Register Sebagai {{ User }}</h3>
        <input type="text" class="form-control" name="email" placeholder="Nama" v-model="name" />
        <input
          type="text"
          class="form-control"
          name="email"
          placeholder="Email Address"
          v-model="email"
        />
        <br />
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          v-model="password"
        />
        <input
          type="password"
          class="form-control"
          name="password2"
          placeholder="Cek Password"
          v-model="password2"
        />
        <br />
        <input
          type="text"
          class="form-control"
          name="Address"
          placeholder="Address"
          v-model="address"
        />
        <input type="text" class="form-control" name="City" placeholder="City" v-model="city" />
        <input
          type="text"
          class="form-control"
          name="URL logo"
          placeholder="URL logo"
          v-model="logoUrl"
        />
        <input
          type="text"
          class="form-control"
          name="Phone Number"
          placeholder="Phone Number"
          v-model="phoneNumber"
        />
        <br />
        <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      </form>
    </div>
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
      User: ""
    };
  },
  methods: {
    onSubmitDataRegister() {
      if (this.password !== this.password2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password tidak sama!"
        });
      } else {
        this.$store.dispatch("register_user", {
          user: this.user,
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            address: this.address,
            city: this.city,
            logoUrl: this.logoUrl,
            phoneNumber: this.phoneNumber
          }
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
    this.user === "parent" ? (this.User = "Orang Tua") : (this.User = "Agensi");
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
